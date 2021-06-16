require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Currency = require("./models/currency");
const cron = require("node-cron");
const fetchAll = require("./db/fetchAll");

cron.schedule(
  "*/5 * * * *",
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
const port = process.env.PORT || 8000;

app.get("", (req, res) => {
  res.send({
    data: "It's working!",
  });
});

app.get("/data", async (req, res) => {
  try {
    const data = await Currency.find({});
    // data.sort((a, b) => {
    //   return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    // });

    res.send({ data });
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
