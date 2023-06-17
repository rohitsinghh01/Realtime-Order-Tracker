const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const ejs = require("ejs");
// const expressLayout = require("express-ejs-layouts");

// app.use(expressLayout);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
