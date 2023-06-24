require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const connectDb = require("./db/conn");

const path = require("path");
const ejs = require("ejs");
var partials = require('express-partials');

const publicPath=path.join(__dirname,'/public')

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(partials());

app.use(express.static(publicPath))


app.get("/", (req, res) => {
  res.render("home");
});

app.get('/login',(req,res)=>{
  res.render('auth/login')
})
app.get('/register',(req,res)=>{
  res.render('auth/register')
})

app.get('/cart',(req,res)=>{
  res.render('customer/cart')
})


app.listen(port, () => {
  connectDb(process.env.MONGO_URI);
  console.log(`Server started at ${port}`);
});
