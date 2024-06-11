const request = require("supertest");
const mongoose = require("mongoose");
const faker = require("faker");
const url = "localhost:3000/api/v1";
require("dotenv").config();

jest.setTimeout(30000);
let myToken = "";
let userId = "";
describe("POST /api/v1/tokens", () => {
  beforeAll(async () => {
    const registrationResponse = await request(url)
      .post("/users")
      .send({
        name: "John",
        surname: "Doe",
        username: "johndoe",
        email: "prova@gmail.com",
        password: "Password123!",
        latitude: 12.34,
        longitude: 56.78,
        volunteer: {
          isVolunteer: false,
        },
        certifier: {
          isCertifier: false,
        },
        operator118: {
          isOperator118: false,
        },
      })
      .set("Content-Type", "application/json")
      .expect(200);
    console.log("Response: ", registrationResponse.body);
    userId = registrationResponse.body._id;
    console.log("userId:", userId);

    const response = await request(url)
      .post("/tokens")
      .send({
        username: "johndoe",
        password: "Password123!",
      })
      .set("Content-Type", "application/json")
      .expect(200);

    console.log(response.body.token);
    const token = response.body.token;
    console.log(token);
    myToken = token;
  });

  afterAll(async () => {
    return request(url)
      .delete(`/users/${userId}`)
      .set("Content-Type", "application/json")
      .expect(200);
  });
  test("Token should be defined and a string", async () => {
    expect(myToken).toBeDefined();
    expect(typeof myToken).toBe("string");
  });
});
