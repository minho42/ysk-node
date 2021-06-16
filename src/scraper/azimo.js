const axios = require("axios");
const utils = require("../utils");

const azimo = async () => {
  const name = "Azimo";
  const url = "https://azimo.com/en/send-money-to-korea-republic-of";

  return new Promise(async function (resolve, reject) {
    try {
      const headers = {
        authority: "api.azimo.com",
        method: "GET",
        path: "/service-rates/v1/public/en/prices/current?sendingCountry=AUS&sendingCurrency=AUD&receivingCountry=KOR&receivingCurrency=USD&deliveryMethod=SWIFT",
        scheme: "https",
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-AU,en;q=0.9,ko-KR;q=0.8,ko;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        "cache-control": "no-cache",
        origin: "https://azimo.com",
        pragma: "no-cache",
        referer: "https://azimo.com/en/send-money-to-korea-republic-of",
        "sec-ch-ua": '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": utils.userAgent,
        "x-api-version": "3.27.0",
        "x-app-version": "LEGO-CLIENT,4.49.48",
        "x-application-calculator": "INDIVIDUAL",
        "x-azimo-utdm": "10407fcc-1be8-4231-bf15-d3b2da5dd434",
        "x-correlation-id": "LEGO-CLIENT-51e5fdfa-19ae-4c23-9d0f-6eeab29507d7",
        "x-platform-version": "2021.12",
      };
      const res = await axios.get(
        "https://api.azimo.com/service-rates/v1/public/en/prices/current?sendingCountry=AUS&sendingCurrency=AUD&receivingCountry=KOR&receivingCurrency=USD&deliveryMethod=SWIFT",
        { headers }
      );
      const rateInUsd = res.data.rates[0].adjustments.rate.value.was;
      const fee = res.data.rates[0].adjustments.fee.max.was;
      const usdKrwRate = await utils.getNaverUsd();
      if (!usdKrwRate) {
        reject(new Error("Can't convert USD->KRW"));
      }
      const rate = rateInUsd * usdKrwRate;
      resolve({
        name,
        url,
        rate,
        fee,
        note: `USD->KRW: ${rateInUsd} x ${usdKrwRate} = ${rate}`,
      });
    } catch (e) {
      console.error(e);
      reject(new Error(e));
    }
  });
};

module.exports = azimo;
