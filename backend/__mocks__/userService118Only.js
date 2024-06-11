const mockUser118Only = {
  _id: "mockUserId118Only",
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
};

const createUser118Only = jest.fn(() =>
  Promise.resolve({ body: mockUser118Only, status: 200 })
);
const loginUser118Only = jest.fn(() =>
  Promise.resolve({ body: { token: "mockAuthToken118Only" }, status: 200 })
);
const deleteUser118Only = jest.fn(() => Promise.resolve({ status: 200 }));

module.exports = {
  createUser118Only,
  loginUser118Only,
  deleteUser118Only,
  mockUser118Only,
};
