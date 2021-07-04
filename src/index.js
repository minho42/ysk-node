require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Currency = require("./models/currency");
const cron = require("node-cron");
const fetchAll = require("./fetchAll");
const helmet = require("helmet");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

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

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

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

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.get("*", (req, res) => {
  res.status(404).send({
    error: "404 Not Found",
  });
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
