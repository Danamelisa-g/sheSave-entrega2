class Product {
  constructor(id, name, description, images = [], price, categoryName, stars) {
    (this.id = id),
      (this.name = name),
      (this.description = description),
      (this.images = images),
      (this.price = price),
      (this.categoryName = categoryName),
      (this.stars = stars);
  }

  getStarsHTML() {
    let starsHTML = "";
    for (let i = 0; i < 5; i++) {
      starsHTML +=
        i < this.stars
          ? '<i class="fa-solid fa-star"></i>'
          : '<i class="fa-regular fa-star"></i>';
    }
    return starsHTML;
  }

  cardHTML(pos) {
    return `
      <div class="card-product">
				<div class="container-img" onClick="productSelected(${pos})">
					<img src="${this.images[0]}" alt="Cafe Irish" />
					<div class="button-group">
						<span>
							<i class="fa-regular fa-eye"></i>
						</span>
						<span>
							<i class="fa-regular fa-heart"></i>
						</span>
						<span>
							<i class="fa-solid fa-code-compare"></i>
						</span>
					</div>
				</div>
				<div class="content-card-product">
					<div class="stars">
						${this.getStarsHTML()}
					</div>
					<h3>${this.name}</h3>
					<span onclick="fasterAddCart(${this.id})" class="add-cart">
						<i class="fa-solid fa-basket-shopping"></i>
					</span>
					<p class="price">
						${this.price}
					</p>
				</div>
			</div>
        `;
  }

  recommendedProductHTML(pos) {
    return `
      <div class="card-product" onClick="productSelected(${pos})">
                <div class="container-img">
                    <img src="${this.images[0]}" alt="alarma" />
                    
                    <div class="button-group">
                        <span>
                            <i class="fa-regular fa-eye"></i>
                        </span>
                        <span>
                            <i class="fa-regular fa-heart"></i>
                        </span>
                        <span>
                            <i class="fa-solid fa-code-compare"></i>
                        </span>
                    </div>
                </div>
                <div class="content-card-product">
                    <div class="stars">
                        ${this.getStarsHTML()}
                    </div>
                    <h3>${this.name}</h3>
                    <span onclick="fasterAddCart(${this.id})" class="add-cart">
                        <i class="fa-solid fa-basket-shopping"></i>
                    </span>
                    <p class="price">$${this.price}</p>
                </div>
            </div>
    `
  }

  cartProduct(pos) {
    return `
      <div class="item">
         <img src="${this.images[0]}" alt="">
         <div class="item-details">
          <div class="title">${this.name}</div>
          <div class="subtitle">${this.description}</div>
          <div class="offer">
           Oferta espacial de -44% por tiempo limitado
          </div>
          <div class="price">${this.price}</div>
          <div class="original-price">
           $50.000
          </div>
         </div>
         <div class="quantity">
          <select>
           <option>
            1
           </option>
          </select>
         </div>
         <div onclick="trashProduct(${pos})" class="delete">
          <i class="fas fa-trash"></i>
         </div>
        </div>
    `
  }
}

// <span class="discount">-13%</span> debajo de img
// <span>$36.700</span> debajo del price
