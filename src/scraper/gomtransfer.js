import puppeteer from "puppeteer";

export const gomtransfer = async () => {
  const name = "GomTransfer";
  const url = "https://www.gomtransfer.com";

  try {
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

    const availabilityText = await page.evaluate(() => {
      return document.querySelector(
        "#thema_wrapper > div.at-body > div > div:nth-child(1) > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(4) > span"
      ).textContent;
    });
    let note = "";
    if (availabilityText.includes("정지")) {
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
    // console.error(error);
    return {
      name,
      url,
      rate: 0,
      fee: 0,
      note: "Error",
    };
  }
};
