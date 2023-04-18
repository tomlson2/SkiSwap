const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const User = require('../models/user')
const DB = require('../database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email, password }, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error logging in' });
      } else if (!user) {
        res.status(401).json({ error: 'Invalid email or password' });
      } else {
        res.json({ success: true });
      }
    });
  });

peerProxy(httpService);