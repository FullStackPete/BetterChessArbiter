import puppeteer, { Browser } from "puppeteer";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { ScrapeFrontPage } from "./ScrapeFrontPage.js";
import { ScrapeLinks } from "./ScrapeLinks.js";
import { ScrapeEventPage } from "./ScrapeEventPage.js";
const url = "https://www.chessarbiter.com/";
import { TournamentsType, DetailsType, FixedDetailsType } from "./types.js";

const main = async () => {

  const numOfTournamentsToScrape = 50;

  const currentPath = path.resolve(".");
  const combinedData: TournamentsType[] = [];
  const browser = await puppeteer.launch({ headless: false });
  let mainData = await ScrapeFrontPage(url, browser);

  const linksArray = await ScrapeLinks(url, browser);
  const subData: void | (DetailsType | undefined)[] = await ScrapeEventPage(
    numOfTournamentsToScrape,
    linksArray,
    browser
  );

  // Iterujemy po głównej danych
  const fixedDateSubData: FixedDetailsType[] = subData.map(
    (subItem: DetailsType) => {
      const newStartDate = new Date(subItem.StartDate);
      const newEndDate = new Date(subItem.EndDate);
      return { ...subItem, startDate: newStartDate, endDate: newEndDate };
    }
  );
  console.log("fixeddate:", fixedDateSubData);
  mainData = mainData.slice(0, numOfTournamentsToScrape);
  mainData.forEach((mainItem) => {
    let _id = uuidv4();
    const correspondingSubItem = fixedDateSubData.find(
      (subItem: FixedDetailsType) => subItem.Title === mainItem!.Title
    );
    if (correspondingSubItem) {
      const combinedItem = {
        _id,
        ...mainItem,
        Details: correspondingSubItem,
      };
      combinedData.push(combinedItem as TournamentsType);
    } else combinedData.push({ _id, ...mainItem });
  });

  console.log("combinedData:", combinedData);

  const finalData = combinedData.map((item) => {
    const newItem = { ...item };
    if (newItem.Details) {
      delete newItem.Details.Title;
    }
    return newItem;
  });
  console.log("finalData:", finalData);

  fs.writeFile(
    currentPath + "/database.json",
    JSON.stringify(finalData),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File written success");
      }
    }
  );
  await browser.close();
};
main();
