const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []

function validateToken() {
    if (!loggedUser || !registeredUsers) {
        window.location.href = "../home/index.html"
    }
}