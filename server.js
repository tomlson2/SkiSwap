const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const DB = require('./database');
const authenticateJWT = require('./auth')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const http = require('http');
const WebSocket = require('ws');
const EventEmitter = require('events');
const postevents = require('./database')

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});


app.use(express.json());

app.use(cookieParser());

app.post('/api/users', async (req, res) => {

    if (await DB.getUser(req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.email, req.body.password);
  
      setAuthCookie(res, user.token);
  
      res.send({
        id: user._id,
      });
    }
  });

  app.post('/api/post', async (req, res) => {
    try {
      const email = req.email;
      const post = await DB.createPost(email, req.body.timestamp, req.body.id, req.body.question, req.icon);
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the post' });
    }
  });
  
  postEvents.on('newPost', (post) => {
    // Emit the new post to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(post));
      }
    });
  });

  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const loggedInUser = await login(email, password, userCollection);
  
      res.cookie('authCookie', loggedInUser.token, { httpOnly: true });
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });

  server.listen(3001, () => {
    console.log(`Server is running on port ${port}`);
  });
