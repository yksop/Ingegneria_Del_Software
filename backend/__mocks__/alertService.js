const mockAlert = {
  _id: "mockAlertId",
  latitude: 1.0,
  longitude: 1.0,
  triage: "Emergenza",
  emergency: "Perdita di coscienza improvvisa",
  radius: 1,
  expiresIn: 1,
  isActive: true,
  description: "Test alert",
  timeForAmbulance: 1,
};

const mockDisactiveAlert = {
  _id: "mockDisactiveAlertId",
  latitude: 1.0,
  longitude: 1.0,
  triage: "Emergenza",
  emergency: "Perdita di coscienza improvvisa",
  radius: 1,
  expiresIn: 1,
  isActive: false,
  description: "Test alert",
  timeForAmbulance: 1,
};

const createAlert = jest.fn(() =>
  Promise.resolve({ body: mockAlert, status: 200 })
);

const createDisactiveAlert = jest.fn(() =>
  Promise.resolve({ body: mockDisactiveAlert, status: 200 })
);
const getAlerts = jest.fn(() =>
  Promise.resolve({ body: [mockAlert], status: 200 })
);
const getAlertById = jest.fn((id) =>
  Promise.resolve({
    body: id === "mockAlertId" ? mockAlert : mockDisactiveAlert,
    status: 200,
  })
);
const retireAlert = jest.fn((id) =>
  Promise.resolve({ body: { ...mockAlert, isActive: false }, status: 200 })
);
const deleteAlert = jest.fn(() => Promise.resolve({ status: 200 }));

module.exports = {
  createAlert,
  createDisactiveAlert,
  getAlerts,
  getAlertById,
  retireAlert,
  deleteAlert,
  mockAlert,
  mockDisactiveAlert,
};
