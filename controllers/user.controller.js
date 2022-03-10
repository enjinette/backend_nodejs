const db = require("../models/db.js");
const User = db.users;
const bcrypt = require("bcryptjs");
// Create and Save a new user
exports.create = (req, res) => {
  // validate create user request
  if (!req.body) {
    res.status(400).send({
      message: "No user data.",
    });
  }
  const hashpassword = bcrypt.hashSync(req.body.password, 10);
  // Create a user
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    postcode: req.body.postcode,
    contactno: req.body.contactno,
    email: req.body.email,
    username: req.body.username,
    password: hashpassword,
  };
  // Save user in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error in creating user.",
      });
    });
};
// Retrieve all Users from the database
exports.findAll = (req, res) => {
  User.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Error in retrieving all user data."
    });
  });
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const hashpassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashpassword;
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
  
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};

// Delete multiple users
exports.deleteMultiple = (req, res) => {
  User.destroy({
    where: { id: req.body.array_id }
  })
    .then(num => {
      if (num > 0) {
        res.send({
          message: "Users were deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete users`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete users"
      });
    });
};