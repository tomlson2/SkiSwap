// create an empty array to store users
let databaseData = [];

document.addEventListener('DOMContentLoaded', () => {
    // function to add user to database
    function addUser(name, password) {
        // generate a unique id for the user
        const id = Date.now();
        // create a new user object with id, name, and password properties
        const user = { id, name, password };
        // add the user to the database array
        databaseData.push(user);
        console.log(databaseData);
    }

    function getUserByNameAndPassword(name, password) {
        return databaseData.find(user => user.name === name && user.password === password);
    }

    // get the create button element
    const createButton = document.getElementById('create');

    // add event listener to create button
    createButton.addEventListener('click', () => {
        // get the name and password input elements
        const nameInput = document.getElementById('name');
        const passwordInput = document.getElementById('password');

        // get the trimmed values of the name and password inputs
        const name = nameInput.value.trim();
        const password = passwordInput.value.trim();

        //use local storage API to keep data between pages and browser sessions
        localStorage.setItem("storedName", name);
        localStorage.setItem("storedPassword", password);

        // check if name and password are not empty
        if (name && password) {
            // call the addUser function with the name and password values
            addUser(name, password);
            // clear the input fields
            nameInput.value = '';
            passwordInput.value = '';
        }
    });
});

const loginButton = document.getElementById("login");
loginButton.addEventListener('click', () => {
    const name = document.querySelector("#name").value;
    const password = document.querySelector("#password").value;
    const user = databaseData.find(user => user.name === name && user.password === password);
    if (user) {
        window.location.href = `main.html?name=${name}`;
    } else {
        alert("Invalid name or password!");
    }
});
