function login() {
    const name = document.querySelector("#name").value;
    localStorage.setItem("storedName", name);
    window.location.href = "main.html";
}