const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []


let currentCartArray = [];  
function getCart() {
  const noContent = document.getElementById("noCart");

  let headerInfo = document.getElementById("header")
  let footerInfo = document.getElementById("footer")
  let container = document.getElementById("cart-content");
  let numberCart = document.getElementById("numberCart");
  let total = document.getElementById("totalPrice");

  const user = registeredUsers.find(user => user.email === loggedUser.email);

  if (user && user.cart && user.cart.length > 0) {
    noContent.style.display = "none";
    headerInfo.style.display = "flex";
    footerInfo.style.display = "flex";
    container.style.display = "block";
    numberCart.style.display = "block";
    total.style.display = "block";
    makeOrder.style.display = "block"

    currentCartArray = user.cart.map(
      (item) =>
        new Product(
          item.id,
          item.name,
          item.description,
          item.images,
          item.price,
          item.categoryName,
          item.stars
        )
    );

    numberCart.innerHTML = currentCartArray.length;

    let price = currentCartArray.reduce((acc, item) => acc + item.price, 0);

    container.innerHTML = "";

    for (let i = 0; i < currentCartArray.length; i++) {
      const element = currentCartArray[i];
      container.innerHTML += element.cartProduct(i)
    }

    total.innerHTML = `Precio total: $${price}`;
    makeOrder.innerHTML = `Hacer pedido (${currentCartArray.length})`;
  }
}

function trashProduct(index) {
    const userIndex = registeredUsers.findIndex(user => user.email === loggedUser.email);

    if (userIndex === -1) {
        console.error("Usuario no encontrado.");
        return;
    }

    let currentCartArray = registeredUsers[userIndex].cart || [];

    currentCartArray.splice(index, 1);

    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    showToast("Producto eliminado correctamente", "#Ff0000")

    window.location.reload()
}

function validateToken() {
  if (!loggedUser || !registeredUsers) {
      window.location.href = "../home/index.html"
  }
}

function showToast(message, bgColor = "#4caf50") {
  const toast = document.getElementById('toast');
  toast.style.backgroundColor = bgColor;
  toast.textContent = message;
  toast.classList.add('show');

  // Ocultar la notificación después de 3 segundos
  setTimeout(() => {
      toast.classList.remove('show');
  }, 3000);
}

validateToken()
getCart();