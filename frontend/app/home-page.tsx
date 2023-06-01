"use client";

import { formatDistance } from "date-fns";

type Currency = {
  name: string;
  rate: number;
  realRate: number;
  fee: number;
  url: string;
  note: string;
  updated: Date;
};

function CurrencyItem({ data: { name, rate, fee, realRate, url, updated, note } }: { data: Currency }) {
  return (
    <div className="w-96 rounded-xl bg-white shadow px-6 py-3">
      <div className="">
        <h2 className="">
          <a
            className="text-lg font-semibold underline underline-offset-2"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        </h2>
        <h2 className="text-2xl font-semibold">{realRate > 0 ? realRate.toFixed(2) : "-"}</h2>

        <div className="">
          {rate !== realRate ? (
            <div>
              <div className="">Rate: {rate.toFixed(2)}</div>
              <div className="text-red-600">Fee: {fee.toFixed(2)}</div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {note ? <div className="py-3">{note}</div> : ""}
        <div className="text-center text-sm text-gray-400 pt-3">
          {formatDistance(new Date(updated), new Date(), { includeSeconds: false, addSuffix: true })}
        </div>
      </div>
    </div>
  );
}

export default function HomePage({ currencies }: { currencies: Currency[] }) {
  return (
    <div className="flex flex-col gap-3 mb-20">
      {currencies.map((currency: Currency) => (
        <CurrencyItem key={currency.name} data={currency} />
      ))}
    </div>
  );
}
