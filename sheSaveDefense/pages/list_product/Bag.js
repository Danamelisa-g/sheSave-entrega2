let products = []
function parseToProducts() {
    for (let i = 0; i < data.length; i++) {
        let map = data[i]
        let product = new Product(map["id"], map["name"], map["description"], map["images"], map["price"], map["categoryName"], map["stars"])
        products.push(product)
    }
}

function renderAllProducts() {
    let container = document.getElementById("list-products");
    for (let i = 0; i < products.length; i++) {
        let product = products[i]
        container.innerHTML += product.cardHTML(i)
    }
}

function productSelected(index) {
    let product = products[index];
    window.location.href = "../product/detailProduct.html?name=" + encodeURIComponent(product.name);
}

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []

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
parseToProducts()
renderAllProducts()