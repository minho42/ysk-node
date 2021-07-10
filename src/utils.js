import axios from "axios";
import cheerio from "cheerio";

const baseAmount = 1000;
const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36";

const getRealRate = (rate, fee) => {
  if (!fee || fee === 0) return rate;

  return Math.round((baseAmount - fee) * rate * 100) / 100 / baseAmount;
};

const getNaverUsd = async () => {
  const selector = "#content > div.section_calculator > table:nth-child(4) > tbody > tr > td:nth-child(1)";

  const res = await axios.get(
    "https://finance.naver.com/marketindex/exchangeDetail.nhn?marketindexCd=FX_USDKRW"
  );
  const $ = cheerio.load(res.data);
  const result = $(selector).text().trim().replace(",", "");

  return result;
};

const ensureNumber = (n) => {
  const n2 = n.replace(",", "");
  return parseFloat(n2).toFixed(2);
};

export { baseAmount, userAgent, getRealRate, getNaverUsd, ensureNumber };
