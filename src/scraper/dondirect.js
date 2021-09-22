import puppeteer from "puppeteer";

export const dondirect = async () => {
  const name = "DonDirect";
  const url = "https://dondirect.com.au";
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (
        req.resourceType() == "stylesheet" ||
        req.resourceType() == "font" ||
        req.resourceType() == "image"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    const rateText = await page.evaluate(() => {
      return document.querySelector(
        "body > div.full-height.ng-scope.layout-row > div > div.layout-xs-column.layout-row.flex > md-content > div > span > div.margin-top-20.layout-column > div:nth-child(1) > div.margin-top-5.margin-bottom-5 > center:nth-child(1) > span"
      ).textContent;
    });
    // 호주에서 한국 854원 (862-8)
    let rate = rateText.match(/[\d,.]+/)[0];
    if (!rate) rate = 0;

    const availabilityText = await page.evaluate(() => {
      return document.querySelector(
        "body > div.full-height.ng-scope.layout-row > div > div.layout-xs-column.layout-row.flex > md-content > div > span > div.margin-top-20.layout-column > div:nth-child(1) > div.margin-top-5.margin-bottom-5 > center:nth-child(2) > div > div"
      ).textContent;
    });
    let note = "";
    if (availabilityText.includes("입금불가")) {
      note = availabilityText;
    }
    const fee = 0;
    await browser.close();

    return {
      name,
      url,
      rate,
      fee,
      note,
    };
  } catch (error) {
    console.error(error);
    return {
      name,
      url,
      rate: 0,
      fee: 0,
      note: "Error",
    };
  }
};
