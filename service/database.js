const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const url = 'mongodb+srv://thomas:bryson@cluster.se1vtjc.mongodb.net/bnb';
const client = new MongoClient(url);
const userCollection = client.db('bnb').collection('user');
const postCollection = client.db('bnb').collection('posts');
const commentCollection = client.db('bnb').collection('comments');


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

async function incrementReactionCount(id) {
  const post = await postCollection.findOne({ id });

  if (!post) {
    throw new Error('Post not found');
  }

  post.reactionCount += 1;
  await postCollection.updateOne({ id }, { $set: { reactionCount: post.reactionCount } });

  return post;
}

async function login(email, password) {
  const user = await userCollection.findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Invalid email or password');
  }

  return {
    email: user.email,
    token: user.token,
  };
}

async function fetchComments(postid) {
  const comments = await commentCollection.find({ postid }).toArray();
  return comments;
}

async function fetchPosts() {
  const posts = await postCollection.find({}).toArray();
  return posts;
}

async function createComment(email, postid, timestamp, content) {
  const comment = {
    id: uuid.v4(), 
    postid: postid,
    email: email,
    timestamp: timestamp,
    content: content,
  };

  await commentCollection.insertOne(comment);

  return comment;
}

async function createPost(email, timestamp, question, messageCount, responders, reactionCount, icon) {
  const post = {
    id: uuid.v4(),
    email: email,
    icon: icon,
    timestamp: timestamp,
    question: question,
    messageCount: messageCount,
    responders: responders,
    reactionCount: reactionCount,
  };

  await postCollection.insertOne(post);

  return post;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  createPost,
  login,
  fetchPosts,
  incrementReactionCount,
  fetchComments,
  createComment
};
