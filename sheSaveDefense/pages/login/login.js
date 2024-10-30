document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

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

    if (email != person1.email || password != person1.password) {
        notMatchingUser.style.display = "block"
        return;
    } 

    if (email == person1.email && password == person1.password) {
        completeLogin.style.display = "block"
        window.location.href = "../list_product/Bag.html"
    }

});