function getNameLogged() {
    let name = document.getElementById("namePerson")

    let userNameLogged = person1.name;

    name.innerHTML = userNameLogged
}

document.getElementById("changePassword").addEventListener("click", function (event) {
    let container = document.getElementById("container-password");
    container.style.display = "flex";
  

    let title = document.getElementById("title");
    title.innerHTML = "Cambio de contraseña";

    let label1 = document.getElementById("label-newPassword");
    label1.innerHTML = "Nueva contraseña";
    let input1 = document.getElementById("input-newPassword");
    input1.type = "password"
    input1.placeholder = "Ingresa aquí"

    const passwordRepeated = document.getElementById("errorPasswordRepeated");    

    input1.value = "";
    passwordRepeated.style.display = "none"

    document.getElementById("closeCardPassword").addEventListener("click", function () {
        input1.value = "";
        container.style.display = "none";
    })

    document.getElementById("confirmChangesPassword").addEventListener("click", function () {
        const newPassword = input1.value.trim();

        if (newPassword == person1.password) {
            passwordRepeated.style.display = "block";
            return;
        }

        alert("Contraseña actualizada con éxito.");

        input1.value = "";
        container.style.display = "none";

        window.location.reload()
    });
});

getNameLogged()