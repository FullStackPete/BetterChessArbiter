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
                };
              return {
                title,
                eventUrl,
                county,
                status,
                tournamentTempo,
                isFide: true,
              };
             }
          });
      });
  });
  return dataScrape;

};
