require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Currency = require("./models/currency");
const cron = require("node-cron");
const fetchAll = require("./fetchAll");
const helmet = require("helmet");

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
