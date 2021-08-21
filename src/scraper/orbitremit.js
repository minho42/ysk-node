import axios from "axios";
import { baseAmount, userAgent } from "../utils.js";

export const orbitremit = async () => {
  const name = "OrbitRemit";
  const url = "https://www.orbitremit.com";

  const data = JSON.stringify({
    amount: `${baseAmount}.00`, // <- '1000.00' must be string
    sendCurrency: "AUD",
    payoutCurrency: "KRW",
    focus: "send",
  });
  const config = {
    method: "post",
    url: "https://www.orbitremit.com/api/rates",
    headers: {
      authority: "www.orbitremit.com",
      pragma: "no-cache",
      "cache-control": "no-cache",
      "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      "sec-ch-ua-mobile": "?0",
      "user-agent": userAgent,
      "content-type": "application/json",
      accept: "*/*",
      origin: "https://www.orbitremit.com",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      referer: "https://www.orbitremit.com/",
      "accept-language": "en-AU,en;q=0.9,ko-KR;q=0.8,ko;q=0.7,en-GB;q=0.6,en-US;q=0.5",
      cookie: "sendCurrency=AUD",
    },
    data: data,
  };

  const res = await axios(config);
  const rate = res.data.data.attributes.rate;

  const res2 = await axios(`https://www.orbitremit.com/api/fees?send=AUD&payout=KRW&amount=${baseAmount}.00`);
  const fee = res2.data.fee;

  return {
    name,
    url,
    rate,
    fee,
    note: "",
  };
};
