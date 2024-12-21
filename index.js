const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouters = require("./routes/AuthRouters");
// create express app
const app = express();
require("dotenv").config();
require("./models/db");
const PORT = process.env.PORT || 3001;

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouters);

app.get("/ping", (req, res) => {
  res.send("working");
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
