const { expect } = require("chai");
require("dotenv").config();

const userService = require("../src/users/user.service");
const User = require("../src/users/user.model");
const DB = require("../src/common/db");

DB.connect(process.env.DB_URL);

const EMAIL = "test@artube.com";
const USERNAME = "artube";
const PASSWORD = "123123";

describe("User Service", () => {
  before(async () => {
    await User.deleteMany({});
  });

  describe("#create()", () => {
    it("should return user with access token", async () => {
      const userParam = {
        email: EMAIL,
        username: USERNAME,
        password: PASSWORD
      };
      const user = await userService.create(userParam);
      expect(user).to.have.all.keys(
        "_id",
        "accessToken",
        "email",
        "username",
        "profileImageFilename"
      );
    });
  });
});
