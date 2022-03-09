const User = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
// Create and Save a new user
exports.create = (req, res) => {
    // validate create user request
    if (!req.body) {
      res.status(400).send({
        message: "No user data."
      });
    }
    const hashpassword = bcrypt.hashSync(req.body.password, 10);
    // Create a user
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      postcode: req.body.postcode,
      contactno: req.body.contactno,
      email: req.body.email,
      username: req.body.username,
      password: hashpassword
    });
    // Save user in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error in creating user."
        });
      else res.send(data);
    });
  };
// Retrieve all Users from the database
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error in retrieving all user data."
        });
      else res.send(data);
    });
  };
// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "No user data."
    });
  }
  console.log(req.body);
  const hashpassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashpassword;
  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No user found with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No user found with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete multiple users
exports.deleteMultiple = (req, res) => {
  User.removeMultiple(req.body.array_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Could not delete users."
        });
      } else {
        res.status(500).send({
          message: "Could not delete users."
        });
      }
    } else res.send({ message: `Users were deleted successfully!` });
  });
};