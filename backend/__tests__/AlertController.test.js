const mongoose = require("mongoose");
require("dotenv").config();
const request = require("supertest");
const url = "http://localhost:3000";

const { createUser118Volunteer, loginUser118Volunteer, deleteUser118Volunteer, mockUser118Volunteer } = require('../__mocks__/userService118Volunteer');
const { createUser118Only, loginUser118Only, deleteUser118Only, mockUser118Only } = require('../__mocks__/userService118Only');
const { createAlert, createDisactiveAlert, getAlerts, getAlertById, retireAlert, deleteAlert, mockAlert, mockDisactiveAlert } = require('../__mocks__/alertService');

jest.mock('../__mocks__/userService118Volunteer');
jest.mock('../__mocks__/userService118Only');
jest.mock('../__mocks__/alertService');



// _____________________________________________________________

describe("User with 118 and Voluntary permissions ", () => {
  let authToken = "";
  let userId = "";
  let alertId = "";

  beforeAll(async () => {
    const registrationResponse = await createUser118Volunteer();

    userId = registrationResponse.body._id;

    const loginResponse = await loginUser118Volunteer();
    authToken = loginResponse.body.token;

    const newAlert = await createAlert();

    alertId = newAlert.body._id;
  });

  test("GET /api/v2/alerts should return all active alerts", async () => {
    const response = await getAlerts();

    const alerts = response.body;

    expect(alerts).toBeDefined();
    expect(alerts.length).toBeGreaterThan(0);
  });

  test("GET /api/v2/alerts/:id should return alert with specified id", async () => {
    const response = await getAlertById(alertId);

    const alert = response.body;

    expect(alert).toBeDefined();
    expect(alert._id).toBe(alertId);
    expect(alert.latitude).toBe(1.0);
    expect(alert.longitude).toBe(1.0);
    expect(alert.triage).toBe("Emergenza");
    expect(alert.emergency).toBe("Perdita di coscienza improvvisa");
    expect(alert.radius).toBe(1);
    expect(alert.expiresIn).toBe(1);
    expect(alert.isActive).toBe(true);
    expect(alert.description).toBe("Test alert");
    expect(alert.timeForAmbulance).toBe(1);
  });

  afterAll(async () => {
    await deleteUser118Volunteer();
    await deleteAlert();
  });
});

describe("User with ONLY 118 permission", () => {
  let authToken = "";
  let userId = "";
  let alertId = "";
  let disactiveAlertId = "";

  beforeAll(async () => {
    const registrationResponse = await createUser118Only();

    userId = registrationResponse.body._id;

    const loginResponse = await loginUser118Only();
    authToken = loginResponse.body.token;

    const newActiveAlert = await createAlert();
    alertId = newActiveAlert.body._id;

    const newDisactiveAlert = await createDisactiveAlert();
    disactiveAlertId = newDisactiveAlert.body._id;
  });

  test("POST /api/v2/alerts with correct alert fields should create the alert", async () => {
    const response = await createAlert();

    const newAlert = response.body;

    expect(newAlert).toBeDefined();
    expect(newAlert.latitude).toBe(1.0);
    expect(newAlert.longitude).toBe(1.0);
    expect(newAlert.triage).toBe("Emergenza");
    expect(newAlert.emergency).toBe("Perdita di coscienza improvvisa");
    expect(newAlert.radius).toBe(1);
    expect(newAlert.expiresIn).toBe(1);
    expect(newAlert.isActive).toBe(true);
    expect(newAlert.description).toBe("Test alert");
    expect(newAlert.timeForAmbulance).toBe(1);
  });

  test("PATCH /api/v2/alerts/:alertId should retire the alert with specified alertId", async () => {
    const response = await retireAlert(alertId);

    const retiredAlert = response.body;

    expect(retiredAlert).toBeDefined();
    expect(retiredAlert.isActive).toBe(false);
  });

  test("PATCH /api/v2/alerts/:alertId should return an error if the alert is not active", async () => {
    try {
      await retireAlert(disactiveAlertId);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.status).toBe(400);
    }
  });

  afterAll(async () => {
    await deleteUser118Only();
    await deleteAlert();
  });
});
