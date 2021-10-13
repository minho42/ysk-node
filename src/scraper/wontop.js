import puppeteer from "puppeteer";

export const wontop = async () => {
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
  try {
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
      waitUntil: "networkidle2", // Using this instead of waitForSelector for iframe
    });
    const elementHandle = await page.$(".resp-iframe");
    const frame = await elementHandle.contentFrame();
    await frame.waitForSelector("#rate > strong");
    let rate = await frame.$eval("#rate > strong", (r) => r.textContent.trim());
    if (!rate) rate = 0;

    const fee = 0;

    return {
      name,
      url,
      rate,
      fee,
      note: "",
    };
  } catch (error) {
    // console.error(error);
    return {
      name,
      url,
      rate: 0,
      fee: 0,
      note: "Error",
    };
  } finally {
    await browser.close();
  }
};
