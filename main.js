
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