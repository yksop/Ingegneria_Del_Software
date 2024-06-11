const request = require("supertest");
const mongoose = require("mongoose");
const faker = require("faker");
const url = "localhost:3000/api/v2/users";
require("dotenv").config();
const User = require("../app/models/User");

jest.setTimeout(10000);
let testUserId;
let userId;

describe("POST /api/v2/users", () => {

  beforeAll(async () => {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const registrationResponse = await request(url)
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

    userId = registrationResponse.body._id;

  });

  test("POST /api/v2/users with a valid user should return 200", async () => {
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

    testUserId = response.body._id;

    return response;
  });

  test("POST /api/v2/users with an invalid password should return 400", async () => {
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

  test("POST /api/v2/users with an invalid email should return 400", async () => {
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

  test("POST /api/v2/users with an already existent username should return 400", async () => {
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

  test("POST /api/v2/users with an already existent email should return 400", async () => {
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

  afterAll(async () => {
    await mongoose.connection.close();

    return request(url)
      .delete(`/${userId}`)
      .set("Content-Type", "application/json")
      .expect(200);
  });

});



describe("PATCH /api/v2/users", () => {

  test("PATCH /api/v2/users/:userId with a valid user to upgrade him should return 200", async () => {
    return request(url)
      .patch(`/${testUserId}`)
      .send({
        isVolunteer: true,
        certificateCode: faker.random.alphaNumeric(6),
      })
      .set("Content-Type", "application/json")
      .expect(200);
  });

  test("PATCH /api/v2/users/:userId with non-existing userId should return 404", async () => {
    return request(url)
      .patch(`/123456789012345678901234`)
      .send({
        isVolunteer: true,
        certificateCode: faker.random.alphaNumeric(6),
      })
      .set("Content-Type", "application/json")
      .expect(404);
  });

  test("PATCH /api/v2/users/:userId without specifying certificateCode should return 400", async () => {
    return request(url)
      .patch(`/${testUserId}`)
      .send({
        isVolunteer: true,
      })
      .set("Content-Type", "application/json")
      .expect(400);
  });

  test("PATCH /api/v2/users/:userId with a user who's already a volunteer should return 400", async () => {
    return request(url)
      .patch(`/${testUserId}`)
      .send({
        isVolunteer: true,
        certificateCode: faker.random.alphaNumeric(6),
      })
      .set("Content-Type", "application/json")
      .expect(400);
  });

  test("PATCH /api/v2/users/:userId with a valid user to downgrade him without providing certificate code should return 200 ", async () => {
    return request(url)
      .patch(`/${testUserId}`)
      .send({
        isVolunteer: false,
      })
      .set("Content-Type", "application/json")
      .expect(200);
  });

  test("PATCH /api/v2/users/:userId with a valid user to downgrade him should return 200 ", async () => {
    return request(url)
      .patch(`/${testUserId}`)
      .send({
        isVolunteer: false,
        certificateCode: faker.random.alphaNumeric(6),
      })
      .set("Content-Type", "application/json")
      .expect(400);
  });

  test("PATCH /api/v2/users/:userId with a non-valid userId to downgrade him should return 404 ", async () => {
    return request(url)
      .patch(`/123456789012345678901234`)
      .send({
        isVolunteer: false,
        certificateCode: faker.random.alphaNumeric(6),
      })
      .set("Content-Type", "application/json")
      .expect(404);
  });
  test("PATCH /api/v2/users/:userId with a valid user to downgrade him without providing certificate code should return 200 ", async () => {
    return request(url)
      .patch(`/${testUserId}`)
      .send({
        isVolunteer: false,
      })
      .set("Content-Type", "application/json");
  });
  test("PATCH /api/v2/users/:userId with an available volunteer trying to remove availabilty should return 200 ", async () => {
    return request(url)
      .patch(`/${testUserId}`)
      .send({
        isAvailable: false,
      })
      .set("Content-Type", "application/json")
      .expect(200);
  });
  test("PATCH /api/v2/users/:userId with a valid user to modify credentials should return 200 ", async () => {
    return request(url)
      .patch(`/${testUserId}`)
      .send({
        username: "JohnDoe1",
        password: "Password1!",
      })
      .set("Content-Type", "application/json")
      .expect(200);
  });
});



describe("DELETE /api/v2/users", () => {
  test("DELETE /api/v2/users/:userId with a valid userId should return 200", async () => {
    return request(url)
      .delete(`/${testUserId}`)
      .set("Content-Type", "application/json")
      .expect(200);
  });
});
