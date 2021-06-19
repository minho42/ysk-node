const puppeteer = require("puppeteer");

const dondirect = async () => {
  const name = "DonDirect";
  const url = "https://dondirect.com.au";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  const rateText = await page.evaluate(() => {
    return document.querySelector(
      "body > div.full-height.ng-scope.layout-row > div > div.layout-xs-column.layout-row.flex > md-content > div > span > div.margin-top-20.layout-column > div:nth-child(1) > div.margin-top-5.margin-bottom-5 > center:nth-child(1) > span"
    ).textContent;
  });
  // 호주에서 한국 854원 (862-8)
  const rate = rateText.match(/[\d,.]+/)[0];

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

  return new Promise(async function (resolve, reject) {
    try {
      resolve({
        name,
        url,
        rate,
        fee,
        note,
      });
    } catch (e) {
      console.error(e);
      await browser.close();
      reject(new Error(e));
    }
  });
};

module.exports = dondirect;
