// modal
const cartBtn = document.querySelector('.openModalBtn')
const cardModal = document.querySelector("#myModal");
const backDrop = document.querySelector('.backdrop')
const closeModalBtn = document.querySelector('.closeModal')
const productDOM = document.querySelector(".product-box");
const cartTotal = document.querySelector(".cart-total");
import { productsData } from "./products.js";

let cart = [];
// get products
class Products {
  // get ftom API end point
  getProducts() {
    return productsData;
  }
}

// display products
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((item) => {
      result += `
      <div class="product-box__item">
        <div class="product-box__image">
            <img src=${item.imageUrl} alt="">
        </div>
        <div class="product-box__caption">
            <p class="caption__price">$ ${item.price}</p>
            <h2 class="caption__text">${item.title}</h2>

            </div>
            <div class="product-box__footer">
                <button class=" btn btn--primary add-to-cart" data-id=${item.id}>add</button>
            </div>
      </div>`;
      productDOM.innerHTML = result;
    });
  }
  getAddToCartBtn() {
    const addToCartBtns = document.querySelectorAll(".add-to-cart");
    console.log(addToCartBtns);
    const buttons = [...addToCartBtns];
    buttons.forEach((btn) => {
      const id = btn.dataset.id;
      // check if this product id is in card or not !
      const isInCart = cart.find((p) => p.id === id);
      if (isInCart) {
        btn.innerText = "In Cart";
        cart.disable = true;
      }
      btn.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";
        event.target.disable = true;

        // get product from products :
        const addedProduct = Storage.getProduct(id);

        // add to cart
        cart = [...cart, { ...addedProduct, quantity: 1 }];

        // saved cart to local storage
        Storage.saveCart(cart);

        // update cart value
        this.setCartValue(cart);
        // add to cart item
      });
    });
  }
  setCartValue(cart) {
    // 1. cart items :
    // 2. call total price :
    let tempCartItems = 0;
    const totalPrice = cart.reduce((acc, curr) => {
      tempCartItems += curr.quantity;
      return acc + curr.quantity * curr.price;
    }, 0);
    cartTotal.innerText = `total price : ${totalPrice.toFixed(2)} $`;
    console.log(tempCartItems);
  }
}

// storage
class Storage {
  static saveProduct(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    const _products = JSON.parse(localStorage.getItem("products"));
    return _products.find((p) => (p.id = parseInt(id)));
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getProducts();
  const ui = new UI();
  ui.displayProducts(productsData);
  ui.getAddToCartBtn();
  Storage.saveProduct(productsData);

  // console.log(productsData);
});

// cart item modal
function openModal() {
  cardModal.style.display = "block";
}
function closeModal() {
  cardModal.style.display = "none";
}
cartBtn.addEventListener('click', openModal)
closeModalBtn.addEventListener("click", closeModal);

//  add product to card