const express = require("express");
const app = express();
//step 2: setup body parser
//step 3: setup db.js  file and import in server.js
//step 4: create models folder and import models in server.js
//step 5: API Endpoints

//step 2: setup body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//step 3: setup db.js  file and import in server.js
const db = require("./db");

//step 5: API Endpoints
app.get("/", function (req, res) {
  res.send("Welcome to home page");
});




//step 6: IMPORT the routes
const personRoute = require("./routes/PersonRoute");
app.use("/person", personRoute);

const MenuRoute = require("./routes/MenuRoute");
app.use("/menu", MenuRoute);






app.listen(3000, () => {
  console.log("listening on PORT:3000");
});
