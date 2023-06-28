require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const connectDb = require('./db/conn');

const path = require('path');
const ejs = require('ejs');
var partials = require('express-partials');
const session = require('express-session');
const flash = require('express-flash');
const router = require('./routes/web');
const MongoStore = require('connect-mongo');

const publicPath = path.join(__dirname, '/public');

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(partials());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// SESSIONS
app.use(
  session({
    store: MongoStore.create({mongoUrl:process.env.MONGO_URI}),
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(flash());
app.use(express.static(publicPath));
app.use('', router);

const start = async () => {
  try {
    connectDb(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
