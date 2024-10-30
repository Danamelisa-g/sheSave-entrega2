
let currentCartArray = [];  

function parseToProducts() {
  for (let i = 0; i < person1.cart.length; i++) {
      let map = person1.cart[i]
      let product = new Product(map["id"], map["name"], map["description"], map["images"], map["price"], map["categoryName"], map["stars"])
      currentCartArray.push(product)
  }
}


function getCart() {
  const noContent = document.getElementById("noCart");

  let headerInfo = document.getElementById("header")
  let footerInfo = document.getElementById("footer")
  let container = document.getElementById("cart-content");
  let numberCart = document.getElementById("numberCart");
  let total = document.getElementById("totalPrice");

  if (currentCartArray.length > 0) {
    noContent.style.display = "none";
    headerInfo.style.display = "flex";
    footerInfo.style.display = "flex";
    container.style.display = "block";
    numberCart.style.display = "block";
    total.style.display = "block";
    makeOrder.style.display = "block"

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

parseToProducts()
getCart();