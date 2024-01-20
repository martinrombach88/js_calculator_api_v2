import express from "express";
import getDateString from "./api/helpers/getDateString";
import getRouteString from "./api/helpers/getRouteString";
import bodyParser from "body-parser";
import Calculator from "../src/calculator/calculator";

export const app = express();
const calculator = new Calculator();

app.use(bodyParser.json());
app.use((req: any, res: any, next: any) => {
  //This cors rule allows anyone to use any route below
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req: any, res: any) => {
  console.log(1, `${getRouteString("Home", port)} ${getDateString()}.`);
  res.json({ message: "pong" });
});

app.post("/calculation-result/", (req: any, res: any) => {
  console.log(
    `${getRouteString("Calculation", port)} Params: ${
      req.body.expression
    } has the result ${calculator.calculate(
      req.body.expression
    )}. ${getDateString()}.`
  );
  res.json({ result: calculator.calculate(req.body.expression) });
});

const port: number = 8080;

export const server = app.listen(port);
