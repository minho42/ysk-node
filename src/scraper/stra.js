const axios = require("axios");
const cheerio = require("cheerio");

const stra = async () => {
  const name = "Stra";
  const url = "http://1472.com.au";
  const selector = "#m_right > div.aukr > div.ex_bg > span";

  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.get(url);
      const $ = cheerio.load(res.data);
      const rate = $(selector).text().trim();
      const fee = 0;
      resolve({
        name,
        url,
        rate,
        fee,
        note: "No fee over $1000",
      });
    } catch (e) {
      console.error(e);
      reject(new Error(e));
    }
  });
};

module.exports = stra;
