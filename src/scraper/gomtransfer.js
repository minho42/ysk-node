const puppeteer = require("puppeteer");

const gomtransfer = async () => {
  const name = "GomTransfer";
  const url = "https://www.gomtransfer.com";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle2", // Using this instead of waitForSelector for iframe
  });

  const rate = await page.evaluate(() => {
    return document.querySelector("#hohans").textContent;
  });

  const fee = 0;
  await browser.close();

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
      await browser.close();
      reject(new Error(e));
    }
  });
};

module.exports = gomtransfer;
