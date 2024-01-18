import * as request from "supertest";
import { app, server } from "../../index";

describe("Testing Jest", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

describe("Testing the Server", () => {
  server;
  it("responds with status 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
  it("responds with body {message: pong}", async () => {
    const response = await request(app).get("/");
    expect(response.body).toEqual({
      message: "pong",
    });
  });

  afterAll(() => {
    server.close();
  });
});

describe("Testing the Calculation Post Request", () => {
  it("responds with status 200", async () => {
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
