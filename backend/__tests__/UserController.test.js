const request = require("supertest");
const mongoose = require("mongoose");
const url = "localhost:3000/api/v1/users";
require("dotenv").config();

jest.setTimeout(30000);

describe("POST /api/v1/users", () => {
  test("POST /api/v1/users with a valid user should return 200", async () => {
    return request(url)
      .post("")
      .send({
        name: "John",
        surname: "Doe",
        username: "johndoe",
        email: "prova@gmail.com",
        password: "Password123!",
        latitude: 12.34,
        longitude: 56.78,
        volunteer: {
          isVolunteer: true,
          certificateCode: "CERT123",
          acceptedAlert: new mongoose.Types.ObjectId().toHexString(),
          isAvailable: true,
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
  });
});
