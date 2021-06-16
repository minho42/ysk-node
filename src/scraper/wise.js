const axios = require("axios");
const utils = require("../utils");

const wise = async () => {
  const name = "Wise";
  const url = "https://wise.com/au";

  return new Promise(async function (resolve, reject) {
    try {
      var data = JSON.stringify({
        sourceAmount: utils.baseAmount,
        sourceCurrency: "AUD",
        targetCurrency: "KRW",
        preferredPayIn: null,
        guaranteedTargetAmount: false,
      });

      var config = {
        method: "post",
        url: "https://wise.com/gateway/v3/quotes/",
        headers: {
          authority: "wise.com",
          pragma: "no-cache",
          "cache-control": "no-cache",
          "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
          "accept-language": "en-GB",
          "sec-ch-ua-mobile": "?0",
          "time-zone": "+1000",
          "content-type": "application/json",
          accept: "application/json",
          "user-agent": utils.userAgent,
          "x-access-token": "Tr4n5f3rw153",
          origin: "https://wise.com",
          "sec-fetch-site": "same-origin",
          "sec-fetch-mode": "cors",
          "sec-fetch-dest": "empty",
          referer: "https://wise.com/au/",
        },
        data: data,
      };

      const res = await axios(config);

      if (
        res.data.paymentOptions[0].sourceCurrency !== "AUD" ||
        res.data.paymentOptions[0].targetCurrency !== "KRW"
      ) {
        reject(
          new Error("Error: sourceCurrency or targetCurrency not set properly. Check the post request.")
        );
      }
      const rate = res.data.rate;
      let fee = 0;
      res.data.paymentOptions.map((option) => {
        if (option.payIn === "BANK_TRANSFER") {
          fee = option.fee.total;
        }
      });

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

module.exports = wise;
