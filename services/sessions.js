// Sets up and exports a middleware function for managing sessions
// Manage and store session data in a MySQL database
require("dotenv").config();

const sessions = require("express-session");

const day = 1000 * 60 * 60 * 24;
module.exports = sessions({
  secret: process.env.JWTTOKEN,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: day,
    secure: false,
    httpOnly: true,
  },
});
