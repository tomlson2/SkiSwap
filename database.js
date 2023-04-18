const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const userName = "tb";
const password = "ab";
const hostname = "mongodb.com";
const name = "usr";
const SALT_ROUNDS = 10;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://tb:ab@cluster0.somzqce.mongodb.net`;
const client = new MongoClient(url);

const userCollection = client.db().collection('user');
const scoreCollection = client.db().collection('message');

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

function addScore(score) {
  scoreCollection.insertOne(score);
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
};