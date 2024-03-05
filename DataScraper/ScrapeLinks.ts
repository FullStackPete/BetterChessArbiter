import { Browser } from "puppeteer";

export const ScrapeLinks = async (url: string, browser: Browser) => {
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
