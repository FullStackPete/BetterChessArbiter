import puppeteer, { Browser } from "puppeteer";
import * as fs from "fs";
import path from "path";
import { ScrapeFrontPage } from "./ScrapeFrontPage.js";
import { ScrapeLinks } from "./ScrapeLinks.js";
import { ScrapeEventPage } from "./ScrapeEventPage.js";
const url = "https://www.chessarbiter.com/";
import { TournamentsType, DetailsType, FixedDetailsType } from "./types.js";

const main = async () => {
  const combinedData: TournamentsType[] = [];
  const browser = await puppeteer.launch({ headless: false });
  const mainData = await ScrapeFrontPage(url, browser);
  const linksArray = await ScrapeLinks(url, browser);
  const subData: void | (DetailsType | undefined)[] = await ScrapeEventPage(
    linksArray,
    browser
  );

  // Iterujemy po głównej danych
  const fixedDateSubData: FixedDetailsType[] = subData.map(
    (subItem: DetailsType) => {      
      const newStartDate = new Date(subItem.startDate);
      const newEndDate = new Date(subItem.endDate);      
      return { ...subItem, startDate: newStartDate, endDate: newEndDate };
    }
  );

  mainData.forEach((mainItem) => {
    const correspondingSubItem = fixedDateSubData.find(
      (subItem: FixedDetailsType) => subItem.title === mainItem!.title
    );
    if (correspondingSubItem) {
      const combinedItem = {
        ...mainItem,
        details: correspondingSubItem,
      };
      combinedData.push(combinedItem as TournamentsType);
    }
  });
console.log(combinedData);
  const currentPath = path.resolve(".");
  fs.writeFile(
    currentPath + "/database.txt",
    JSON.stringify(combinedData),
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
