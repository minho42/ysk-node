import axios from "axios";
import { baseAmount } from "../utils.js";

export const ofx = async () => {
  const name = "OFX";
  const url = "https://www.ofx.com/en-au/transfer-rates";

  const res = await axios.get(
    `https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/AUD/KRW/${baseAmount}?format=json`
  );
  const data = res.data;

  const rate = data.CustomerRate;
  const fee = data.Fee;
  const note = "";
  return {
    name,
    url,
    rate,
    fee,
    note,
  };
};
