import * as request from "supertest";
import { app, server } from "../../index";
import { error } from "console";

describe("Testing Jest", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

describe("Testing the Server", () => {
  server;
  it("Server responds with status 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
  it("Server responds with body {message: pong}", async () => {
    const response = await request(app).get("/");
    expect(response.body).toEqual({
      message: "pong",
    });
  });

  afterAll(() => {
    server.close();
  });
});

describe("Testing valid request to Calculator API", () => {
  it("correct object responds with status 200", async () => {
    const response = await request(app)
      .post("/calculation-result/")
      .send({ expression: "1+1" });
    expect(response.status).toBe(200);
  });

  it("receives the expression 1 + 1 and returns 2", async () => {
    const response = await request(app)
      .post("/calculation-result/")
      .send({ expression: "1+1" });
    expect(response.body).toEqual({
      result: 2,
    });
  });
  afterAll(() => {
    server.close();
  });
});

describe("Testing empty request to Calculator API", () => {
  it("Empty request responds with status 400", async () => {
    const response = await request(app).post("/calculation-result/").send();
    expect(response.status).toBe(400);
  });

  it("Empty request returns error text", async () => {
    const response = await request(app).post("/calculation-result/").send();
    expect(response.text).toEqual("Error: Expression object not found.");
  });
  afterAll(() => {
    server.close();
  });
});

describe("Testing invalid request to Calculator API", () => {
  it("Empty request responds with status 400", async () => {
    const response = await request(app)
      .post("/calculation-result/")
      .send({ expression: "bad" });
    expect(response.status).toBe(400);
  });

  it("Empty request returns error text", async () => {
    const response = await request(app)
      .post("/calculation-result/")
      .send({ expression: "bad" });
    expect(response.text).toEqual("Error: Expression invalid.");
  });
  afterAll(() => {
    server.close();
  });
});
