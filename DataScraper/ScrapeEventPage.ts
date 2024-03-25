import { Browser } from "puppeteer";
import { DetailsType, UrlType } from "./types.js";

type ScrapeEventpageFunctionType = (
  arg0: number,
  arg1: UrlType[],
  arg2: Browser
) => Promise<DetailsType[]>;

export const ScrapeEventPage: ScrapeEventpageFunctionType = async (
  numOfTournamentsToScrape: number,
  urls: UrlType[],
  browser: Browser
): Promise<DetailsType[]> => {
  const commonData = [];
  const page = await browser.newPage();

  for (let i = 0; i < numOfTournamentsToScrape; i++) {
    await page.goto(urls[i].aTag);

    const dataScrape = await page.evaluate(() => {
      const tables: NodeListOf<HTMLTableElement> =
        document.querySelectorAll(".panel-table");
      return Array.from(tables)
        .filter((table) =>
          table.innerText.includes(
            "Informacje podstawowe" ||
              "Main information" ||
              "Statystyka turniejowa"
          )
        )
        .flatMap((table) => {
          let subData: DetailsType;
          if (
            table.innerText.includes(
              "Informacje podstawowe" || "Main Information"
            )
          ) {
            const commonInfoTable = table.querySelectorAll("table");
            return Array.from(commonInfoTable)
              .slice(1)
              .flatMap((table) => {
                const commonInfo = table!.querySelectorAll("tr");
                const startDate = Date.parse(
                  commonInfo[1].querySelectorAll("td")[1].innerText
                );
                const endDate = Date.parse(
                  commonInfo[2].querySelectorAll("td")[1].innerText
                );

                subData = {
                  Title: commonInfo[0].querySelectorAll("td")[1].innerText,
                  StartDate: startDate,
                  EndDate: endDate,
                  Place: commonInfo[3].querySelectorAll("td")[1].innerText,
                  GameTempo: commonInfo[4].querySelectorAll("td")[1].innerText,
                  Referee: commonInfo[5].querySelectorAll("td")[1].innerText,
                  Organizer: commonInfo[6].querySelectorAll("td")[1].innerText,
                  RoundsTotal: Number(
                    commonInfo[8].querySelectorAll("td")[1].innerText
                  ),
                  RoundsEnded: Number(
                    commonInfo[7].querySelectorAll("td")[1].innerText
                  ),
                  GameSystem: commonInfo[9].querySelectorAll("td")[1].innerText,
                };
                // console.log(subData);
                const tournamentStatisticsTables =
                  document.querySelectorAll(".panel-table");

                Array.from(tournamentStatisticsTables).forEach((panelTable) => {
                  const panelTableText = panelTable.innerText;
                  if (panelTableText.includes("Statystyka turniejowa")) {
                    const tablesInsidePanel =
                      panelTable.querySelectorAll("table");
                    Array.from(tablesInsidePanel).forEach((table) => {
                      const trElements = table.querySelectorAll("tr");
                      trElements.forEach((tr) => {
                        const tdElements = tr.querySelectorAll("td");
                        let key = tdElements[0].innerText;
                        let value = Number(tdElements[1].innerText);
                        if (value == 0) {
                          value = -1;
                        }
                        if (key && value) {
                          switch (key) {
                            case "Liczba drużyn:":
                              key = "NumOfTeams";
                              break;
                            case "Liczba zawodników:":
                              key = "NumOfPlayers";
                              break;
                            case "Liczba federacji:":
                              key = "NumOfFederations";
                              break;
                            case "Liczba zawodników z rankingiem FIDE:":
                              key = "ContestantsWithFIDE";
                              break;
                            case "Liczba kobiet:":
                              key = "NumOfWomen";
                              break;
                            case "Średni ranking turnieju:":
                              key = "AverageRanking";
                              break;
                            default:
                              null;
                              break;
                          }

                          subData[key] = value;
                        }
                      });
                    });
                  }
                });
                return subData;
              });
          }
        });
    });
    // console.log(dataScrape);
    commonData.push(dataScrape);
  }
  const flatCommonData = commonData
    .flat()
    .filter((item): item is DetailsType => item !== undefined);

  return flatCommonData;
};
