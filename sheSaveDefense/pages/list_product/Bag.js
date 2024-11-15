let products = []

async function getProducts() {
    let response = await fetch("https://raw.githubusercontent.com/Danamelisa-g/sheSave-entrega2/refs/heads/master/sheSaveDefense/pages/data.json")
    let json = await response.json()
    parseToProducts(json)
}

function parseToProducts(dataThis) {
    for (let i = 0; i < dataThis.length; i++) {
        let map = dataThis[i]
        let product = new Product(map["id"], map["name"], map["description"], map["images"], map["price"], map["categoryName"], map["stars"])
        products.push(product)
    }

    renderAllProducts(products)
}

function renderAllProducts(productsThis) {
    let container = document.getElementById("list-products");
    for (let i = 0; i < productsThis.length; i++) {
        let product = productsThis[i]
        container.innerHTML += product.cardHTML(i)
    }
}

function productSelected(index) {
    let product = products[index];
    window.location.href = "../product/detailProduct.html?name=" + encodeURIComponent(product.name);
}

// obtiene el usuario loggeado
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
// obtiene la lista de los usuarios registrados
const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []


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