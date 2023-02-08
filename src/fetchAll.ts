import { Currency } from "./models/currency";
import { connectToDb } from "./db/connectToDb";
import { getRealRate, ensureNumber } from "./utils";

import { commbank } from "./scraper/commbank";
import { dondirect } from "./scraper/dondirect";
import { instarem } from "./scraper/instarem";
import { naver } from "./scraper/naver";
import { ofx } from "./scraper/ofx";
import { orbitremit } from "./scraper/orbitremit";
import { remitly } from "./scraper/remitly";
import { stra } from "./scraper/stra";
import { wirebarley } from "./scraper/wirebarley";
import { wise } from "./scraper/wise";
import { wiztoss } from "./scraper/wiztoss";

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
