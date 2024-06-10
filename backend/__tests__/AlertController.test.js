const mongoose = require("mongoose");
const faker = require("faker");
require("dotenv").config();
const request = require("supertest");
const url = "http://localhost:3000";

describe("User with specific roles", () => {
  let authToken = "";

  beforeAll(async () => {
    //Create User with permisisons
    await request(url)
      .post("/api/v1/users")
      .send({
        name: "John",
        surname: "Doe",
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: "Password123!",
        latitude: 12.34,
        longitude: 56.78,
        volunteer: {
          isVolunteer: true,
        },
        certifier: {
          isCertifier: true,
        },
        operator118: {
          isOperator118: true,
        },
      })
      .expect(200);

    //Log In the User with permissions
    const loginResponse = await request(url)
      .post("/api/v1/tokens")
      .send({
        username: "johndoe",
        password: "Password123!",
      })
      .expect(200);
    console.log("Token of user with permissions: ", loginResponse.body.token);
    authToken = loginResponse.body.token;
  });

  test("GET /api/v1/alerts/:id with a valid alert ID should return the alert", async () => {
    const response = await request(url)
      .get("/api/v1/alerts/6666c22349f7eda44ee685b5")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);
    console.log(response.body);

    const alert = response.body;

    expect(alert).toBeDefined();
    expect(typeof alert).toBe("object");
    expect(alert._id).toBeDefined();
    expect(alert.latitude).toBeDefined();
    expect(alert.longitude).toBeDefined();
    expect(alert.triage).toBeDefined();
    expect(alert.emergency).toBeDefined();
    expect(alert.radius).toBeDefined();
    expect(alert.expiresIn).toBeDefined();
    expect(alert.isActive).toBeDefined();
    expect(alert.description).toBeDefined();
    expect(alert.timeForAmbulance).toBeDefined();
  });
});
