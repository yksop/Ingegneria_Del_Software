const mongoose = require("mongoose");
const faker = require("faker");
require("dotenv").config();
const request = require("supertest");
const url = "http://localhost:3000";

describe("User with 118 and Voluntary permissions ", () => {
  let authToken = "";
  let userId = "";
  let alertId = "";

  beforeAll(async () => {
    // TODO: connect to database
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

    // Create User with all permissions
    const registrationResponse = await request(url)
      .post("/api/v1/users")
      .send({
        name: "alberto",
        surname: "Dal Bosco",
        username: "albertodalbosco",
        email: "dalbosco.alby@gmail.com",
        password: "Password123!",
        latitude: 12.34,
        longitude: 56.78,
        volunteer: {
          isVolunteer: true,
        },
        certifier: {
          isCertifier: false,
        },
        operator118: {
          isOperator118: true,
        },
      })
      .expect(200);
    
    userId = registrationResponse.body._id;

    // Log In the User with all permissions
    const loginResponse = await request(url)
      .post("/api/v1/tokens")
      .send({
        username: "albertodalbosco",
        password: "Password123!",
      })
      .expect(200);
    console.log("Token of user with permissions: ", loginResponse.body.token);
    authToken = loginResponse.body.token;

    // Create an alert
    const newAlert = await request(url)
      .post("/api/v1/alerts")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        latitude: 1.00,
        longitude: 1.00,
        triage: 1,
        emergency: 1,
        radius: 1,
        expiresIn: 1,
        isActive: true,
        description: "Test alert",
        timeForAmbulance: 1,
      })
      .set("Content-Type", "application/json")
      .expect(200);

    alertId = newAlert.body._id;
  });

  // ________________ userId, authToken, alertId ________________

  test("GET /api/v1/alerts should return all active alerts", async () => {
    const response = await request(url)
      .get("/api/v1/alerts")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);

    const alerts = response.body;

    expect(alerts).toBeDefined();
    expect(alerts.length).toBeGreaterThan(0);
  });

  test("GET /api/v1/alerts/:id should return alert with specified id", async () => {
    const response = await request(url)
      .get(`/api/v1/alerts/${alertId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);

    const alert = response.body;

    expect(alert).toBeDefined();
    expect(alert._id).toBe(alertId);
    expect(alert.latitude).toBe(1.00);
    expect(alert.longitude).toBe(1.00);
    expect(alert.triage).toBe("Emergenza");
    expect(alert.emergency).toBe("Perdita di coscienza improvvisa");
    expect(alert.radius).toBe(1);
    expect(alert.expiresIn).toBe(1);
    expect(alert.isActive).toBe(true);
    expect(alert.description).toBe("Test alert");
    expect(alert.timeForAmbulance).toBe(1);
  });





  afterAll(async () => {
    //Delete the User with permissions
    await request(url)
      .delete(`/api/v1/users/${userId}`)
      .set("Content-Type", "application/json")
      .expect(200);

    //Delete the alert
    await request(url)
      .delete(`/api/v1/alerts/${alertId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);
  });

});











describe("User with ONLY 118 permission", () => {
  let authToken = "";
  let userId = "";
  let alertId = "";
  let disactiveAlertId = "";

  beforeAll(async () => {
    // TODO: connect to database
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

    // Create User with all permissions
    const registrationResponse = await request(url)
      .post("/api/v1/users")
      .send({
        name: "alberto",
        surname: "Dal Bosco",
        username: "albertodalbosco",
        email: "dalbosco.alby@gmail.com",
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
          isOperator118: true,
        },
      })
      .expect(200);
    
    userId = registrationResponse.body._id;

    // Log In the User with all permissions
    const loginResponse = await request(url)
      .post("/api/v1/tokens")
      .send({
        username: "albertodalbosco",
        password: "Password123!",
      })
      .expect(200);
    console.log("Token of user with permissions: ", loginResponse.body.token);
    authToken = loginResponse.body.token;

    // Create an active alert
    const newActiveAlert = await request(url)
      .post("/api/v1/alerts")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        latitude: 1.00,
        longitude: 1.00,
        triage: 1,
        emergency: 1,
        radius: 1,
        expiresIn: 1,
        isActive: true,
        description: "Test alert",
        timeForAmbulance: 1,
      })
      .set("Content-Type", "application/json")
      .expect(200);

    alertId = newActiveAlert.body._id;

    // Create a disactive alert
    const disactiveAlert = await request(url)
      .post("/api/v1/alerts")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        latitude: 1.00,
        longitude: 1.00,
        triage: 1,
        emergency: 1,
        radius: 1,
        expiresIn: 1,
        isActive: false,
        description: "Test alert",
        timeForAmbulance: 1,
      })
      .set("Content-Type", "application/json")
      .expect(200);

    disactiveAlertId = disactiveAlert.body._id;
  });

  // ________________ userId, authToken, alertId ________________

  //ONLY OPERATOR118
  test("POST /api/v1/alerts with correct alert fields should create the alert ", async () => {
    const response = await request(url)
      .post("/api/v1/alerts")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        latitude: 12.30,
        longitude: 56.78,
        triage: 1,
        emergency: 2,
        radius: 10,
        expiresIn: 3600,
        isActive: true,
        description: "bla bla bla",
        timeForAmbulance: 15,
      })
      .set("Content-Type", "application/json")
      .expect(200);
    
    const newAlert = response.body;

    expect(newAlert).toBeDefined();
    expect(newAlert.latitude).toBe(12.30);
    expect(newAlert.longitude).toBe(56.78);
    expect(newAlert.triage).toBe("Emergenza");
    expect(newAlert.emergency).toBe("Soffocamento da corpo estraneo");
    expect(newAlert.radius).toBe(10);
    expect(newAlert.expiresIn).toBe(3600);
    expect(newAlert.isActive).toBe(true);
    expect(newAlert.description).toBe("bla bla bla");
    expect(newAlert.timeForAmbulance).toBe(15);
  });

  test("PATCH /api/v1/alerts/:alertId should retire the alert with specified alertId", async () => {
    const response = await request(url)
      .patch(`/api/v1/alerts/${alertId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);

    const retiredAlert = response.body;

    expect(retiredAlert).toBeDefined();
    expect(retiredAlert.isActive).toBe();
  });

  test("PATCH /api/v1/alerts/:alertId should return an error if the alert is not active", async () => {
    const response = await request(url)
      .patch(`/api/v1/alerts/${disactiveAlertId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(400);
  });



  afterAll(async () => {
    //Delete the User with permissions
    await request(url)
      .delete(`/api/v1/users/${userId}`)
      .set("Content-Type", "application/json")
      .expect(200);

    //Delete the alert
    await request(url)
      .delete(`/api/v1/alerts/${alertId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);

    await request(url)
      .delete(`/api/v1/alerts/${disactiveAlertId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);
  });

});







