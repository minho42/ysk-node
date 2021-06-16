const axios = require("axios");
const utils = require("../utils");

const remitly = async () => {
  const name = "Remitly";
  const url = "https://www.remitly.com";

  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.get(
        `https://api.remitly.io/v2/pricing/estimates?amount=${utils.baseAmount}%20AUD&anchor=SEND&conduit=AUS%3AAUD-KOR%3AKRW`
      );
      let data = null;
      res.data.map((d) => {
        if (d.payment_method === "DEBIT") {
          data = d;
        }
      });

      const rate = data.exchange_rate_info.base_rate;
      const feeText = data.fee_info.product_fee_amount;
      const fee = feeText.match(/[\d,.]+/)[0];

      resolve({
        name,
        url,
        rate,
        fee,
        // note: "프로모션 적용안함; 수수료 Express delivery 기준",
        note: "",
      });
    } catch (e) {
      console.error(e);
      reject(new Error(e));
    }
  });
};

module.exports = remitly;
