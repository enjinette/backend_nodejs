module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/", users.create);
    // Retrieve all Users
    router.get("/", users.findAll);
    // Update a User with id
    router.put("/:id", users.update);
    // Delete a User with id
    router.delete("/:id", users.delete);
    // Delete all Users
    router.delete("/", users.deleteMultiple);
    app.use('/users', router);
  };