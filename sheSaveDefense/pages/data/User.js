class User {
    constructor(img = "",name, email, password, cart = [], favorites = []) {
        this.img = img
        this.name = name,
        this.email = email,
        this.password = password,
        this.cart = cart,
        this.favorites = favorites
    }
}