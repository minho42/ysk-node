import { Currency } from "./models/currency.js";
import { connectToDb } from "./db/connectToDb.js";
import { getRealRate } from "./utils.js";

import { azimo } from "./scraper/azimo.js";
import { commbank } from "./scraper/commbank.js";
import { dondirect } from "./scraper/dondirect.js";
import { gomtransfer } from "./scraper/gomtransfer.js";
import { instarem } from "./scraper/instarem.js";
import { naver } from "./scraper/naver.js";
import { orbitremit } from "./scraper/orbitremit.js";
import { remitly } from "./scraper/remitly.js";
import { stra } from "./scraper/stra.js";
import { wirebarley } from "./scraper/wirebarley.js";
import { wise } from "./scraper/wise.js";
import { wiztoss } from "./scraper/wiztoss.js";
import { wontop } from "./scraper/wontop.js";

// TODO: check if fees change
// hardcoded fees
// ie. const fee = 0
//     dondirect
//     gomtransfer
//     naver: N/A
//     stra
//     wontop

export const fetchAll = async () => {
  console.log("fetchAll called");
  try {
    connectToDb();
  } catch (e) {
    console.error(e);
    return;
  }

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
      // console.log(data);
      console.log(`${data.name}: [${data.rate}], [${data.fee}]`);
      const update = {
        name: data.name,
        url: data.url,
        rate: parseFloat(data.rate).toFixed(2),
        fee: parseFloat(data.fee).toFixed(2),
        realRate: parseFloat(getRealRate(data.rate, data.fee)).toFixed(2),
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
