const proListBtn = document.querySelector('.openModalBtn')
const modal = document.querySelector("#myModal");

proListBtn.addEventListener('click', openModal)

function openModal () {
    console.log(modal.classList === "showModal" ? "has a class" : "not");
}