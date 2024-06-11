const request = require("supertest");
const mongoose = require("mongoose");
const faker = require("faker");
const url = "localhost:3000/api/v2";
require("dotenv").config();

jest.setTimeout(30000);

let myToken = "";
let userId = "";


describe("Login testing", () => {

  beforeAll(async () => {
    // I connect to the MongoDB database
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

    // I register a new user
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
  
    userId = registrationResponse.body._id;
  });

  // _______________________________________________________________________________________

  test("POST /api/v1/tokens with correct username and password should return 200", async () => {
    const response = await request(url)
      .post("/tokens")
      .send({
        username: "johndoe",
        password: "Password123!",
      })
      .set("Content-Type", "application/json")
      .expect(200);

    myToken = response.body.token;
    
    expect(myToken).toBeDefined();
    expect(typeof myToken).toBe("string");
  });


  test("POST /api/v1/tokens with wrong password should return 401", async () => {
    const response = await request(url)
      .post("/tokens")
      .send({
        username: "johndoe",
        password: "Password123!_uncorrect",
      })
      .set("Content-Type", "application/json")
      .expect(401);

    myToken = response.body.token;
    
    expect(myToken).toBeUndefined();
  });


  test("POST /api/v1/tokens with wrong username should return 401", async () => {
    const response = await request(url)
      .post("/tokens")
      .send({
        username: "incorrectusername",
        password: "Password123!",
      })
      .set("Content-Type", "application/json")
      .expect(401);
  
    myToken = response.body.token;
  
    expect(myToken).toBeUndefined();
  });


  test("POST /api/v1/tokens with wrong username and password should return 401", async () => {
    const response = await request(url)
      .post("/tokens")
      .send({
        username: "incorrectusername",
        password: "Password123!_incorrect",
      })
      .set("Content-Type", "application/json")
      .expect(401);
  
    myToken = response.body.token;
  
    expect(myToken).toBeUndefined();
  });



  afterAll(async () => {
    return request(url)
      .delete(`/users/${userId}`)
      .set("Content-Type", "application/json")
      .expect(200);
  });
});


