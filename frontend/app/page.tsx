import HomePage from "./home-page";

async function getCurrencies() {
  const res = await fetch("https://ysk-node.up.railway.app/data");
  const data = await res.json();
  return data;
}

export default async function Home() {
  const currencies = await getCurrencies();
  return <HomePage currencies={currencies} />;
}
