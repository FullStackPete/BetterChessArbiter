import puppeteer, { Browser } from "puppeteer";
import * as fs from "fs";
import path from "path";
const url = "https://www.chessarbiter.com/";

let eventPages: string[] = [];
function delay(time:number) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }
const ScrapeEventPage = async (url: string, browser: Browser) => {
  const page = await browser.newPage();
  await page.goto(url);
  
  const dataScrape = await page.evaluate(() => {
    const tables: NodeListOf<HTMLTableElement> =
      document.querySelectorAll(".panel-table");
    return Array.from(tables).map((table) => {
      if (table.innerText.includes("Informacje podstawowe")) {
        const commonInfoTable = table.querySelector("table");
        const commonInfo = commonInfoTable!.querySelectorAll("tr");

        const startDate = commonInfo[0].querySelectorAll("td")[1].innerText;
        const endDate = commonInfo[1].querySelectorAll("td")[1].innerText;
        const place = commonInfo[2].querySelectorAll("td")[1].innerText;
        const gameTempo = commonInfo[3].querySelectorAll("td")[1].innerText;
        const referee = commonInfo[4].querySelectorAll("td")[1].innerText;
        const organizer = commonInfo[5].querySelectorAll("td")[1].innerText;
        const roundsTotal = commonInfo[6].querySelectorAll("td")[1].innerText;
        const roundsEnded = commonInfo[7].querySelectorAll("td")[1].innerText;
        const system = commonInfo[8].querySelectorAll("td")[1].innerText;
        return {
          startDate,
          endDate,
          place,
          gameTempo,
          referee,
          organizer,
          roundsTotal,
          roundsEnded,
          system,
        };
      }
    });
  });
  await page.close();
  console.log(dataScrape);
  return dataScrape;
};

const ScrapeFrontPage = async () => {
  let commonInfo = undefined;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  
  const dataScrape = await page.evaluate(() => {
    const tournamentMonthTables = document.querySelectorAll("table");
     return Array.from(tournamentMonthTables)
      .slice(14)
      .flatMap((table) => {
        const AllTrs = table.querySelectorAll("tr");
        return Array.from(AllTrs)
          .slice(1)
          .flatMap((tr) => {
            const szary: NodeListOf<HTMLDivElement> = tr.querySelectorAll(
              ".szary"
            ) as NodeListOf<HTMLDivElement>;
            const aTag = tr.querySelector("a");
            const title = aTag!.innerText;
            const eventUrl = aTag!.href;
            //ScrapeEventPage(eventUrl, browser);

            if (szary.length > 0) {
              const status = szary[0].innerText;
              const county = szary[1].innerText;
              let tournamentTempo = szary[2].innerText.replace("FIDE", "");
              const isFIDE = szary[2].querySelector("sup")?.innerText;
              if (isFIDE !== "FIDE")
                return {
                  title,
                  eventUrl,
                  county,
                  status,
                  tournamentTempo,
                  isFide: false,
                  //   commonInfo
                };
              return {
                title,
                eventUrl,
                county,
                status,
                tournamentTempo,
                isFide: true,
                // commonInfo
              };
            } else {
              return { title, eventUrl };
            }
          });
      });
      

  });
  const currentPath = path.resolve('.');
  fs.writeFile(currentPath+'/baza.txt',JSON.stringify(dataScrape),err=>{
    if(err){
        console.log(err)
    } else{
        console.log("File written success");
    }
  });
  await browser.close();
};

ScrapeFrontPage();
