import { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import CurrencyItem from "./CurrencyItem";

export interface ICurrency {
  name: string;
  rate: number;
  realRate: number;
  fee: number;
  url: string;
  note: string;
  updated: Date;
}

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const getData = async () => {
    const res = await fetch("http://localhost:8000/data");
    const data: ICurrency[] = await res.json();
    // console.log(data);
    setCurrencies(data);

    if (data?.length > 0) {
      const dataSortedByUpdated = [...data].sort((a, b) => {
        if (new Date(a.updated) < new Date(b.updated)) return -1;
        else return 1;
      });

      const lastUpdate = dataSortedByUpdated[0].updated;
      if (lastUpdate) {
        setLastUpdate(formatDistance(new Date(lastUpdate), new Date(), { includeSeconds: true }) + " ago");
      }
    }
  };

  useEffect(() => {
    getData();
    setInterval(getData, 60 * 1000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between mt-2">
      {currencies?.length === 0 ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="w-11/12 md:w-auto">
          <thead>
            <tr className="border-b-2 border-gray-700">
              <th className="font-medium">Name</th>
              <th className="font-medium">Real rate</th>
              <th className="font-medium">Rate</th>
              <th className="font-medium">Fee</th>
              <th className="hidden sm:block font-medium">Note</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => {
              return <CurrencyItem key={currency.name} data={currency} />;
            })}
          </tbody>
        </table>
      )}

      <div className="mt-3">{lastUpdate}</div>
    </div>
  );
};

export default CurrencyList;