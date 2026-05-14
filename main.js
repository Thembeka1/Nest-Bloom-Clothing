
function removeItem(i){

    if(cart[i].quantity > 1){
        cart[i].quantity--;
    }else{
        cart.splice(i,1);
    }

    updateCart();
}

/* ADD FROM PRODUCT GRID */
document.querySelectorAll(".add-cart").forEach(btn => {
    btn.onclick = (e) => {
        let card = e.target.closest(".card");

        let name = card.querySelector("h3").innerText;
        let price = Number(card.querySelector("p").innerText.replace("R",""));

        let item = cart.find(i => i.name === name);

        if (item) item.quantity++;
        else cart.push({ name, price, quantity: 1 });

        showToast("Added to cart successfully");
        updateCart();
    };
});

const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const closeModal = document.getElementById("closeModal");
const modalAddBtn = document.getElementById("modalAddBtn");

let selectedProduct = null;


document.querySelectorAll(".card").forEach(card => {
    card.onclick = (e) => {
        if (e.target.classList.contains("add-cart")) return;

        selectedProduct = {
            name: card.querySelector("h3").innerText,
            price: Number(card.querySelector("p").innerText.replace("R","")),
            img: card.querySelector("img").src
        };

        modalImg.src = selectedProduct.img;
        modalName.innerText = selectedProduct.name;
        modalPrice.innerText = "R" + selectedProduct.price;

        modal.style.display = "flex";
    };
});


closeModal.onclick = () => modal.style.display = "none";


modalAddBtn.onclick = () => {
    const size = document.getElementById("sizeSelect").value;

    let name = selectedProduct.name + " (" + size + ")";

    let item = cart.find(i => i.name === name);

    if (item) item.quantity++;
    else cart.push({
        name,
        price: selectedProduct.price,
        quantity: 1
    });

    showToast("Added to cart successfully 🛒");

    updateCart();
    modal.style.display = "none";
};


