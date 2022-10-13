import { Currency } from "./models/currency.js";
import { connectToDb } from "./db/connectToDb.js";
import { getRealRate, ensureNumber } from "./utils.js";

import { commbank } from "./scraper/commbank.js";
import { dondirect } from "./scraper/dondirect.js";
import { instarem } from "./scraper/instarem.js";
import { naver } from "./scraper/naver.js";
import { ofx } from "./scraper/ofx.js";
import { orbitremit } from "./scraper/orbitremit.js";
import { remitly } from "./scraper/remitly.js";
import { stra } from "./scraper/stra.js";
import { wirebarley } from "./scraper/wirebarley.js";
import { wise } from "./scraper/wise.js";
import { wiztoss } from "./scraper/wiztoss.js";

// TODO: check if fees change
// hardcoded fees
// ie. const fee = 0
//     dondirect
//     naver: N/A
//     stra

export const fetchAll = async () => {
  console.log("fetchAll called");
  try {
    connectToDb();
  } catch (e) {
    console.error(e);
    return;
  }

  const companies = [
    commbank,
    dondirect,
    instarem,
    naver,
    ofx,
    orbitremit,
    remitly,
    stra,
    wirebarley,
    wise,
    wiztoss,
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
        rate: ensureNumber(data.rate),
        fee: ensureNumber(data.fee),
        realRate: ensureNumber(getRealRate(data.rate, data.fee)),
        note: data.note,
      };
      const r = await Currency.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
      });
    } catch (error) {
      // TODO: set results to 0 when error occurs instead of getting the latest successful results
      // so it's clear which one failed
      console.error(error);
    }
  });
};
