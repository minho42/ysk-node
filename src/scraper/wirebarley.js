const axios = require("axios");
const utils = require("../utils");

const wirebarley = async () => {
  const name = "Wirebarley";
  const url = "https://www.wirebarley.com";

  return new Promise(async function (resolve, reject) {
    try {
      const headers = {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-AU,en;q=0.9,ko-KR;q=0.8,ko;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        Connection: "keep-alive",
        Cookie:
          "_ga=GA1.2.455691707.1556844022; __zlcmid=s7iCuUgrnol1nf; wbLocaleCookie=en; _gid=GA1.2.1493689065.1559657242; _gat=1",
        Host: "www.wirebarley.com",
        iosVer: "9999",
        lang: "en",
        Referer: "https://www.wirebarley.com/",
        "user-agent": utils.userAgent,
        "X-Requested-With": "XMLHttpRequest",
      };
      const res = await axios.get("https://www.wirebarley.com/api/data/composition", { headers });

      const res2 = await axios.get("https://www.wirebarley.com/api/tx/exrate/AU/AUD", { headers });
      if (res2.status !== 200) {
        reject(new Error("status not 200 but:" + res2.status));
      }
      rate = res2.data.data.exRates.KR[0].wbRateData.wbRate3;
      fee = res2.data.data.exRates.KR[0].transferFees[0].fee2;

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

module.exports = wirebarley;
