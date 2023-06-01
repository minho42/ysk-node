import { PrismaClient } from "@prisma/client";
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

const prisma = new PrismaClient();

// TODO: check if fees change
// hardcoded fees
// ie. const fee = 0
//     dondirect
//     naver: N/A
//     stra

export const fetchAll = async () => {
  console.log("fetchAll called");

  type Currency = {
    name: string;
    rate: number;
    realRate: number;
    fee: number;
    url: string;
    note: string;
    created: Date;
    updated: Date;
  };

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

      // console.log(data);
      console.log(`${data.name}: [${data.rate}], [${data.fee}]`);
      await prisma.currency.upsert({
        where: {
          name: data.name,
        },
        update: {
          rate: data.rate,
          realRate: getRealRate(data.rate, data.fee),
          fee: data.fee,
          url: data.url,
          note: data.note,
        },
        create: {
          name: data.name,
          rate: data.rate,
          realRate: getRealRate(data.rate, data.fee),
          fee: data.fee,
          url: data.url,
          note: data.note,
        },
      });
    } catch (error) {
      // TODO: set results to 0 when error occurs instead of getting the latest successful results
      // so it's clear which one failed
      console.error(error);
    }
  });
};
