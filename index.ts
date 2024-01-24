import getDateString from "./src/helpers/getDateString";
import getRouteString from "./src/helpers/getRouteString";
import Calculator from "./src/calculator/calculator";
import * as express from "express";
import * as bodyParser from "body-parser";
import { pino } from "pino";

export const app = express();
const __dirname = "logs";
const logger = pino({
  transport: {
    target: "pino/file",
    options: { destination: `${__dirname}/app.log` },
  },
});

//to do
//log to file -> see Transporting your Node.js logs below
//https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/
//move logger into it's own file

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
    logger.info("Home route");
    res.json({ message: "home" });
  } catch (error) {
    throw new Error(error);
  }
});

app.post(
  "/calculation-result/",
  (req: express.Request, res: express.Response, next: any) => {
    try {
      if (!req.body.expression) {
        res.statusCode = 500;
        throw new Error("Expression object not found.");
      }

      if (
        isNaN(calculator.calculate(req.body.expression)) &&
        req.body.expression === "make me tea"
      ) {
        res.statusCode = 418;
        throw new Error("Expression invalid. This is not a teapot.");
      }
      if (isNaN(calculator.calculate(req.body.expression))) {
        res.statusCode = 400;
        throw new Error("Expression invalid.");
      }
      if (!isNaN(calculator.calculate(req.body.expression))) {
        logger.info(
          "req.body: " +
            req.body.expression +
            " result: " +
            calculator.calculate(req.body.expression)
        );
        res.json({ result: calculator.calculate(req.body.expression) });
      }
    } catch (error) {
      res.status(res.statusCode);
      logger.error(error);
      res.send(`${error}`);
    }
  }
);

export const server = app.listen(port);
