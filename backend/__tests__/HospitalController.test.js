const request = require("supertest");
const mongoose = require("mongoose");
const faker = require("faker");
const url = "localhost:3000/api/v2/hospitals";
require("dotenv").config();

jest.setTimeout(10000);

let hospitalId="";

describe("Hospital routes", () => {

  beforeAll(async () => {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  test("POST /api/v2/hospitals should create a new hospital", async () => {
    const response = await request(url)
    .post("")
    .send({
      latitude: 12.1,
      longitude: 56.1,
      nome: "ciao",
      tipo: "ABC",
      via: "Hospital Street",
      civico: 23,
    })
    .set("Content-Type", "application/json")
    .expect(200);
    hospitalId = response.body._id;

    const createdHospital = response.body;
    expect(createdHospital.latitude).toBe(12.1); 
    expect(createdHospital.longitude).toBe(56.1);
    expect(createdHospital.nome).toBe("ciao");
    expect(createdHospital.tipo).toBe("ABC");
    expect(createdHospital.via).toBe("Hospital Street");
    expect(createdHospital.civico).toBe(23);
  });

  /*
    test("should return 400 if hospital data is invalid", async () => {
      const response = await request(url)
        .post("")
        .send({
          // Invalid hospital data
        })
        .expect(400);
    });

    test("should return 400 if identical active hospital already exists", async () => {
      // Create a hospital with the same data
      await request(url)
        .post("")
        .send({
          latitude: 12.34,
          longitude: 56.78,
          id: "123",
          codvia: "ABC",
          desvia: "Hospital Street",
          fumetto: "A",
        })
        .expect(200);

      // Try to create another hospital with the same data
      const response = await request(url)
        .post("")
        .send({
          latitude: 12.34,
          longitude: 56.78,
          id: "123",
          codvia: "ABC",
          desvia: "Hospital Street",
          fumetto: "A",
        })
        .expect(400);
    });
    */


  afterAll(async () => {
    return request(url)
      .delete(`/${hospitalId}`)
      .set("Content-Type", "application/json")
      .expect(200);
  });

});