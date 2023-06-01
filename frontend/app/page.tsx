import HomePage from "./home-page";

async function getCurrencies() {
  const res = await fetch("http://localhost:8000/data");
  const data = await res.json();
  return data;
}

export default async function Home() {
  const currencies = await getCurrencies();
  return <HomePage currencies={currencies} />;
}
