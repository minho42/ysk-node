const axios = require("axios");
const utils = require("../utils");

const instarem = async () => {
  const name = "InstaReM";
  const url = "https://www.instarem.com/en-au";

  const res = await axios.get(
    `https://www.instarem.com/api/v1/public/transaction/computed-value?source_currency=AUD&destination_currency=KRW&instarem_bank_account_id=135&source_amount=${utils.baseAmount}`
  );
  const rate = res.data.data.destination_amount / utils.baseAmount;
  const fee = res.data.data.transaction_fee_amount;

  return {
    name,
    url,
    rate,
    fee,
    note: "",
  };
};

module.exports = instarem;
