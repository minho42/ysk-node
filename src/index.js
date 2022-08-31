import express from "express";
import cors from "cors";
import morgan from "morgan";
import cron from "node-cron";
import helmet from "helmet";
import { Currency } from "./models/currency.js";
import { fetchAll } from "./fetchAll.js";
fetchAll();

cron.schedule(
  "*/10 * * * *",
  () => {
    console.log("Running a job: fetchAll");
    fetchAll();
  },
  {
    timezone: "Australia/Sydney",
  }
);

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

const port = process.env.PORT || 8000;

app.get("", (req, res) => {
  res.send({
    data: "It's working!",
  });
});

app.get("/data", async (req, res) => {
  try {
    const data = await Currency.find({}, "-_id -created -__v").sort({ realRate: -1 });

    res.send(data);
  } catch (error) {
    throw error;
  }
});

app.get("*", (req, res) => {
  res.status(404).send({
    error: "404 Not Found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
