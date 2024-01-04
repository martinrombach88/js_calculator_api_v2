import getDateString from "./helpers/getDateString";
import getRouteString from "./helpers/getRouteString";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port: number = 8080;

app.use(bodyParser.json());
app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req: any, res: any) => {
  res.json({ message: "pong" });
  console.log(`${getRouteString("Home", port)} ${getDateString()}.`);
});

const server = app.listen(port, () => {
  // console.log(`Server listening on port ${port}`);
});

module.exports = { app, server };
