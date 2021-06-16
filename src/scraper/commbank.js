const axios = require("axios");
const cheerio = require("cheerio");

const commbank = async () => {
  const name = "Commbank";
  const url =
    "https://www.commbank.com.au/personal/international/foreign-exchange-rates.html?ei=cb-fx-calc-full-fx-list";
  const feeSelector =
    "#cba-imt-hero-mbox > div > div > div.banner-content-panel > div > div:nth-child(2) > p";

  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.get(`https://www.commbank.com.au/content/data/forex-rates/AUD.json`);
      const data = res.data.currencies;
      let rate = 0;
      data.map((c) => {
        if (c.currencyTitle === "KRW") {
          rate = c.bsImt;
        }
      });

      const res2 = await axios.get(
        "https://www.commbank.com.au/personal/international/international-money-transfer.html"
      );
      const $$ = cheerio.load(res2.data);
      const feeText = $$(feeSelector).text().trim();
      const fee = feeText.match(/\$([\d,.]+)/)[1];

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

module.exports = commbank;
