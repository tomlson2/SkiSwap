const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const DB = require('./database');
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const authCookieName = 'authToken';

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

    const loggedInUser = await DB.login(req.body.email, req.body.password);

    setAuthCookie(res, loggedInUser.token);

    res.send({
      id: user._id,
    });
  }
});

app.put('/api/question/:id/like', async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await DB.incrementReactionCount(postId);
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating reaction count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/get-messages', async (req, res) => {
  try {
    const posts = await DB.fetchPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts.' });
  }
});

app.post('/api/:id/comment', async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await DB.createComment(req.body.email, id, req.body.timestamp, req.body.content);
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the comment' });
  }
})

app.get('/api/:id/comments', async (req, res) => {
  const id = req.params.id;
  try {
    const comments = await DB.fetchComments(id);
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'An error occurred while fetching comments.' });
  }
});

app.post('/api/post', async (req, res) => {
  try {
    const email = req.email;
    const post = await DB.createPost(email, req.body.timestamp, req.body.question, req.body.messageCount, req.body.responders, req.body.reactionCount, req.body.icon);
    res.json(post);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log(JSON.stringify(post));
        client.send(JSON.stringify(post));
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the post' });
  }
});

app.post('/api/login', async (req, res) => {

  try {
    const loggedInUser = await DB.login(req.body.email, req.body.password);

    setAuthCookie(res, loggedInUser.token);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    path: '/',
    secure: false,
    httpOnly: false,
  });
}

//Built in middleware - Static file hosting
app.use(express.static('public'));

server.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
