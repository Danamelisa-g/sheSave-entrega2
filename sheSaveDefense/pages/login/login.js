document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []

    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;

    const notMatchingUser = document.getElementById("errorMatching")
    const alertError = document.getElementById("errorInputs")
    const completeLogin = document.getElementById("completeLogin")

    notMatchingUser.style.display = "none"
    alertError.style.display = "none";
    completeLogin.style.display = "none";
    
    if (!email || !password) {
        alertError.style.display = "block"
        return;
    }

    const userIndex = registeredUsers.findIndex(user => user.email === email && user.password === password);


    if (userIndex === -1) {
        notMatchingUser.style.display = "block"
        return;
    }

    let loggedUser = {
        email: email,
        password: password
    }

    localStorage.setItem("loggedUser", JSON.stringify(loggedUser))

    completeLogin.style.display = "block"

    window.location.href = "../list_product/Bag.html"
});