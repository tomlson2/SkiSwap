# Snochat
Introducing SnoChat - the online chat platform designed exclusively for skiing enthusiasts! Whether you're a seasoned skier or a beginner hitting the slopes for the first time, SnoChat is the perfect place to connect with like-minded individuals who share your passion for the sport.

With SnoChat, you can easily connect with other skiers from around the world, share tips and tricks, plan trips together, and even find new skiing buddies to hit the slopes with. Imagine being able to chat with other skiers from the comfort of your own home, regardless of whether you're on the mountain or not.

![SkiSwap](IMG_5231.jpg)

Key Feature:

A chat place

be able to start chats and respond to others

be able to like a chat when you agree with what someone said

## CSS box 

I learned the order of the box model for css.

content -> padding -> border -> margin

## CSS Flexbox

I learned how css flexbox could be use to make more responsive websites



## Deliverable Learning
Making the deliverable, we learned a lot about all of the different styling that can be applied. Sometimes it was a little difficult to know how it would change the website but through lots of trial and error we got a pretty good result. We used our learning from the simon assignment to add a new page and link them together.

## Amazon webservices
I learned that in order to point to another DNS record, you should use the following DNS record type: CNAME

## functios
Many different ways to write functions. Functions can be left empty but can never be = {}. I also learned how functions can be used to simplify your code.

## Arrow functions
I learned about how arrow functions return values. The return word is optional if no curly braces are provided.
()=> returns 3 while
() => {
    3;
}; returns undefined
() => {
    return 3;
}; returns 3

Arrow functions also just replace the need to write the word function. It is very good when you need to pass a function into something. For example:

const a = [1, 2, 3, 4];

// standard function syntax
a.sort(function (v1, v2) {
  return v1 - v2;
});

however the syntax can be reduced by doing this
// arrow function syntax
a.sort((v1, v2) => v1 - v2);

I also learned all the different ways to have the syntax:
() => expression

param => expression

(param) => expression

(param1, paramN) => expression

() => {
  statements
}

param => {
  statements
}

(param1, paramN) => {
  statements
}


## Arrays
I learned about the different array functions. Such as:
push: Add an item to the end of the array
pop:	Remove an item from the end of the array
slice:	Return a sub-array
sort	Run a function sort an array in place
values	Creates an iterator for use with a for of loop
find	Find the first item satisfied by a test function
forEach	Run a function on each array item)
reduce	Run a function to reduce array to one item
map	Run a function to map an array to a new array
filter	creates a new array filled with elements that pass a test provided by a function
every	Run a function to test if all items match
some	Run a function to test if any items match

join: method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string.

example: 
const elements = ['Fire', 'Air', 'Water'];
console.log(elements.join('-'));

## Objects and classes
I learned about object oriented programing. That objects can be part of classes so that that each object can have different values. For example:
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
}

let myCar1 = new Car("Ford", 2014);
let myCar2 = new Car("Audi", 2019);

console.log(myCar1);

This would console.log 
{
"name": "Ford",
"year": 2014
}

## JSON
I learned about JSON syntax and how its used to share and store data. Here is an example of some JSON syntax
{
  "class": {
    "title": "web programming",
    "description": "Amazing"
  },
  "enrollment": ["Marco", "Jana", "فَاطِمَة"],
  "start": "2025-02-01",
  "end": null
}
JSON can be converted to and from javascript using JSON.parse and JSON.stringify
Stringify converts javascript to JSON
parse converts JSON to javascript



## Rest and Spread
I learned that The rest parameter syntax allows a function to accept an indefinite number of arguments as an array, providing a way to represent variadic functions in JavaScript.

for example:
function sum(...theArgs) {
  let total = 0;
  for (const arg of theArgs) {
    total += arg;
  }
  return total;
}

console.log(sum(1, 2, 3));
// Expected output: 6

console.log(sum(1, 2, 3, 4));
// Expected output: 10

I also learned that spread In a way, spread syntax is the opposite of rest syntax. Spread syntax "expands" an array into its elements, while rest syntax collects multiple elements and "condenses" them into a single element.

for example:
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// Expected output: 6

console.log(sum.apply(null, numbers));
// Expected output: 6

## Desturcturing
I learned that The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables. For example
const a = [1, 2, 4, 5];

// destructure the first two items from a, into the new variables b and c
const [b, c] = a;

console.log(b, c);
// OUTPUT: 1, 2
I also learned that you can combine multiple items using rest syntax. For example
const [b, c, ...others] = a;

console.log(b, c, others);
// OUTPUT: 1, 2, [4,5]



## Regular Expressions 

I learned that the forward slash character is used to denote the boundaries of the regular expression: /this_is_my_regular_expression/

I also learned about the gi modifers for regular expressions:
g = global, meaning to match all instances of the pattern in the string not one
i = case in-sensitive it doesn't care if its capital or not

## Destructuring

## Exceptions
I learned the basic syntax of exceptions:
try {
  // normal execution code
} catch (err) {
  // exception handling code
} finally {
  // always called code
}

## DOM

## Promises
I learned that the then catch finally is very similar to try catch finally.  The then function is called if the promise is fulfilled, catch is called if the promise is rejected, and finally is always called after all the processing is completed.

ALSO with promises and setTimeout we can have aysnchronous operations for example:
const delay = (msg, wait) => {
  setTimeout(() => {
    console.log(msg, wait);
  }, 1000 * wait);
};

new Promise((resolve, reject) => {
  // Code executing in the promise
  for (let i = 0; i < 3; i++) {
    delay('In promise', i);
  }
});

// Code executing after the promise
for (let i = 0; i < 3; i++) {
  delay('After promise', i);
}

// OUTPUT:
//   In promise 0
//   After promise 0
//   In promise 1
//   After promise 1
//   In promise 2
//   After promise 2


## Async/await
I learned that Async is very similar to the then catch finally for example:
const coinToss = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(Math.random() > 0.5 ? 'heads' : 'tails');
      } else {
        reject('fell off table');
      }
    }, 1000);
  });
};

we could do:
coinToss()
  .then((result) => console.log(`Toss result ${result}`))
  .catch((err) => console.error(`Error: ${err}`))
  .finally(() => console.log(`Toss completed`));
OR WITH ASYNC
try {
  const result = await coinToss();
  console.log(`Toss result ${result}`);
} catch (err) {
  console.error(`Error: ${err}`);
} finally {
  console.log(`Toss completed`);
}

## Simon-service
I learned about how to use apis to post inspirational quotes. I also learned how Node.js is used to creat out HTTp Service. I learned Curl commands better for when we used it for getscores and submitscores. I learned better how to use the web dev tools to set breakpoints to really see what the code is doing.

## Simon-db
I learned how to use mongodb to store data like high scores into the simon website. I also learned a lot of just terminal commands better. Like using echo to check what variable stands for what. So when I set up my mongousername, password, and host name I used echo to check if it had been done correctly. I also learned about database clusters and what code to update those data base clusters. I thought it was interesting how to use an SSH session to conenct my database cluster to my code and project that I am working on. Overall great learning experience.

## Simon-login
I learned way more about cookies. I was unaware before that cookies could be used to track users. So When a user is logged in, the cookie is added. When a user makes a secure request, the cookie is checked. When the user logs out, the cookie is removed. I also learned about endpoints and how they work with the database to store and get credentials and update the authorization cookie. I also learned how the secureApiRouter works by adding middleware function that checks if the authorization cookie is valid before passing the requres to the endpoints

## Simon-Websocket
I learned that the core feature of WebSocket is that it is fully duplexed. Meaning that after the initial connection is made from a client, using vanilla HTTP, and then upgraded by the server to a WebSocket connection, the relationship changes to a peer to peer connection where either party can efficiently send data at any time. I also found it interesting that WebSocket connections are still only between two parties. So if you want to facilitate a conversation between a group of users the server must act as the intermediary. Each peer first connects to the server, and then the server forwards messages amongst the peers.

## Simon-react
I learned the steps to convert simon to a react application
1 Reorganize Simon
2 Commit: Commit this version in Git as the starting place for the conversion to React. It won't run, but by committing at this point can revert if necessary, instead of starting over. Make sure you keep testing and committing throughout this process.
3 Create template React application. Run npx create-react-app template-react. This creates a new directory named template-react that contains the basic configuration and template React application code.
4 Clean up template code
  Uninstall and NPM packages you won't use (e.g. stats, test)
  Delete the unnecessary create-react-app files (e.g. images)
  Rename js JSX files have jsx extension
  Replace the favicon.ico with the Simon icon
  Update manifest.json to represent Simon
  Clean up the index.html file to have the proper fields for Simon
5 Move template files to Simon
6 Convert to React Bootstrap
7 Populate App.jsx
8 Create view components
9 Create the router
10 Convert to React components
11 Set up to debug
12 Refactor play.jsx into simonGame.jsx, simonButton.jsx, and players.jsx
13 Refactor components to take advantage of React specific functionality and to create sub-components
14 Move webSocket code from play.jsx to gameNotifier.js

## SnoChat Javascript
We added the javascript for Snochat. We orignally set out to do a ski marketplace. After trying some things out and discussing we ended up changing course of direction and changing it to a ski chat place for those who ski. This orginally included making a mock database that would eventually be turned changed into using mongodb. We also created the intial javascript for the login page. 

## SnoChat Service
With the services, we used learned about mongodb
we learned how to set up and access the database from the could, build schemas and functions that access it with persistence. 
We used API's and routed incoming front end traffic through proxy to query data.
With the websocket, we figured out how to have the front end and back end interact seamlessly for all suers at once meaning that the questions that someone posts updates for everyone

## SnoChat React
With react, we explored and discovered a lot of new functionality and was able to segment and structure the project a lot more. Also just learned more about what we did in the simon project on how to deploy react and be able to convert our react components. We learned much more using react router and hooks in order to better add functionality with our chat place such as allowing us to navigate between our pages seamlessly and using the hooks to make it easier to manage the state of our appplication. All around it made our code just a tad cleaner.
