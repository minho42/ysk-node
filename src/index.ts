import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cron from "node-cron";
import helmet from "helmet";
import { fetchAll } from "./fetchAll";

const prisma = new PrismaClient();

fetchAll();

// https://crontab.guru/
cron.schedule(
  "*/120 * * * *",
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

app.get("", (req: Request, res: Response) => {
  res.send({
    data: "It's working!",
  });
});

app.get("/data", async (req: Request, res: Response) => {
  try {
    const data = await prisma.currency.findMany({
      orderBy: [{ realRate: "desc" }, { name: "asc" }],
    });

    res.send(data);
  } catch (error) {
    throw error;
  }
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).send({
    error: "404 Not Found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
