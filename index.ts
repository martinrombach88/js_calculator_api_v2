import getDateString from "./src/api/helpers/getDateString";
import getRouteString from "./src/api/helpers/getRouteString";
import Calculator from "./src/api/calculator/calculator";
import express from "express";
import bodyParser from "body-parser";
import { Logger, ILogObj } from "tslog";

// const log: Logger<ILogObj> = new Logger();
// log.silly("I am a silly log.");

const app = express();
const port: number = 8080;
const testCalc = new Calculator();
const logger: Logger<ILogObj> = new Logger();

app.use(bodyParser.json());
app.use((req: any, res: any, next: any) => {
  //This cors rule allows anyone to use any route below
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req: any, res: any) => {
  logger.log(1, `${getRouteString("Home", port)} ${getDateString()}.`);
  res.json({ message: "pong" });

  // console.log(`${getRouteString("Home", port)} ${getDateString()}.`);
  //console.log(`Calculator says 1 + 1 =`, testCalc.calculate("1+1"));
});

app.post("/calculation-result/", (req: any, res: any) => {
  logger.silly("test");
  console.log(
    `${getRouteString("Calculation", port)} Params: ${
      req.body.expression
    } has the result ${testCalc.calculate(
      req.body.expression
    )}. ${getDateString()}.`
  );
  res.json({ result: testCalc.calculate(req.body.expression) });
});

const server = app.listen(port);

module.exports = { app, server };
