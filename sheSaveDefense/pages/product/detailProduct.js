const params = new URLSearchParams(window.location.search)
const nameURL = params.get("name")

let products = []
let currentProductThis

async function getProducts() {
    let response = await fetch("https://raw.githubusercontent.com/Danamelisa-g/sheSave-entrega2/refs/heads/master/sheSaveDefense/pages/data.json")
    let json = await response.json()
    parseToProducts(json)
}

function parseToProducts(dataThis) {
    for (let i = 0; i < dataThis.length; i++) {
        const map = dataThis[i];
        let product = new Product(map["id"], map["name"], map["description"], map["images"], map["price"], map["categoryName"], map["stars"])
        products.push(product)
    }
    const product = products.find((pd) => pd.name === nameURL)
    currentProductThis = product
    renderProduct(currentProductThis)
    renderRecommendedProducts(currentProductThis)
}

async function renderProduct(product) {
    let title = document.getElementById("title")
    let description = document.getElementById("description")
    let price = document.getElementById("price")
    let mainImage = document.getElementById("main-image")
    
    if (product) {
        mainImage.src = product.images[0]
        mainImage.alt = product.name
        title.innerHTML = product.name
        description.innerHTML = product.description
        price.innerHTML = "Precio: $" + product.price
    }
}

async function renderRecommendedProducts(currentProductThis) {
    let container = document.getElementById("recommended-products");
    container.innerHTML = "";

    const currentProduct = currentProductThis
    if (!currentProduct) {
        console.error("No se encontró el producto actual");
        return;
    }

    const recommendedProducts = products
    .filter((pd) => pd.name !== currentProduct.name)
    .map((item) => new Product(item.id, item.name, item.description, item.images, item.price, item.categoryName, item.stars))

    for (let i = 0; i < recommendedProducts.length; i++) {
        const product = recommendedProducts[i];
        container.innerHTML += product.recommendedProductHTML(i);
    }
}

function productSelected(index) {
    let product = products.filter((pd) => pd.id === (index + 1))
    window.location.href = "../product/detailProduct.html?name=" + encodeURIComponent(product[0].name);
}


// obtiene el usuario loggeado
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
// obtiene los usuarios registrados
const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []

document.getElementById("cartButton").addEventListener("click", async function(event) {
    event.preventDefault();
    const userIndex = registeredUsers.findIndex(user => user.email === loggedUser.email);

    if (userIndex === -1) {
        console.error("Usuario no encontrado.");
        return;
    }

    let currentCartArray = registeredUsers[userIndex].cart || [];

    if (currentCartArray.length !== 0) {
        const existProduct = currentCartArray.find((pd) => pd.id === currentProductThis.id);
        if (existProduct) {
            showToast("Producto ya agregado", "#Ff0000");
            return;
        }
    }  

    currentCartArray.push(currentProductThis);

    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    showToast("Producto agregado correctamente")

    window.location.href = "../carrito/carrito.html"
})

/*document.getElementById("favoritesButton").addEventListener("click", function(event) {
    event.preventDefault();

    const userIndex = registeredUsers.findIndex(user => user.email === loggedUser.email);

    if (userIndex === -1) {
        console.error("Usuario no encontrado.");
        return;
    }

    let currentFavoriteArray = registeredUsers[userIndex].favorites || [];

    const currentProduct = getProducts();

    currentFavoriteArray.push(currentProduct)

    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
});*/

function fasterAddCart(index) {
    let product = products.find((pd) => pd.id === index);
    const userIndex = registeredUsers.findIndex(user => user.email === loggedUser.email);

    if (userIndex === -1) {
        console.error("Usuario no encontrado.");
        return;
    }

    let currentCartArray = registeredUsers[userIndex].cart || [];
    
    if (currentCartArray.length !== 0) {
        const existProduct = currentCartArray.find((pd) => pd.id === product.id);
        if (existProduct) {
            showToast("Producto ya agregado", "#Ff0000");
            return;
        }
    }    

    currentCartArray.push(product);

    registeredUsers[userIndex].cart = currentCartArray;
    
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    showToast("Producto añadido correctamente")
}

function validateToken() {
    if (!loggedUser || !registeredUsers) {
        window.location.href = "../login/login.html"
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
getProducts()