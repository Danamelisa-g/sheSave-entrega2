const loggedUser = JSON.parse(localStorage.getItem ("loggedUser"))
const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []

function getNameLogged() {
    let name = document.getElementById("namePerson")
    const userIndex = registeredUsers.findIndex(user => user.email === loggedUser.email);

    if (userIndex === -1) {
        console.error("Usuario no encontrado.");
        return;
    }

    let userNameLogged = registeredUsers[userIndex].name || "nombre no encontrado";

    name.innerHTML = userNameLogged
}

function validateToken() {
    if (!loggedUser || !registeredUsers) {
        window.location.href = "../login/login.html"
    }
}

document.getElementById("closeSession").addEventListener("click", function(event) {
    localStorage.removeItem("loggedUser")
    window.location.reload()
})

document.getElementById("changeInfo").addEventListener("click", function(event) {
    let container = document.getElementById("container-info");
    container.style.display = "flex";
    let container2 = document.getElementById("container-password");
    container2.style.display = "none";

    let title = document.getElementById("title");
    title.innerHTML = "Cambio de información";

    let label1 = document.getElementById("label-name");
    label1.innerHTML = "Nombre";
    let input1 = document.getElementById("input-name");

    let label2 = document.getElementById("label-email");
    label2.innerHTML = "Correo";
    let input2 = document.getElementById("input-email");
    input2.type = "email"

    label2.style.display = "block"
    input2.style.display = "block"

    input1.value = "";
    input2.value = "";

    const userIndex = registeredUsers.findIndex(user => user.email === loggedUser.email);

    if (userIndex === -1) {
        console.error("Usuario no encontrado.");
        return;
    }

    input1.placeholder = registeredUsers[userIndex].name
    input2.placeholder = registeredUsers[userIndex].email

    document.getElementById("closeCard").addEventListener("click", function() {
        input1.value = "";
        input2.value = "";
        container.style.display = "none";
    })

    document.getElementById("confirmChanges").addEventListener("click", function() {
        const newName = input1.value.trim();
        const newEmail = input2.value.trim();

        if (newName) {
            registeredUsers[userIndex].name = newName;
        }

        if (newEmail) {
            registeredUsers[userIndex].email = newEmail;
            loggedUser.email = newEmail
        }

        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
        alert("Información actualizada con éxito.");

        input1.value = "";
        input2.value = "";

        container.style.display = "none";

        window.location.reload()
    });
});


document.getElementById("changePassword").addEventListener("click", function(event) {
    let container = document.getElementById("container-password");
    container.style.display = "flex";
    let container2 = document.getElementById("container-info");
    container2.style.display = "none";

    let title = document.getElementById("title");
    title.innerHTML = "Cambio de contraseña";

    let label1 = document.getElementById("label-newPassword");
    label1.innerHTML = "Nueva contraseña";
    let input1 = document.getElementById("input-newPassword");
    input1.type = "password"
    input1.placeholder = "Ingresa aquí"

    input1.value = "";

    const userIndex = registeredUsers.findIndex(user => user.email === loggedUser.email);

    if (userIndex === -1) {
        console.error("Usuario no encontrado.");
        return;
    }

    document.getElementById("closeCardPassword").addEventListener("click", function() {
        input1.value = "";
        container.style.display = "none";
    })

    document.getElementById("confirmChangesPassword").addEventListener("click", function() {
        const newPassword = input1.value.trim();

        if (newPassword) {
            registeredUsers[userIndex].password = newPassword;
        }

        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
        localStorage.removeItem("loggedUser");
        alert("Contraseña actualizada con éxito.");

        input1.value = "";
        container.style.display = "none";

        window.location.reload()
    });
});

validateToken()
getNameLogged()