const request = require("supertest");
const { app, server } = require("../../index.ts");

describe("Sample Test", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

describe("Test Node Server, returns pong object", () => {
  server;
  // Test GET request to '/'
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

// describe("Test calculator route, param '1+1' returns 2", async () => {
//   server;
//   it("responds with status 200", async () => {
//     const response = await request(app).get("/");
//     expect(response.status).toBe(200);
//   });
//   it("responds with body {message: pong}", async () => {
//     const response = await request(app).get("/");
//     expect(response.body).toEqual({
//       message: "pong",
//     });
// });
