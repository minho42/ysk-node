import axios from "axios";
import cheerio from "cheerio";

export const stra = async () => {
  const name = "Stra";
  const url = "http://1472.com.au";
  const selector = "#m_right > div.aukr > div.ex_bg > span";

  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  const rate = $(selector).text().trim();
  const fee = 0;
  return {
    name,
    url,
    rate,
    fee,
    note: "No fee over $1000",
  };
};
