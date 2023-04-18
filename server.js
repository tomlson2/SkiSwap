const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const DB = require('./database');

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

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