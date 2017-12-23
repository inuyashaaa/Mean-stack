const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const app = express();

//Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

//On connected
mongoose.connection.on('connected', () => {
  console.log("Connected to MongoDB " + config.database);
});

//On error
mongoose.connection.on('error', (err) => {
  console.log("Connect error: " + err);
});

//Router users
const users = require('./routes/users');

// Port Number
const port = 3000;

//Use Cors Middleware
app.use(cors());

//Set Static Folfer
app.use(express.static(path.join(__dirname, 'public')));

//Body-parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Route
app.get("/", (req, res) => {
  res.send("Invalid access!!!");
});

//Start Server
app.listen(port, () => {
  console.log('Server started on Port : ' + port);
});
