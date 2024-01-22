import getDateString from "./src/helpers/getDateString";
import getRouteString from "./src/helpers/getRouteString";
import Calculator from "./src/calculator/calculator";
import * as express from "express";
import * as bodyParser from "body-parser";

export const app = express();
const port: number = 8080;
const calculator = new Calculator();

app.use(bodyParser.json());
app.use((req: express.Request, res: express.Response, next: any) => {
  //This cors rule allows anyone to use any route below
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req: any, res: any) => {
  try {
    res.json({ message: "pong" });
  } catch (error) {
    throw new Error(error);
  }
});

app.post(
  "/calculation-result/",
  (req: express.Request, res: express.Response, next: any) => {
    try {
      if (!req.body.expression) {
        throw new Error("Expression object not found.");
      }
      if (calculator.calculate(req.body.expression) > 0) {
        res.json({ result: calculator.calculate(req.body.expression) });
      } else {
        throw new Error("Expression invalid.");
      }
    } catch (error) {
      res.status(400);
      res.send(`${error}`);
    }
  }
);

export const server = app.listen(port);
