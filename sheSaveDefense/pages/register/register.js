document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const userName = document.getElementById("inputUserName").value;
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;

    const emailRepeated = document.getElementById("errorEmailRepeated");
    const alertError = document.getElementById("errorInputs");
    const completeRegister = document.getElementById("completeRegister");

    alertError.style.display = "none";
    completeRegister.style.display = "none";
    emailRepeated.style.display = "none";
    
    if (!userName || !email || !password) {
        alertError.style.display = "block";
        return;
    }

    let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const emailExists = registeredUsers.some(user => user.email === email);
    if (emailExists) {
        emailRepeated.style.display = "block";
        return;
    }

    let newUser = new User("", userName, email, password);

    registeredUsers.push(newUser);

    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    completeRegister.style.display = "block";

    window.location.href = "../login/login.html";
});
