const puppeteer = require("puppeteer");

const gomtransfer = async () => {
  const name = "GomTransfer";
  const url = "https://www.gomtransfer.com";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector("#hohans");

  const rate = await page.evaluate(() => {
    return document.querySelector("#hohans").textContent;
  });

  const fee = 0;
  return new Promise(async function (resolve, reject) {
    try {
      resolve({
        name,
        url,
        rate,
        fee,
        note: "",
      });
    } catch (e) {
      console.error(e);
      reject(new Error(e));
    }
  });
};

module.exports = gomtransfer;
