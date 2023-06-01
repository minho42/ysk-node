import axios from "axios";
import * as cheerio from "cheerio";

export const naver = async () => {
  const name = "Naver";
  const url = "https://finance.naver.com/marketindex/exchangeDetail.nhn?marketindexCd=FX_AUDKRW";
  const selector = "#content > div.section_calculator > table:nth-child(4) > tbody > tr > td:nth-child(1)";

  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  const rate = $(selector).text().trim();
  const fee = 0;
  return {
    name,
    url,
    rate: parseFloat(rate),
    fee,
    note: "Base",
  };
};
