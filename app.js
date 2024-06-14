// modal
const cartBtn = document.querySelector('.openModalBtn')
const cardModal = document.querySelector("#myModal");
const backDrop = document.querySelector('.backdrop')
const closeModalBtn = document.querySelector('.closeModal')
import { productsData } from "./products.js";

// get products
class Products {

    // get ftom API end point   
    getProducts() {
        return productsData;
    }
}

// display products
class UI {

}

// storage 
class Storage {

}

document.addEventListener('DOMContentLoaded', () => {
    const products = new Products()
    const productsData = products.getProducts()
    console.log(productsData);
})
// cart item modal

function openModal () {
    modal.style.display = 'block'
    
}
function closeModal () {
    modal.style.display = 'none'
}
cartBtn.addEventListener('click', openModal)
closeModalBtn.addEventListener("click", closeModal);

//  add product to card
