const request = require("supertest");
const mongoose = require("mongoose");
const faker = require("faker");
const url = "localhost:3000/api/v1/alerts";
require("dotenv").config();

jest.setTimeout(30000);


describe("GET /api/v1/alerts/:id", () => {
  test("GET /api/v1/alerts/:id with a valid alert ID should return the alert", async () => {
    const response = await request(url)
      .get("/:id")
      .expect(200);

    const { alert } = response.body;

    expect(alert).toBeDefined();
    expect(typeof alert).toBe("object");
    expect(alert._id).toBeDefined();
    expect(alert.latitude).toBeDefined();
    expect(alert.longitude).toBeDefined();
    return response;
  });

  test("GET /api/v1/alerts/:id with an invalid alert ID should return an error", async () => {
    const response = await request(url)
      .get("/:id")
      .set("Authorization", "Bearer <valid_token>")
      .expect(400);

    const { error } = response.body;

    expect(error).toBeDefined();
    expect(typeof error).toBe("string");

    return response;
  });
});