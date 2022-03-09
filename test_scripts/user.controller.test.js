const User = require("../models/user.model.js");

const user_mock = {
    "firstname": "sample firstname",
    "lastname": "sample lastname",
    "address": "manila",
    "postcode": 8888,
    "contactno": "123456",
    "email": "firstname@email.com",
    "username": "test_user",
    "password": "test_password"
}

test('Test user creation', () => {
    expect(User.create(user_mock)).toBe("Successfully added user.");
  });