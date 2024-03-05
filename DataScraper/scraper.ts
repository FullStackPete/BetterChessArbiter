import puppeteer, { Browser } from "puppeteer";
import * as fs from "fs";
import path from "path";
import { ScrapeFrontPage } from "./ScrapeFrontPage.js";
import { ScrapeLinks } from "./ScrapeLinks.js";
import { ScrapeEventPage } from "./ScrapeEventPage.js";
const url = "https://www.chessarbiter.com/";
import { combinedObjectType, subdata } from "./types.js";

const main = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const mainData = await ScrapeFrontPage(url, browser);
  const linksArray = await ScrapeLinks(url, browser);
  const subData:void|(subdata|undefined)[] = await ScrapeEventPage(linksArray, browser);
  const combinedData: combinedObjectType[] = [];

  // Iterujemy po głównej danych
  
  mainData.forEach((mainItem) => {    
    const correspondingSubItem = subData.find(
      (subItem:subdata) => subItem.title === mainItem!.title
    );

    if (correspondingSubItem) {
      const combinedItem = {
        ...mainItem,
        details: correspondingSubItem,
      };
      combinedData.push(combinedItem as combinedObjectType);
    }
  });

  const currentPath = path.resolve(".");
  fs.writeFile(currentPath + "/db.txt", JSON.stringify(combinedData), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File written success");
    }
  });
  
};
main();
