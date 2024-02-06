"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const calculator_1 = __importDefault(require("./src/calculator/calculator"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const pino_1 = require("pino");
exports.app = (0, express_1.default)();
const logger = (0, pino_1.pino)({
    transport: {
        target: "pino/file",
        options: { destination: `logs/app.log` },
    },
});
const port = 8080;
const calculator = new calculator_1.default();
exports.app.use(body_parser_1.default.json());
exports.app.use((req, res, next) => {
    //This cors rule allows anyone to use any route below
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
exports.app.get("/", (req, res) => {
    try {
        logger.info("Home route");
        res.json({ message: "home" });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.app.post("/calculation-result/", (req, res, next) => {
    try {
        if (!req.body.expression) {
            res.statusCode = 500;
            throw new Error("Expression object not found.");
        }
        if (isNaN(calculator.calculate(req.body.expression)) &&
            req.body.expression === "make me tea") {
            res.statusCode = 418;
            throw new Error("Expression invalid. This is not a teapot.");
        }
        if (isNaN(calculator.calculate(req.body.expression))) {
            res.statusCode = 400;
            throw new Error("Expression invalid.");
        }
        if (!isNaN(calculator.calculate(req.body.expression))) {
            logger.info("req.body: " +
                req.body.expression +
                " result: " +
                calculator.calculate(req.body.expression));
            res.json({ result: calculator.calculate(req.body.expression) });
        }
    }
    catch (error) {
        res.status(res.statusCode);
        logger.error(error);
        res.send(`${error}`);
    }
});
exports.server = exports.app.listen(port);
// export const handler = serverless(app);
//# sourceMappingURL=index.js.map