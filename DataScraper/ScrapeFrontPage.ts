import { Browser } from "puppeteer";
export const ScrapeFrontPage = async (url: string, browser: Browser) => {
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
            const Title = aTag!.innerText;
            const EventUrl = aTag!.href;
            if (szary.length > 0) {
              const Status = szary[0].innerText;
              const County = szary[1].innerText;
              let TournamentType = szary[2].innerText.replace("FIDE", "");
              const isFIDE = szary[2].querySelector("sup")?.innerText;
              const frontPageTournament = {
                Title,
                EventUrl,
                County,
                Status,
                TournamentType,
                IsFide: false,
              };
              if (isFIDE !== "FIDE") {
                frontPageTournament.IsFide = false;
              } else frontPageTournament.IsFide = true;
              return frontPageTournament;
            }
          });
      });
  });
  return dataScrape;
};
