// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");

function getCartFromStorage() {
  const cartJSON = sessionStorage.getItem("cart");
  return cartJSON ? JSON.parse(cartJSON) : [];
}

// Function to save the cart data to session storage
function saveCartToStorage(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Function to add item to the cart
function addToCart(productId) {
  const cart = getCartFromStorage();
  const product = products.find((item) => item.id === productId);

  if (product) {
    cart.push(product);
    saveCartToStorage(cart);
    renderCart();
  }
}

// Function to remove item from the cart
function removeFromCart(productId) {
  const cart = getCartFromStorage();
  const updatedCart = cart.filter((item) => item.id !== productId);
  saveCartToStorage(updatedCart);
  renderCart();
}

// Function to clear the cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Function to render the product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.classList.add("product");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Function to render the cart items
function renderCart() {
  const cart = getCartFromStorage();

  // Clear existing cart items
  cartList.innerHTML = "";

  // Render cart items
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Event listener for adding products to cart
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

// Event listener for removing products from cart
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    removeFromCart(productId);
  }
});

// Event listener for clearing the cart
clearCartButton.addEventListener("click", clearCart);

() => {
  // Click the "Add to Cart" button for the first product
  cy.get("ul#product-list").children("li").first().children("button").click();

  // Ensure the correct products are in the cart
  const expectedProducts = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 5, name: "Product 5", price: 50 },
  ];

  // Check the cart in session storage
  cy.window().its("sessionStorage").should((sessionStorage) => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Custom assertion to check for the presence of expected products in the cart
    expect(cart).to.have.length(expectedProducts.length);

    expectedProducts.forEach((expectedProduct) => {
      expect(cart).to.deep.include(expectedProduct);
    });
  });
}







// Initial render
renderProducts();
renderCart();