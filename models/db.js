const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGODB_CONNECT_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("momngoDb commected...");
  })
  .catch((err) => {
    console.log(`momngoDb connection error... ${err}`);
  }); 

module.exports = mongoose;