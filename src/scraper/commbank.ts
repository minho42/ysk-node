import axios from "axios";
import * as cheerio from "cheerio";

export const commbank = async () => {
  const name = "Commbank";
  const url =
    "https://www.commbank.com.au/personal/international/foreign-exchange-rates.html?ei=cb-fx-calc-full-fx-list";
  // const feeSelector = "#cba-imt-hero-mbox > div > div > div.banner-content-panel > div > div:nth-child(2) > p";

  const timestamp = Math.floor(Date.now());
  const res = await axios.get(
    `https://www.commbank.com.au/content/data/forex-rates/AUD.json?path=${timestamp}`
  );
  const data = res.data.currencies;
  let rate = "0";
  data.map((c) => {
    if (c.currencyTitle === "KRW") {
      rate = c.bsImt;
    }
  });

  const res2 = await axios.get(
    "https://www.commbank.com.au/personal/international/international-money-transfer.html"
  );
  const $$ = cheerio.load(res2.data);
  // const feeText = $$(feeSelector).text().trim();
  // const fee = feeText.match(/\$([\d,.]+)/)[1];

  // Please note: From 1st June 2023, the transfer fee will be waived (excluding AUD to AUD transfers)
  const fee = 0;

  return {
    name,
    url,
    rate: parseFloat(rate),
    fee: fee,
    note: "",
  };
};
