const express = require("express");
const app = express();
const configRoutes = require("./routes");
const static = express.static(__dirname + "/public");
var bodyParser = require("body-parser");

//use static routes
app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configRoutes(app);

//init server
app.listen(4000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:4000");
});
