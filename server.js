require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

// CONNECTING DATABASE
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
)
const connection = mongoose.connection
connection.on('connected', () => {
  console.log('Mongoose Connected Successfully')
})
connection.on('error', err => {
console.log(`Mongoose default connection error: ${err}`)
})

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(`${__dirname}/client/build/`))

const usersController = require('./routes/usersController')
//CA go to postman and check that it is working
app.use('/api/users', usersController)

module.exports = app
