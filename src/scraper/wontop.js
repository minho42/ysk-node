const puppeteer = require("puppeteer");

const wontop = async () => {
  const name = "Wontop";
  const url = "http://www.wontop.com.au";

  const browser = await puppeteer.launch({
    args: [
      // Below 2 for deployment
      "--no-sandbox",
      "--disable-setuid-sandbox",
      // Below 2 for iframe
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
    ],
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle2", // Using this instead of waitForSelector for iframe
  });
  const elementHandle = await page.$(".resp-iframe");
  const frame = await elementHandle.contentFrame();
  await frame.waitForSelector("#rate > strong");
  const rate = await frame.$eval("#rate > strong", (r) => r.textContent);

  const fee = 0;
  await browser.close();

  return {
    name,
    url,
    rate,
    fee,
    note: "",
  };
};

module.exports = wontop;
