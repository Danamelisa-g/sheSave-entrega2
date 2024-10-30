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

document.getElementById("cartButton").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "../carrito/carrito.html"
})

renderProduct()