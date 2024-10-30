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

parseToProducts()
renderAllProducts()