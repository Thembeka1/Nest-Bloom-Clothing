let cart = [];


const cartBtn = document.querySelector(".cart-btn");
const cartPopup = document.getElementById("cartPopup");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartCount = document.getElementById("cart-count");
const cartTotalTop = document.getElementById("cart-total");
const closeBtn = document.querySelector(".close-btn");
const checkoutBtn = document.querySelector(".checkout-btn");


cartBtn.onclick = () => cartPopup.classList.add("active");
closeBtn.onclick = () => cartPopup.classList.remove("active");


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


function updateCart() {
    cartCount.innerText = cart.reduce((a,b) => a + b.quantity, 0);

    let total = cart.reduce((a,b) => a + (b.price * b.quantity), 0);

    cartTotalTop.innerText = total;

    renderCart();
}


function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>🛒 Your cart is empty</p>";
        cartTotal.innerText = "Total: R0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                R${item.price} x ${item.quantity}
            </div>
            <button onclick="removeItem(${index})">X</button>
        </div>`;
    });

    cartTotal.innerText = "Total: R" + total;
}


function removeItem(i) {
    if (cart[i].quantity > 1) {
        cart[i].quantity--; // remove only 1 item
    } else {
        cart.splice(i, 1); // remove product completely
    }

    updateCart();
}

checkoutBtn.onclick = () => {
    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    alert("Order placed successfully 🎉");
    cart = [];
    updateCart();
    cartPopup.classList.remove("active");
};

function showToast(msg) {
    let toast = document.getElementById("toast");

    toast.innerText = msg;

    toast.style.display = "block";

    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    }, 10);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-20px)";

        setTimeout(() => {
            toast.style.display = "none";
        }, 400);

    }, 2000);
}