const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DB = require('./database.js')

app.use(bodyParser.json());

app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  user.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating user' });
    } else {
      res.json({ success: true });
    }
  });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error logging in' });
      } else if (!user) {
        res.status(401).json({ error: 'Invalid email or password' });
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error logging in' });
          } else if (!result) {
            res.status(401).json({ error: 'Invalid email or password' });
          } else {
            const token = jwt.sign({ userId: user._id }, 'secret');
            res.cookie(authCookieName, token, { httpOnly: true });
            res.json({ success: true });
          }
        });
      }
    });
  });

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});