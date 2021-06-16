const axios = require("axios");
const utils = require("../utils");

const instarem = async () => {
  const name = "InstaReM";
  const url = "https://www.instarem.com/en-au";

  return new Promise(async function (resolve, reject) {
    try {
      const res = await axios.get(
        `https://www.instarem.com/api/v1/public/transaction/computed-value?source_currency=AUD&destination_currency=KRW&instarem_bank_account_id=135&source_amount=${utils.baseAmount}`
      );
      const rate = res.data.data.destination_amount / utils.baseAmount;
      const fee = res.data.data.transaction_fee_amount;

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

module.exports = instarem;
