const puppeteer = require("puppeteer");

const wontop = async () => {
  const name = "Wontop";
  const url = "http://www.wontop.com.au";

  const browser = await puppeteer.launch({
    args: ["--disable-web-security", "--disable-features=IsolateOrigins,site-per-process"],
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle2", // Using this instead of waitForSelector for iframe
  });
  // //iframe[@class='resp-iframe']

  // const iframeHandle = await page.$("#text-11 > div > center > iframe");
  // const frame = await iframeHandle.contentFrame()
  // Switch iframe
  const elementHandle = await page.$(".resp-iframe");
  const frame = await elementHandle.contentFrame();
  await frame.waitForSelector("#rate > strong");
  const rate = await frame.$eval("#rate > strong", (r) => r.textContent);

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

module.exports = wontop;
