// =====================================================
// MAATRIXKART JAVASCRIPT
// =====================================================


// =====================================================
// SEARCH ELEMENTS
// =====================================================

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const clearSearch =
    document.getElementById("clearSearch");


// =====================================================
// ADVANCED SEARCH
// =====================================================

function searchProducts() {

    if (!searchInput) {
        return;
    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(".product");


    let foundProducts = 0;


    products.forEach(function(product) {

        const nameElement =
            product.querySelector("h3");


        if (!nameElement) {
            return;
        }


        // Product name

        const productName =
            nameElement.textContent
                .toLowerCase();


        // Product ID

        const productId =
            product.dataset.id
                ? product.dataset.id.toLowerCase()
                : "";


        // Product category

        const productCategory =
            product.dataset.category
                ? product.dataset.category.toLowerCase()
                : "";


        // Search name, ID and category

        const matches =
            productName.includes(searchText) ||
            productId.includes(searchText) ||
            productCategory.includes(searchText);


        if (matches) {

            product.style.display = "";

            foundProducts++;

        } else {

            product.style.display = "none";

        }

    });


    // =================================================
    // SEARCH RESULT MESSAGE
    // =================================================

    let resultCount =
        document.getElementById(
            "searchResultCount"
        );


    if (!resultCount) {

        resultCount =
            document.createElement("div");

        resultCount.id =
            "searchResultCount";


        const productSection =
            document.querySelector(
                ".product-section"
            );


        const productsContainer =
            document.querySelector(
                ".products"
            );


        if (
            productSection &&
            productsContainer
        ) {

            productSection.insertBefore(
                resultCount,
                productsContainer
            );

        }

    }


    if (!resultCount) {
        return;
    }


    // Empty search

    if (searchText === "") {

        resultCount.style.display =
            "none";

        return;

    }


    // No products

    if (foundProducts === 0) {

        resultCount.textContent =
            "🔍 No products found";

        resultCount.style.display =
            "block";

        return;

    }


    // Products found

    resultCount.textContent =
        "🔎 " +
        foundProducts +
        " product(s) found";


    resultCount.style.display =
        "block";

}


// =====================================================
// SEARCH WHILE TYPING
// =====================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchProducts
    );


    // Press Enter

    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                searchProducts();

            }

        }
    );

}


// =====================================================
// SEARCH BUTTON
// =====================================================

if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchProducts
    );

}


// =====================================================
// CLEAR SEARCH
// =====================================================

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        function() {

            if (searchInput) {

                searchInput.value = "";

            }


            // Show all products

            const products =
                document.querySelectorAll(
                    ".product"
                );


            products.forEach(
                function(product) {

                    product.style.display =
                        "";

                }
            );


            // Hide result count

            const resultCount =
                document.getElementById(
                    "searchResultCount"
                );


            if (resultCount) {

                resultCount.style.display =
                    "none";

            }


            if (searchInput) {

                searchInput.focus();

            }

        }
    );

}


// =====================================================
// CART
// =====================================================

// Load cart

let cart =
    JSON.parse(
        localStorage.getItem(
            "maatrixCart"
        )
    ) || [];


// =====================================================
// ADD TO CART
// =====================================================

const buyButtons =
    document.querySelectorAll(".buy");


buyButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function(event) {

                // Stop product card from opening

                event.stopPropagation();


                const product =
                    button.closest(".product");


                if (!product) {
                    return;
                }


                const nameElement =
                    product.querySelector("h3");


                const priceElement =
                    product.querySelector(".price");


                const imageElement =
                    product.querySelector("img");


                if (
                    !nameElement ||
                    !priceElement
                ) {

                    return;

                }


                const name =
                    nameElement.textContent.trim();


                const price =
                    Number(
                        priceElement.textContent
                            .replace(/[₹,]/g, "")
                    );


                const image =
                    imageElement
                        ? imageElement.src
                        : "";


                // Check existing product

                const existingProduct =
                    cart.find(
                        function(item) {

                            return item.name === name;

                        }
                    );


                if (existingProduct) {

                    existingProduct.quantity++;

                } else {

                    cart.push({

                        name: name,

                        price: price,

                        image: image,

                        quantity: 1

                    });

                }


                // Save cart

                localStorage.setItem(
                    "maatrixCart",
                    JSON.stringify(cart)
                );


                // Update number

                updateCartCount();


                alert(
                    name +
                    " added to cart!"
                );

            }
        );

    }
);


// =====================================================
// CART COUNT
// =====================================================

function updateCartCount() {

    const cartCounter =
        document.getElementById(
            "cartCount"
        );


    if (!cartCounter) {
        return;
    }


    const totalItems =
        cart.reduce(
            function(total, item) {

                return total +
                    Number(item.quantity || 0);

            },
            0
        );


    cartCounter.textContent =
        totalItems;

}


// Update when page opens

updateCartCount();


// =====================================================
// OPEN CART
// =====================================================

const cartElement =
    document.querySelector(".cart");


if (cartElement) {

    cartElement.style.cursor =
        "pointer";


    cartElement.addEventListener(
        "click",
        function() {

            window.location.href =
                "cart.html";

        }
    );

}


// =====================================================
// OPEN PRODUCT
// =====================================================

function openProduct(
    productType = "smartphone"
) {

    window.location.href =
        "product.html?product=" +
        encodeURIComponent(productType);

}


// =====================================================
// CATEGORY FILTER
// =====================================================

function filterCategory(category) {

    const products =
        document.querySelectorAll(".product");


    // Clear search

    if (searchInput) {

        searchInput.value = "";

    }


    // Hide search result

    const resultCount =
        document.getElementById(
            "searchResultCount"
        );


    if (resultCount) {

        resultCount.style.display =
            "none";

    }


    let foundProducts = 0;


    products.forEach(
        function(product) {

            const productCategory =
                product.dataset.category;


            if (
                productCategory === category
            ) {

                product.style.display = "";

                foundProducts++;

            } else {

                product.style.display =
                    "none";

            }

        }
    );


    // Scroll to products

    const productSection =
        document.querySelector(
            ".product-section"
        );


    if (productSection) {

        productSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// =====================================================
// SHOW ALL PRODUCTS
// =====================================================

function showAllProducts() {

    const products =
        document.querySelectorAll(".product");


    products.forEach(
        function(product) {

            product.style.display = "";

        }
    );


    // Clear search

    if (searchInput) {

        searchInput.value = "";

    }


    // Hide result counter

    const resultCount =
        document.getElementById(
            "searchResultCount"
        );


    if (resultCount) {

        resultCount.style.display =
            "none";

    }


    // Scroll to products

    const productSection =
        document.querySelector(
            ".product-section"
        );


    if (productSection) {

        productSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// =====================================================
// WISHLIST
// =====================================================

// Load wishlist

let wishlist =
    JSON.parse(
        localStorage.getItem(
            "maatrixWishlist"
        )
    ) || [];


// =====================================================
// TOGGLE WISHLIST
// =====================================================

function toggleWishlist(
    event,
    productId
) {

    event.stopPropagation();


    const index =
        wishlist.indexOf(productId);


    if (index === -1) {

        // Add

        wishlist.push(productId);

    } else {

        // Remove

        wishlist.splice(index, 1);

    }


    // Save

    localStorage.setItem(
        "maatrixWishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistButtons();

}


// =====================================================
// UPDATE WISHLIST BUTTONS
// =====================================================

function updateWishlistButtons() {

    const buttons =
        document.querySelectorAll(
            ".wishlist-btn"
        );


    buttons.forEach(
        function(button) {

            const onclickText =
                button.getAttribute(
                    "onclick"
                );


            if (!onclickText) {
                return;
            }


            const match =
                onclickText.match(
                    /'([^']+)'/
                );


            if (!match) {
                return;
            }


            const productId =
                match[1];


            if (
                wishlist.includes(productId)
            ) {

                button.textContent =
                    "♥";

                button.classList.add(
                    "active"
                );

            } else {

                button.textContent =
                    "♡";

                button.classList.remove(
                    "active"
                );

            }

        }
    );

}


// =====================================================
// START WISHLIST
// =====================================================

updateWishlistButtons();


// =====================================================
// PAGE LOADED
// =====================================================

console.log(
    "MaatrixKart loaded successfully!"
);