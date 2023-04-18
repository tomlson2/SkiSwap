const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const EventEmitter = require('events');

const url = 'mongodb+srv://thomas:bryson@cluster.se1vtjc.mongodb.net/bnb';
const client = new MongoClient(url);
const userCollection = client.db('bnb').collection('user');
const postCollection = client.db('bnb').collection('posts');


const postEvents = new EventEmitter();


function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };

  await userCollection.insertOne(user);

  return user;
}

async function login(email, password, userCollection) {
  const user = await userCollection.findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });

  return {
    email: user.email,
    token,
  };
}
async function createPost(email, timestamp, question, icon) {
  const post = {
    id: uuid.v4(),
    email: email,
    timestamp: timestamp,
    question: question,
    icon: icon,
  };

  await postCollection.insertOne(post);

  postEvents.emit('newPost', post);

  return post;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  createPost,
  login,
  postEvents,
};