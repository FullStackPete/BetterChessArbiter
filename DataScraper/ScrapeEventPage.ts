import { Browser } from "puppeteer";
import { subdata, urlsType } from "./types.js";

export const ScrapeEventPage = async (urls: urlsType[], browser: Browser) => {
  if (!urls) return console.log("No urls passed as a parameter.");
  const commonData = [];
  const page = await browser.newPage();

  for (let i = 0; i < 10; i++) {
    await page.goto(urls[i].aTag);

    const dataScrape = await page.evaluate(() => {
      const tables: NodeListOf<HTMLTableElement> =
        document.querySelectorAll(".panel-table");
      return Array.from(tables)
        .filter((table) => table.innerText.includes("Informacje podstawowe"||"Main information"))
        .flatMap((table) => {
          if (table.innerText.includes("Informacje podstawowe")) {
            const commonInfoTable = table.querySelectorAll("table");
            return Array.from(commonInfoTable)
              .slice(1)
              .flatMap((table) => {
                const commonInfo = table!.querySelectorAll("tr");
                const subData: subdata = {
                  title: commonInfo[0].querySelectorAll("td")[1].innerText,
                  startDate: commonInfo[1].querySelectorAll("td")[1].innerText,
                  endDate: commonInfo[2].querySelectorAll("td")[1].innerText,
                  place: commonInfo[3].querySelectorAll("td")[1].innerText,
                  gameTempo: commonInfo[4].querySelectorAll("td")[1].innerText,
                  referee: commonInfo[5].querySelectorAll("td")[1].innerText,
                  organizer: commonInfo[6].querySelectorAll("td")[1].innerText,
                  roundsTotal:
                    commonInfo[8].querySelectorAll("td")[1].innerText,
                  roundsEnded:
                    commonInfo[7].querySelectorAll("td")[1].innerText,
                  system: commonInfo[9].querySelectorAll("td")[1].innerText,
                };
                console.log(subData);
                return subData;
              });
          }
        });
    });
    console.log(dataScrape);
    commonData.push(dataScrape);
  }
  await browser.close();
  return commonData;
};
