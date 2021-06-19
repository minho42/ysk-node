const https = require("https");
const Currency = require("./models/currency");
require("./db/mongoose");
const utils = require("./utils");

const azimo = require("./scraper/azimo");
const commbank = require("./scraper/commbank");
const dondirect = require("./scraper/dondirect");
const gomtransfer = require("./scraper/gomtransfer");
const instarem = require("./scraper/instarem");
const naver = require("./scraper/naver");
const orbitremit = require("./scraper/orbitremit");
const remitly = require("./scraper/remitly");
const stra = require("./scraper/stra");
const wirebarley = require("./scraper/wirebarley");
const wise = require("./scraper/wise");
const wiztoss = require("./scraper/wiztoss");
const wontop = require("./scraper/wontop");

// TODO: check if fees change
// hardcoded fees
// ie. const fee = 0
//     dondirect
//     gomtransfer
//     naver: N/A
//     stra
//     wontop

const fetchAll = async () => {
  console.log("fetchAll called");

  const companies = [
    azimo,
    commbank,
    dondirect,
    gomtransfer,
    instarem,
    naver,
    orbitremit,
    remitly,
    stra,
    wirebarley,
    wise,
    wiztoss,
    wontop,
  ];

  companies.map(async (company) => {
    try {
      const data = await company();
      const filter = { name: data.name };
      console.log(data);
      const update = {
        name: data.name,
        url: data.url,
        rate: parseFloat(data.rate).toFixed(2),
        fee: parseFloat(data.fee).toFixed(2),
        realRate: parseFloat(utils.getRealRate(data.rate, data.fee)).toFixed(2),
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
