const mockUser118Volunteer = {
  _id: "mockUserId118Volunteer",
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
};

const createUser118Volunteer = jest.fn(() =>
  Promise.resolve({ body: mockUser118Volunteer, status: 200 })
);
const loginUser118Volunteer = jest.fn(() =>
  Promise.resolve({ body: { token: "mockAuthToken118Volunteer" }, status: 200 })
);
const deleteUser118Volunteer = jest.fn(() => Promise.resolve({ status: 200 }));

module.exports = {
  createUser118Volunteer,
  loginUser118Volunteer,
  deleteUser118Volunteer,
  mockUser118Volunteer,
};
