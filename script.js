// Product data

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        icon: "🎧"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499,
        icon: "⌚"
    },

    {
        id: 3,
        name: "Cotton T-Shirt",
        category: "Clothing",
        price: 599,
        icon: "👕"
    },

    {
        id: 4,
        name: "Casual Shoes",
        category: "Clothing",
        price: 1299,
        icon: "👟"
    },

    {
        id: 5,
        name: "Programming Book",
        category: "Books",
        price: 499,
        icon: "📚"
    },

    {
        id: 6,
        name: "Web Development Guide",
        category: "Books",
        price: 699,
        icon: "📖"
    }

];


// Get cart from localStorage

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// Display products when page loads

displayProducts(products);

updateCart();


/* Display Products */

function displayProducts(productList) {

    const container =
        document.getElementById(
            "productContainer"
        );


    container.innerHTML = "";


    if (productList.length === 0) {

        container.innerHTML =
            "<p>No products found.</p>";

        return;

    }


    productList.forEach(product => {

        const card =
            document.createElement("div");


        card.className = "product";


        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <h3>
                ${product.name}
            </h3>

            <p>
                ${product.category}
            </p>

            <div class="price">
                ₹${product.price}
            </div>

            <button
                onclick="addToCart(${product.id})">

                Add to Cart

            </button>

        `;


        container.appendChild(card);

    });

}


/* Add product to cart */

function addToCart(id) {

    const product =
        products.find(
            product => product.id === id
        );


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            quantity: 1

        });

    }


    saveCart();

    updateCart();


    alert(
        product.name +
        " added to cart!"
    );

}


/* Save cart */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/* Update cart */

function updateCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    cartItems.innerHTML = "";


    let total = 0;

    let count = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;


        count += item.quantity;


        const element =
            document.createElement("div");


        element.className =
            "cart-item";


        element.innerHTML = `

            <h4>
                ${item.name}
            </h4>

            <p>
                ₹${item.price}
            </p>


            <div class="quantity">

                <button
                    onclick="changeQuantity(
                        ${item.id},
                        -1
                    )">

                    −

                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    onclick="changeQuantity(
                        ${item.id},
                        1
                    )">

                    +

                </button>

            </div>


            <button
                class="remove"
                onclick="removeFromCart(
                    ${item.id}
                )">

                Remove

            </button>

        `;


        cartItems.appendChild(element);

    });


    cartCount.innerText = count;

    cartTotal.innerText = total;

}


/* Change quantity */

function changeQuantity(id, amount) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    saveCart();

    updateCart();

}


/* Remove item */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    updateCart();

}


/* Open cart */

function openCart() {

    document
        .getElementById("cartPanel")
        .classList.add("active");

}


/* Close cart */

function closeCart() {

    document
        .getElementById("cartPanel")
        .classList.remove("active");

}


/* Category filter */

function filterProducts(category) {

    if (category === "All") {

        displayProducts(products);

        return;

    }


    const filtered =
        products.filter(
            product =>
                product.category === category
        );


    displayProducts(filtered);

}


/* Search */

document
    .getElementById("search")
    .addEventListener(
        "input",
        function() {

            const searchText =
                this.value.toLowerCase();


            const filtered =
                products.filter(product =>

                    product.name
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(searchText)

                );


            displayProducts(filtered);

        }
    );


/* Checkout */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;

    }


    alert(
        "Order placed successfully!"
    );


    cart = [];

    saveCart();

    updateCart();

    closeCart();

}