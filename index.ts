import getDateString from "./src/helpers/getDateString";
import getRouteString from "./src/helpers/getRouteString";
import Calculator from "./src/calculator/calculator";

import * as express from "express";

import * as bodyParser from "body-parser";

//const express = require("express");
export const app = express();

//const bodyParser = require("body-parser");
const port: number = 8080;
const testCalc = new Calculator();

app.use(bodyParser.json());
app.use((req: express.Request, res: express.Response, next: any) => {
  //This cors rule allows anyone to use any route below
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req: any, res: any) => {
  console.log(1, `${getRouteString("Home", port)} ${getDateString()}.`);
  res.json({ message: "pong" });

  // console.log(`${getRouteString("Home", port)} ${getDateString()}.`);
  //console.log(`Calculator says 1 + 1 =`, testCalc.calculate("1+1"));
});

app.post(
  "/calculation-result/",
  (req: express.Request, res: express.Response, next: any) => {
    try {
      if (!req.body.expression) {
        console.log("error block triggered");
        throw new Error(
          "Expression object not found. Format should be: {expression: `my numbers and operators`}"
        );
      }
      // if (typeof testCalc.calculate(req.body.expression) != "number") {
      //   console.log("error block triggered");
      //   throw new Error("Invalid expression received.");
      // }
      res.json({ result: testCalc.calculate(req.body.expression) });
    } catch (error) {
      res.status(400);
      res.send(`${error}`);
      //add to log file, error, date using string constructor.
    }
    //
    // console.log(
    //   `${getRouteString("Calculation", port)} Params: ${
    //     req.body.expression
    //   } has the result ${testCalc.calculate(
    //     req.body.expression
    //   )}. ${getDateString()}.`
    // );
  }
);

export const server = app.listen(port);
