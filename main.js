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

