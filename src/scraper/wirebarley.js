import axios from "axios";
import { userAgent } from "../utils.js";

export const wirebarley = async () => {
  const name = "Wirebarley";
  const url = "https://www.wirebarley.com";

  const headers = {
    authority: "www.wirebarley.com",
    accept: "*/*",
    "accept-language": "en-AU,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/json",
    cookie: "__zlcmid=14ck6tyA4W5lnKa; lang=",
    "data-type": "json",
    lang: "en",
    pragma: "no-cache",
    referer: "https://www.wirebarley.com/",
    "sec-ch-ua": '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": userAgent,
  };

  const res = await axios.get("https://www.wirebarley.com/my/api/exrate/AU/AUD", { headers });
  if (res.status !== 200) {
    console.error("Status not 200 but:" + res.status);
    return {
      name,
      url,
      rate: 0,
      fee: 0,
      note: `Status: ${res.status}`,
    };
  }
  const rate = res.data.data.exRates.KR[0].wbRateData.wbRate3;
  const fee = res.data.data.exRates.KR[0].transferFees[0].fee2;
  return {
    name,
    url,
    rate,
    fee,
    note: "",
  };
};
