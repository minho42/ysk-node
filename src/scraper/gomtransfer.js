import puppeteer from "puppeteer";

export const gomtransfer = async () => {
  const name = "GomTransfer";
  const url = "https://www.gomtransfer.com";

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (req.resourceType() == "stylesheet" || req.resourceType() == "font") {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  let rate = await page.evaluate(() => {
    return document.querySelector("#hohans").textContent.trim();
  });
  if (!rate) rate = 0;

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
