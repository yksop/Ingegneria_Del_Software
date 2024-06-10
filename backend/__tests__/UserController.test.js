const request = require("supertest");
const mongoose = require("mongoose");
const faker = require("faker");
const url = "localhost:3000/api/v1/users";
require("dotenv").config();

jest.setTimeout(30000);

describe("POST /api/v1/users", () => {
  let userId;

  test("POST /api/v1/users with a valid user should return 200", async () => {
    const response = await request(url)
      .post("")
      .send({
        name: "John",
        surname: "Doe",
        username: faker.internet.userName(),
        email: faker.internet.email(),
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

    userId = response.body._id;

    return response;
  });

  test("POST /api/v1/users with an invalid password should return 400", async () => {
    return request(url)
      .post("")
      .send({
        name: "John",
        surname: "Doe",
        username: "johndoe",
        email: "prova@gmail.com",
        password: "password123!",
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
      .expect(400);
  });

  test("POST /api/v1/users with an invalid email should return 400", async () => {
    return request(url)
      .post("")
      .send({
        name: "John",
        surname: "Doe",
        username: "johndoe",
        email: "provagmail.com",
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
      .expect(400);
  });

  test("POST /api/v1/users with an already existent username should return 400", async () => {
    return request(url)
      .post("")
      .send({
        name: "John",
        surname: "Doe",
        username: "johndoe",
        email: "prova1@gmail.com",
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
      .expect(400);
  });

  test("POST /api/v1/users with an already existent email should return 400", async () => {
    return request(url)
      .post("")
      .send({
        name: "John",
        surname: "Doe",
        username: "johndoe1",
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
      .expect(400);
  });

  test("PATCH /api/v1/users/:userId with a valid user should return 200", async () => {
    return request(url)
      .patch(`/${userId}`)
      .send({
        isVolunteer: true,
        certificateCode: faker.random.alphaNumeric(6),
      })
      .set("Content-Type", "application/json")
      .expect(200);
  });

  test("PATCH /api/v1/users/:userId with non-existing userId should return 404", async () => {
    return request(url)
      .patch(`/123456789012345678901234`)
      .send({
        isVolunteer: true,
        certificateCode: faker.random.alphaNumeric(6),
      })
      .set("Content-Type", "application/json")
      .expect(404);
  });

  test("PATCH /api/v1/users/:userId without specifying certificateCode should return 400", async () => {
    return request(url)
      .patch(`/${userId}`)
      .send({
        isVolunteer: true,
      })
      .set("Content-Type", "application/json")
      .expect(400);
  });

  test("PATCH /api/v1/users/:userId with a user who's already a volunteer should return 400", async () => {
    return request(url)
      .patch(`/${userId}`)
      .send({
        isVolunteer: true,
        certificateCode: faker.random.alphaNumeric(6),
      })
      .set("Content-Type", "application/json")
      .expect(400);
  });
});
