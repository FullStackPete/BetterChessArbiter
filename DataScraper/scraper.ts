import puppeteer, { Browser } from "puppeteer";
import * as fs from "fs";
import path from "path";
const url = "https://www.chessarbiter.com/";

type urlsType = {
  aTag: string;
};

function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
const ScrapeEventPage = async (urls: urlsType[], browser: Browser) => {
  if (!urls) return console.log("No urls passed as a parameter.");
  const commonData = [];
  const page = await browser.newPage();

  for (let i = 0; i < urls.length; i++) {
    await page.goto(urls[i].aTag);

    const dataScrape = await page.evaluate(() => {
      const tables: NodeListOf<HTMLTableElement> =
        document.querySelectorAll(".panel-table");
      return Array.from(tables).filter((table)=>table.innerText.includes("Informacje podstawowe")).flatMap((table) => {
        if (table.innerText.includes("Informacje podstawowe")) {
          const commonInfoTable = table.querySelectorAll("table");
          return Array.from(commonInfoTable)
            .slice(1)
            .flatMap((table) => {
              const commonInfo = table?.querySelectorAll("tr");
              const title = commonInfo[0].querySelectorAll("td")[1].innerText;
              const startDate =
                commonInfo[1].querySelectorAll("td")[1].innerText;
              const endDate = commonInfo[2].querySelectorAll("td")[1].innerText;
              const place = commonInfo[3].querySelectorAll("td")[1].innerText;
              const gameTempo =
                commonInfo[4].querySelectorAll("td")[1].innerText;
              const referee = commonInfo[5].querySelectorAll("td")[1].innerText;
              const organizer =
                commonInfo[6].querySelectorAll("td")[1].innerText;
              const roundsTotal =
                commonInfo[8].querySelectorAll("td")[1].innerText;
              const roundsEnded =
                commonInfo[7].querySelectorAll("td")[1].innerText;
              const system = commonInfo[9].querySelectorAll("td")[1].innerText;
              if (commonInfo) {
                return {
                  title,
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
              } else return;
            });
        } else {
          return;
        }
      });
    });    
      commonData.push(dataScrape);
  }

  
  const flatCommonData = commonData.flat();
  const currentPath = path.resolve(".");
  fs.writeFile(currentPath + "/details.txt", JSON.stringify(flatCommonData), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File written success");
    }
  });
  await browser.close();
};

const ScrapeFrontPage = async () => {
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
  const currentPath = path.resolve(".");
  fs.writeFile(currentPath + "/db.txt", JSON.stringify(dataScrape), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File written success");
    }
  });
  await browser.close();
};

const ScrapeLinks = async (browser: Browser) => {
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
            const aTag = tr.querySelector("a")!.href;
            return { aTag };
          });
      });
  });

  return dataScrape;
};
const ScrapingEventPages = async () => {
  const browser = await puppeteer.launch({ headless: false });  
  const linksArray = await ScrapeLinks(browser);
  await ScrapeEventPage(linksArray, browser);

};
ScrapingEventPages();
