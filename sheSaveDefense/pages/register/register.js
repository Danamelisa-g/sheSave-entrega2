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

    if (email == person1.email) {
        emailRepeated.style.display = "block";
        return;
    }

    completeRegister.style.display = "block";

    window.location.href = "../login/login.html";
});
