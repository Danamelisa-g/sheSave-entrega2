const params = new URLSearchParams(window.location.search)
const nameURL = params.get("name")

function getProduct() {
    for (let i = 0; i < data.length; i++) {
        const map = data[i];
        if (map["name"] === nameURL) {
            let product = new Product(map["id"], map["name"], map["description"], map["images"], map["price"], map["categoryName"], map["stars"])
            return product
        }
    }
}

function renderProduct() {
    let title = document.getElementById("title")
    let description = document.getElementById("description")
    let price = document.getElementById("price")
    let mainImage = document.getElementById("main-image")

    const product = getProduct()
    if (product) {
        mainImage.src = product.images[0]
        mainImage.alt = product.name
        title.innerHTML = product.name
        description.innerHTML = product.description
        price.innerHTML = "Precio: $" + product.price
    }
}

function renderRecommendedProducts() {
    let container = document.getElementById("recommended-products");
    container.innerHTML = "";
    const currentProduct = getProduct();
    if (!currentProduct) {
        console.error("No se encontró el producto actual");
        return;
    }
    const recommendedProducts = data
        .map((item) => new Product(item.id, item.name, item.description, item.images, item.price, item.categoryName, item.stars))
        .filter((pd) => pd.name !== currentProduct.name)

    for (let i = 0; i < recommendedProducts.length; i++) {
        const product = recommendedProducts[i];
        container.innerHTML += product.recommendedProductHTML();
    }
}

function productSelected(index) {
    let product = data.filter((pd) => pd.id === index)
    window.location.href = "../product/detailProduct.html?name=" + encodeURIComponent(product[0].name);
}

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []

document.getElementById("cartButton").addEventListener("click", function(event) {
    event.preventDefault();
    const userIndex = registeredUsers.findIndex(user => user.email === loggedUser.email);

    if (userIndex === -1) {
        console.error("Usuario no encontrado.");
        return;
    }

    let currentCartArray = registeredUsers[userIndex].cart || [];

    const currentProduct = getProduct();

    currentCartArray.push(currentProduct);

    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    window.location.href = "../carrito/carrito.html"
})

document.getElementById("favoritesButton").addEventListener("click", function(event) {
    event.preventDefault();

    const userIndex = registeredUsers.findIndex(user => user.email === loggedUser.email);

    if (userIndex === -1) {
        console.error("Usuario no encontrado.");
        return;
    }

    let currentFavoriteArray = registeredUsers[userIndex].favorites || [];

    const currentProduct = getProduct();

    currentFavoriteArray.push(currentProduct)

    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
});

function fasterAddCart(index) {
    let product = data.find((pd) => pd.id === index);
    const userIndex = registeredUsers.findIndex(user => user.email === loggedUser.email);

    if (userIndex === -1) {
        console.error("Usuario no encontrado.");
        return;
    }

    let currentCartArray = registeredUsers[userIndex].cart || [];

    currentCartArray.push(product);

    registeredUsers[userIndex].cart = currentCartArray;

    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
}

function validateToken() {
    if (!loggedUser || !registeredUsers) {
        window.location.href = "../login/login.html"
    }
}

validateToken()
renderProduct()
renderRecommendedProducts()