const User = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
// Create and Save a new User
exports.create = (req, res) => {
    // validate create user request
    if (!req.body) {
      res.status(400).send({
        message: "No user data."
      });
    }
    const hashpassword = bcrypt.hashSync(req.body.password, 10);
    // Create a User
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
    // Save User in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error in creating user."
        });
      else res.send(data);
    });
  };
// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
    User.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error in retrieving all user data."
        });
      else res.send(data);
    });
  };

// Find a single User with a id
exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No user found with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving user with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

// Update a User identified by the id in the request
exports.update = (req, res) => {
  
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  
};