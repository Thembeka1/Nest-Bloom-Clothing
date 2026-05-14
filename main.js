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