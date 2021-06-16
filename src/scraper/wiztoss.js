const axios = require("axios");
const cheerio = require("cheerio");

const wiztoss = async () => {
  const name = "Wiztoss";
  const url = "https://wiztoss.com";
  const selector = "body > div.wts > div.hero.d-none.d-sm-block > div > div > div.col-lg-5.py-5 > h5";
  const feeSelector = "#collapseFour4 > div > p:nth-child(1)";
  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.get(url);
      const $ = cheerio.load(res.data);
      // "1AUD = 813KRW" --> "813"
      const rateText = $(selector).text().trim();
      const rate = rateText.match(/1AUD = ([\d,.]+)KRW/i)[1];

      const res2 = await axios.get("https://wiztoss.com/faq-exchange-transfer");
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

module.exports = wiztoss;
