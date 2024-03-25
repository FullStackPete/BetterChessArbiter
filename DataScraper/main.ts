import https from "https";
import puppeteer, { Browser } from "puppeteer";
import * as fs from "fs";
import path from "path";
import { ScrapeFrontPage } from "./ScrapeFrontPage.js";
import { ScrapeLinks } from "./ScrapeLinks.js";
import { ScrapeEventPage } from "./ScrapeEventPage.js";
const url = "https://www.chessarbiter.com/";
import { TournamentsType, DetailsType, FixedDetailsType } from "./types.js";
import axios from "axios";

const main = async () => {
  const currentPath = path.resolve(".");
  const combinedData: (TournamentsType | noDetailsTournamentsType)[] = [];
  const browser = await puppeteer.launch({ headless: false });
  let mainData = await ScrapeFrontPage(url, browser);

  const linksArray = await ScrapeLinks(url, browser);
  const numOfTournamentsToScrape = linksArray.length;
  const subData: void | (DetailsType | undefined)[] = await ScrapeEventPage(
    numOfTournamentsToScrape,
    linksArray,
    browser
  );

  const subDataFiltered = subData.filter(
    (item): item is DetailsType => item !== undefined
  );
  // Iterujemy po głównej danych
  const fixedDateSubData: FixedDetailsType[] = subDataFiltered.map(
    (subItem: DetailsType) => {
      const newStartDate = new Date(subItem.StartDate);
      const newEndDate = new Date(subItem.EndDate);
      return { ...subItem, StartDate: newStartDate, EndDate: newEndDate };
    }
  );
  mainData = mainData.slice(0, numOfTournamentsToScrape);
  mainData.forEach((mainItem) => {
    const correspondingSubItem = fixedDateSubData.find(
      (subItem: FixedDetailsType) => subItem.Title === mainItem!.Title
    );
    if (correspondingSubItem) {
      const combinedItem = {
        ...mainItem,
        Details: correspondingSubItem,
      };
      combinedData.push(combinedItem as TournamentsType);
    } else
      combinedData.push({
        ...mainItem,
        Details: {
          StartDate: new Date(),
          EndDate: new Date(),
          Place: "Missing information",
          GameTempo: "Missing information",
          Referee: "Missing information",
          Organizer: "Missing information",
          RoundsTotal: 0,
          RoundsEnded: 0,
          GameSystem: "Missing information",
          numOfTeams: 0,
          numOfPlayers: 0,
          numOfFederations: 0,
          contestantsWithFIDE: 0,
          numOfWomen: 0,
          averageRanking: 0,
        },
      });
  });

  const finalData = combinedData.map((item) => {
    const newItem: TournamentsType | noDetailsTournamentsType = { ...item };
    if ("Details" in newItem && newItem.Details) {
      delete newItem.Details.Title;
    }
    axios
      .post("https://localhost:7001/api/Tournament", newItem, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      })
      .then((res) => {
        //console.log(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return newItem;
  });

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
