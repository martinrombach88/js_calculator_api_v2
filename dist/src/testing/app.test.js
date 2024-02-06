"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = __importStar(require("supertest"));
const index_1 = require("../../index");
describe("Testing Jest", () => {
    it("should test that true === true", () => {
        expect(true).toBe(true);
    });
});
describe("Testing the Server", () => {
    index_1.server;
    it("Server responds with status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.app).get("/");
        expect(response.status).toBe(200);
    }));
    it("Server responds with body {message: home}", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.app).get("/");
        expect(response.body).toEqual({
            message: "home",
        });
    }));
    afterAll(() => {
        index_1.server.close();
    });
});
describe("Testing valid request to Calculator API", () => {
    it("correct object responds with status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.app)
            .post("/calculation-result/")
            .send({ expression: "1+1" });
        expect(response.status).toBe(200);
    }));
    it("receives the expression 1 + 1 and returns 2", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.app)
            .post("/calculation-result/")
            .send({ expression: "1+1" });
        expect(response.body).toEqual({
            result: 2,
        });
    }));
    afterAll(() => {
        index_1.server.close();
    });
});
describe("Testing empty request to Calculator API", () => {
    it("Empty request responds with status 500", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.app).post("/calculation-result/").send();
        expect(response.status).toBe(500);
    }));
    it("Empty request returns error text", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.app).post("/calculation-result/").send();
        expect(response.text).toEqual("Error: Expression object not found.");
    }));
    afterAll(() => {
        index_1.server.close();
    });
});
describe("Testing invalid request to Calculator API", () => {
    it("Empty request responds with status 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.app)
            .post("/calculation-result/")
            .send({ expression: "bad" });
        expect(response.status).toBe(400);
    }));
    it("Empty request returns error text", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.app)
            .post("/calculation-result/")
            .send({ expression: "bad" });
        expect(response.text).toEqual("Error: Expression invalid.");
    }));
    afterAll(() => {
        index_1.server.close();
    });
});
describe("Testing 418 teapot HTML code", () => {
    it("Request 'make me tea' returns error and 418", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.app)
            .post("/calculation-result/")
            .send({ expression: "make me tea" });
        expect(response.status).toBe(418);
    }));
    it("'make me tea' request returns error text", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.app)
            .post("/calculation-result/")
            .send({ expression: "make me tea" });
        expect(response.text).toEqual("Error: Expression invalid. This is not a teapot.");
    }));
    afterAll(() => {
        index_1.server.close();
    });
});
//# sourceMappingURL=app.test.js.map