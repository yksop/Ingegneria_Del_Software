const request = require("supertest");
const mongoose = require("mongoose");
const faker = require("faker");
const url = "localhost:3000/api/v1/tokens";
require("dotenv").config();

jest.setTimeout(30000);
let myToken;
describe("POST /api/v1/tokens", () => {
  
  beforeAll(async () => {
    const response = await request(url)
      .post("")
      .send({
        username: "johndoe",
        password: "Password123!",
      })
      .set("Content-Type", "application/json")
      .expect(200);

    const { token } = response.body;
    myToken = token;
  });

  test("Token should be defined and a string", () => {
    expect(myToken).toBeDefined();
    expect(typeof myToken).toBe("string");
  });
});