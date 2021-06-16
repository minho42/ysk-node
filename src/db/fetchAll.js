const https = require("https");
const Currency = require("../models/currency");
require("./mongoose");
const utils = require("../utils");
const naver = require("../scraper/naver");
const stra = require("../scraper/stra");
const wiztoss = require("../scraper/wiztoss");
const commbank = require("../scraper/commbank");
const wise = require("../scraper/wise");
const wirebarley = require("../scraper/wirebarley");
const remitly = require("../scraper/remitly");
const instarem = require("../scraper/instarem");
const azimo = require("../scraper/azimo");
const orbitremit = require("../scraper/orbitremit");

// TODO: remove comma from rate/realRate if A$1 > W1,000

// dondirect(),
// wontop(),
// gomtransfer(),

const fetchAll = async () => {
  console.log("fetchAll called");

  const companies = [naver, stra, wiztoss, commbank, wise, wirebarley, remitly, instarem, azimo, orbitremit];
  // const companies = [wise];
  companies.map(async (company) => {
    try {
      const data = await company();
      const filter = { name: data.name };
      // TODO some rate/fee are string vs number

      const update = {
        name: data.name,
        url: data.url,
        rate: data.rate,
        fee: data.fee,
        realRate: utils.getRealRate(data.rate, data.fee),
        note: data.note,
      };
      const r = await Currency.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
      });
    } catch (error) {
      console.error(error);
    }
  });
};

fetchAll();
module.exports = fetchAll;
