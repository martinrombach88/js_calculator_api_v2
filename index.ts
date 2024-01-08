import getDateString from "./src/api/helpers/getDateString";
import getRouteString from "./src/api/helpers/getRouteString";
import Calculator from "./src/api/calculator/calculator";
import Express from "express";

const express = require("express");
const bodyParser = require("body-parser");
const app: Express.Application = express();
const port: number = 8080;
const testCalc = new Calculator();

app.use(bodyParser.json());
app.use((req: Express.Request, res: Express.Response, next: any) => {
  //This cors rule allows anyone to use any route below
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req: Express.Request, res: Express.Response) => {
  res.json({ message: "pong" });
  // console.log(`${getRouteString("Home", port)} ${getDateString()}.`);
  //console.log(`Calculator says 1 + 1 =`, testCalc.calculate("1+1"));
});

app.post(
  "/calculation-result/",
  (req: Express.Response, res: Express.Response) => {
    console.log(
      `${getRouteString("Calculation", port)} Params: ${
        req.body.expression
      } has the result ${testCalc.calculate(
        req.body.expression
      )}. ${getDateString()}.`
    );
    res.json({ result: testCalc.calculate(req.body.expression) });
  }
);

const server = app.listen(port);

module.exports = { app, server };
