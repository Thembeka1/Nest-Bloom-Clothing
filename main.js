function removeItem(i){

    if(cart[i].quantity > 1){
        cart[i].quantity--;
    }else{
        cart.splice(i,1);
    }

    updateCart();
}