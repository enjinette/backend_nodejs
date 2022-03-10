const express = require("express");
const request = require("supertest");
const app = express();

describe("Test user creation", () => {
  const user_mock = {
    body: {
      firstname: "sample firstname",
      lastname: "sample lastname",
      address: "manila",
      postcode: 8888,
      contactno: "123456",
      email: "firstname@email.com",
      username: "test_user",
      password: "test_password",
    },
  };
  it("should create a user", () => {
    request(app)
      .post("/")
      .send(user_mock)
      .expect("Successfully added user.")
      .then((res) => {
        expect(res.headers.location).to.be.eql("/");
      });
  });
});

describe("Test get all users", () => {
  it("should get all user", () => {
    request(app)
      .get("/")
      .expect(200)
      .then((res) => {
        expect(res.headers.location).to.be.eql("/");
      });
  });
});

describe("Test update users", () => {
  const user_update_mock = {
    body: {
      firstname: "updated firstname",
      lastname: "updated lastname",
      address: "manila",
      postcode: 8888,
      contactno: "123456",
      email: "firstname@email.com",
      username: "test_user",
      password: "test_password",
    },
  };
  it("should update user", () => {
    request(app)
      .put("/1")
      .send(user_update_mock)
      .expect("User was updated successfully.")
      .then((res) => {
        expect(res.headers.location).to.be.eql("/");
      });
  });
});

describe("Test delete user", () => {
  it("should delete user", () => {
    request(app)
      .delete("/1")
      .expect("User was deleted successfully.")
      .then((res) => {
        expect(res.headers.location).to.be.eql("/");
      });
  });
});

describe("Test delete multiple users", () => {
  const user_id_mock = {
    body: {
      id: [1, 2, 4],
    },
  };
  it("should delete multiple users", () => {
    request(app)
      .delete("/")
      .send(user_id_mock)
      .expect("Users were deleted successfully.")
      .then((res) => {
        expect(res.headers.location).to.be.eql("/");
      });
  });
});