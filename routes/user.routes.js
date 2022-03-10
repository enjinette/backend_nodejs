const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db.js");
const path = require("path");
const User = db.users;
module.exports = (app) => {
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
  // Login authentication
  router.post("/auth", async (req, res, next) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (password_valid) {
        token = jwt.sign(
          { id: user.id, username: user.username, firstname: user.firstname },
          process.env.SECRET
        );
        // res.status(200).redirect('/users/home')
        // res.status(200);
        res.sendFile(path.join(__dirname + "/../views/home.html"));
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      res.status(404).json({ error: "User does not exist" });
    }
  });

  router.get(
    "/home",
    async (req, res, next) => {
      try {
        const token = req.headers["authorization"].split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        res.status(401).json({ msg: "Couldnt Authenticate" });
      }
    },
    async (req, res, next) => {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["password"] },
      });
      if (user === null) {
        res.status(404).json({ msg: "User not found" });
      }
      res.status(200).json(user);
    }
  );
  app.use("/users", router);
};