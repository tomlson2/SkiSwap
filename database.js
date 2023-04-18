const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const url = 'mongodb+srv://thomas:bryson@cluster.se1vtjc.mongodb.net/bnb';

async function main() {
  const client = new MongoClient(url);
  console.log('logging in')
  try {
    await client.connect();

    const result = await client.db('bnb').collection('user').insertOne({ email: "hello@ok.com" })
    console.log('inserted')
  } finally {
    z;
    await client.close();
  }
}

main().catch(console.error);
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

module.exports = {
  getUser,
  getUserByToken,
  createUser,
};