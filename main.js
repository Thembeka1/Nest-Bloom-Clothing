/* =========================================================
   NEST&BLOOM
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   STORAGE
========================================================= */

const CART_KEY = "nestBloomCart";
const WISHLIST_KEY = "nestBloomWishlist";
const USERS_KEY = "nestBloomUsers";
const LOGGED_IN_KEY = "nestBloomLoggedInUser";


let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
let wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

let giftBox = [];


/* =========================================================
   ELEMENTS
========================================================= */

const cartBtn = document.getElementById("cartBtn");
const cartPopup = document.getElementById("cartPopup");
const cartClose = document.getElementById("cartClose");

const wishlistBtn = document.getElementById("wishlistBtn");
const wishlistPopup = document.getElementById("wishlistPopup");
const wishlistClose = document.getElementById("wishlistClose");

const accountBtn = document.getElementById("accountBtn");
const accountModal = document.getElementById("accountModal");
const accountClose = document.getElementById("accountClose");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

const giftBoxBtn = document.getElementById("giftBoxBtn");
const giftModal = document.getElementById("giftModal");
const giftClose = document.getElementById("giftClose");

const giftSelected = document.getElementById("giftSelected");
const giftTotal = document.getElementById("giftTotal");
const giftMessage = document.getElementById("giftMessage");
const addGiftBox = document.getElementById("addGiftBox");

const newsletterForm = document.getElementById("newsletterForm");

const toast = document.getElementById("toast");


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}


function saveWishlist() {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}


function formatPrice(price) {
    return `R${Number(price).toLocaleString("en-ZA")}`;
}


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


/* =========================================================
   SHOPPING BAG
========================================================= */

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}


function calculateCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );
}


function renderCart() {

    const cartItems = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-message">
                <p>Your shopping bag is empty.</p>
                <p>Find something beautiful for your little one.</p>
            </div>
        `;

        cartTotal.textContent = "R0";

        updateCartCount();

        return;
    }


    cart.forEach((item, index) => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div>

                <h4>${item.name}</h4>

                <p>${formatPrice(item.price)}</p>

                ${
                    item.size
                        ? `<p>Size: ${item.size}</p>`
                        : ""
                }

                <p>
                    Quantity:
                    ${item.quantity}
                </p>

            </div>

            <button
                class="remove-cart"
                data-index="${index}"
            >
                Remove
            </button>

        `;

        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent = formatPrice(
        calculateCartTotal()
    );

    updateCartCount();
}


/* Add normal product */

function addToCart(product) {

    const existingProduct = cart.find(item =>
        item.name === product.name &&
        item.size === product.size
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: product.name,
            price: Number(product.price),
            image: product.image,
            size: product.size || "",
            quantity: 1
        });

    }


    saveCart();

    renderCart();

    showToast(`${product.name} added to your bag.`);
}


/* Remove cart item */

document.addEventListener("click", function(event) {

    if (
        event.target.classList.contains("remove-cart")
    ) {

        const index = Number(
            event.target.dataset.index
        );

        cart.splice(index, 1);

        saveCart();

        renderCart();

        showToast("Item removed from your bag.");
    }

});


/* Open cart */

cartBtn.addEventListener("click", () => {

    renderCart();

    cartPopup.classList.add("active");

});


/* Close cart */

cartClose.addEventListener("click", () => {

    cartPopup.classList.remove("active");

});


/* =========================================================
   PRODUCT BUTTONS
========================================================= */

document.querySelectorAll(".add-product").forEach(button => {

    button.addEventListener("click", () => {

        const product = {

            name: button.dataset.name,

            price: Number(button.dataset.price),

            image: button.dataset.image

        };

        addToCart(product);

    });

});


/* =========================================================
   COLLECTION BUTTONS
========================================================= */

document.querySelectorAll(".collection-btn").forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        /*
            This is mainly for the collection navigation.
            We scroll to the new arrivals section.
        */

        document
            .getElementById("new-arrivals")
            .scrollIntoView({
                behavior: "smooth"
            });

        showToast(
            `Showing our ${category} collection.`
        );

    });

});


/* =========================================================
   WISHLIST
========================================================= */

function updateWishlistCount() {

    const count = document.getElementById(
        "wishlist-count"
    );

    count.textContent = wishlist.length;

}


function renderWishlist() {

    const wishlistItems =
        document.getElementById("wishlistItems");

    wishlistItems.innerHTML = "";


    if (wishlist.length === 0) {

        wishlistItems.innerHTML = `
            <div class="empty-message">

                <p>Your wishlist is empty.</p>

                <p>
                    Save your favourite little pieces here.
                </p>

            </div>
        `;

        return;
    }


    wishlist.forEach((item, index) => {

        const wishlistItem =
            document.createElement("div");

        wishlistItem.className = "wishlist-item";

        wishlistItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div>

                <h4>${item.name}</h4>

                <p>
                    ${formatPrice(item.price)}
                </p>

            </div>

            <button
                class="remove-wishlist"
                data-index="${index}"
            >
                ×
            </button>

        `;

        wishlistItems.appendChild(
            wishlistItem
        );

    });

}


function addToWishlist(product) {

    const exists = wishlist.some(
        item => item.name === product.name
    );


    if (exists) {

        wishlist = wishlist.filter(
            item => item.name !== product.name
        );

        showToast(
            `${product.name} removed from wishlist.`
        );

    } else {

        wishlist.push(product);

        showToast(
            `${product.name} saved to wishlist.`
        );

    }


    saveWishlist();

    updateWishlistCount();

    renderWishlist();

}


/* Remove wishlist item */

document.addEventListener("click", function(event) {

    if (
        event.target.classList.contains(
            "remove-wishlist"
        )
    ) {

        const index = Number(
            event.target.dataset.index
        );

        wishlist.splice(index, 1);

        saveWishlist();

        updateWishlistCount();

        renderWishlist();

        showToast(
            "Removed from wishlist."
        );
    }

});


/* Open wishlist */

wishlistBtn.addEventListener("click", () => {

    renderWishlist();

    wishlistPopup.classList.add("active");

});


/* Close wishlist */

wishlistClose.addEventListener("click", () => {

    wishlistPopup.classList.remove("active");

});


/* =========================================================
   WISHLIST HEARTS
========================================================= */

/*
   The new design does not use hearts on every product,
   but this function is kept so wishlist can easily be
   added to future product sections.
*/

function createWishlistButton(product) {

    const button =
        document.createElement("button");

    button.textContent = "♡";

    button.className = "wishlist-heart";

    if (
        wishlist.some(
            item => item.name === product.name
        )
    ) {

        button.textContent = "♥";

    }


    button.addEventListener("click", () => {

        addToWishlist(product);

        button.textContent =
            wishlist.some(
                item => item.name === product.name
            )
                ? "♥"
                : "♡";

    });


    return button;
}


/* =========================================================
   ACCOUNT MODAL
========================================================= */

accountBtn.addEventListener("click", () => {

    accountModal.classList.add("active");

});


accountClose.addEventListener("click", () => {

    accountModal.classList.remove("active");

});


showRegister.addEventListener("click", () => {

    loginForm.classList.add("hidden");

    registerForm.classList.remove("hidden");

});


showLogin.addEventListener("click", () => {

    registerForm.classList.add("hidden");

    loginForm.classList.remove("hidden");

});


/* =========================================================
   REGISTER
========================================================= */

registerBtn.addEventListener("click", () => {

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (!name || !email || !password || !confirmPassword) {

        showToast("Please complete all fields.");

        return;
    }


    if (password.length < 6) {

        showToast(
            "Password must be at least 6 characters."
        );

        return;
    }


    if (password !== confirmPassword) {

        showToast(
            "Passwords do not match."
        );

        return;
    }


    const existingUser = users.find(
        user => user.email === email
    );


    if (existingUser) {

        showToast(
            "An account with this email already exists."
        );

        return;
    }


    const newUser = {

        name: name,

        email: email,

        password: password

    };


    users.push(newUser);

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

    localStorage.setItem(
        LOGGED_IN_KEY,
        JSON.stringify(newUser)
    );


    showToast(
        `Welcome to Nest&Bloom, ${name}!`
    );


    registerForm.classList.add("hidden");

    loginForm.classList.remove("hidden");


    document.getElementById(
        "loginEmail"
    ).value = email;


    document.getElementById(
        "loginPassword"
    ).value = "";


    updateAccountButton();

});


/* =========================================================
   LOGIN
========================================================= */

loginBtn.addEventListener("click", () => {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if (!email || !password) {

        showToast(
            "Please enter your email and password."
        );

        return;
    }


    const user = users.find(
        account =>
            account.email === email &&
            account.password === password
    );


    if (!user) {

        showToast(
            "Email or password is incorrect."
        );

        return;
    }


    localStorage.setItem(
        LOGGED_IN_KEY,
        JSON.stringify(user)
    );


    accountModal.classList.remove("active");


    showToast(
        `Welcome back, ${user.name}!`
    );


    updateAccountButton();

});


/* =========================================================
   ACCOUNT BUTTON
========================================================= */

function updateAccountButton() {

    const loggedInUser =
        JSON.parse(
            localStorage.getItem(LOGGED_IN_KEY)
        );


    if (loggedInUser) {

        accountBtn.innerHTML = `
            ♡
            <span>${loggedInUser.name.split(" ")[0]}</span>
        `;

    } else {

        accountBtn.innerHTML = `
            ♡
            <span>Account</span>
        `;

    }

}


/* =========================================================
   GIFT BOX
========================================================= */

giftBoxBtn.addEventListener("click", () => {

    giftModal.classList.add("active");

    renderGiftBox();

});


giftClose.addEventListener("click", () => {

    giftModal.classList.remove("active");

});


/* Select gift */

document.querySelectorAll(".gift-option").forEach(option => {

    option.addEventListener("click", () => {

        const name = option.dataset.name;

        const price =
            Number(option.dataset.price);


        const existingIndex =
            giftBox.findIndex(
                item => item.name === name
            );


        if (existingIndex !== -1) {

            giftBox.splice(
                existingIndex,
                1
            );

            option.classList.remove("selected");

            showToast(
                `${name} removed from your gift box.`
            );

        } else {

            if (giftBox.length >= 3) {

                showToast(
                    "Your gift box can have 3 items."
                );

                return;
            }


            giftBox.push({
                name: name,
                price: price
            });

            option.classList.add("selected");

            showToast(
                `${name} added to your gift box.`
            );

        }


        renderGiftBox();

    });

});


function renderGiftBox() {

    if (giftBox.length === 0) {

        giftSelected.innerHTML =
            "Choose your gifts above.";

        giftTotal.textContent = "R0";

        return;
    }


    giftSelected.innerHTML =
        giftBox.map(item => `
            <div class="gift-selected-item">
                ${item.name} — ${formatPrice(item.price)}
            </div>
        `).join("");


    const total = giftBox.reduce(
        (sum, item) =>
            sum + Number(item.price),
        0
    );


    giftTotal.textContent =
        formatPrice(total);

}


/* Add gift box to cart */

addGiftBox.addEventListener("click", () => {

    if (giftBox.length !== 3) {

        showToast(
            "Please choose exactly 3 gifts."
        );

        return;
    }


    const message =
        giftMessage.value.trim();


    const total = giftBox.reduce(
        (sum, item) =>
            sum + Number(item.price),
        0
    );


    cart.push({

        name: "Custom Baby Gift Box",

        price: total,

        image:
            "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=85",

        size: "",

        quantity: 1,

        giftItems: giftBox.map(
            item => item.name
        ),

        giftMessage: message

    });


    saveCart();

    renderCart();


    giftBox = [];

    document
        .querySelectorAll(".gift-option")
        .forEach(option => {
            option.classList.remove("selected");
        });


    giftMessage.value = "";


    giftModal.classList.remove("active");

    cartPopup.classList.add("active");


    showToast(
        "Your custom gift box was added to your bag."
    );

});


/* =========================================================
   NEWSLETTER
========================================================= */

newsletterForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document
                .getElementById("newsletterEmail")
                .value.trim();


        if (!email) {

            showToast(
                "Please enter your email address."
            );

            return;
        }


        showToast(
            "Thank you for joining the Nest&Bloom family!"
        );


        newsletterForm.reset();

    }
);


/* =========================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================================= */

accountModal.addEventListener(
    "click",
    function(event) {

        if (event.target === accountModal) {

            accountModal.classList.remove("active");

        }

    }
);


giftModal.addEventListener(
    "click",
    function(event) {

        if (event.target === giftModal) {

            giftModal.classList.remove("active");

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key !== "Escape") {
            return;
        }


        accountModal.classList.remove(
            "active"
        );

        giftModal.classList.remove(
            "active"
        );

        cartPopup.classList.remove(
            "active"
        );

        wishlistPopup.classList.remove(
            "active"
        );

    }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

updateCartCount();

updateWishlistCount();

renderCart();

renderWishlist();

updateAccountButton();