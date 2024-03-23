require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const connectDb = require('./db/conn');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
var partials = require('express-partials');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const publicPath = path.join(__dirname, '/public');

// TEMPLATE ENGINE
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(partials());

// ASSETS
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



// SESSIONS
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

// PASSPORT CONFIG
const passportInit = require('./config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// GLOBAL MIDDLEWARE
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

app.use(flash());
require('./routes/web')(app);
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
