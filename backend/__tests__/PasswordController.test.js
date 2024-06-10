const request = require("supertest");
const express = require("express");
const User = require("../app/models/User");
const router = require("../app/routes/PasswordController");

const app = express();
app.use(express.json());
app.use("/", router);

jest.mock("../app/models/User");

describe("PasswordController", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return 200 for valid GET /:token request", async () => {
    const token = "validToken";
    const mockUser = { resetPasswordExpires: Date.now() + 10000 };

    User.findOne
      .mockResolvedValueOnce(mockUser)
      .mockResolvedValueOnce(mockUser);

    const response = await request(app).get(`/${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ token });
  });

  it("should return 200 for valid POST /:token request", async () => {
    const token = "validToken";
    const mockUser = {
      _id: "userId",
      resetPasswordExpires: Date.now() + 10000,
    };
    const newPassword = "newPassword123!";

    User.findOne.mockResolvedValue(mockUser);
    User.updateOne.mockResolvedValue({ nModified: 1 });

    const response = await request(app)
      .post(`/${token}`)
      .send({ password: newPassword });

    console.log(response.text);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Password reset successfully",
      redirectTo: "/",
    });
  });
});
