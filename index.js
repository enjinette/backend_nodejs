require('dotenv').config()
const db = require("./models/db.js");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
app.use('/css', express.static(__dirname + '/css'))
var corsOptions = {
  origin: "http://localhost:8000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync database.");
});
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  // res.json({ message: "API Backend Node.js" });
  res.sendFile(path.join(__dirname + '/views/login.html'));
});
require("./routes/user.routes.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});