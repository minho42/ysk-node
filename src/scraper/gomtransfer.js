const puppeteer = require("puppeteer");

const gomtransfer = async () => {
  const name = "GomTransfer";
  const url = "https://www.gomtransfer.com";

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (req.resourceType() == "stylesheet" || req.resourceType() == "font" || req.resourceType() == "image") {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  const rate = await page.evaluate(() => {
    return document.querySelector("#hohans").textContent;
  });
  console.log(rate);

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

module.exports = gomtransfer;
