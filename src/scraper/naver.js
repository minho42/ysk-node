const axios = require("axios");
const cheerio = require("cheerio");

const naver = async () => {
  const name = "Naver";
  const url = "https://finance.naver.com/marketindex/exchangeDetail.nhn?marketindexCd=FX_AUDKRW";
  const selector = "#content > div.section_calculator > table:nth-child(4) > tbody > tr > td:nth-child(1)";

  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.get(url);
      const $ = cheerio.load(res.data);
      const rate = $(selector).text().trim();
      resolve({
        name,
        url,
        rate,
        fee: 0,
        note: "Base",
      });
    } catch (e) {
      console.error(e);
      reject(new Error(e));
    }
  });
};

module.exports = naver;
