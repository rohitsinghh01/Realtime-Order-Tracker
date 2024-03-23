const mongoose = require("mongoose");

const connectDb = (url) => {
  mongoose.connect(url);
  console.log("Database connected");
};
module.exports = connectDb;