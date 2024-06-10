const request = require("supertest");
const mongoose = require("mongoose");
const faker = require("faker");
const url = "localhost:3000/api/v1/tokens";
require("dotenv").config();

jest.setTimeout(30000);

describe("POST /api/v1/tokens", () => {
  test("POST /api/v1/tokens with a valid user should return a valid token", async () => {
    const response = await request(url)
      .post("")
      .send({
        username: "johndoe",
        password: "Password123!",
      })
      .set("Content-Type", "application/json")
      .expect(200);

    const { token } = response.body;

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");

    return response;
  });
});
