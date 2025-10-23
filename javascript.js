// Define the menu
const MENU = [
  { id: 1, name: "Regular Shawarma", price: 3500, desc: "Beef, Chicken, Mix (Two sausages)" },
  { id: 2, name: "Full Protein Shawarma", price: 5500, desc: "Beef, Chicken, Mix (Two sausages)" },
  { id: 3, name: "Jumbo Shawarma", price: 6000, desc: "Beef, Chicken, Mix (Three sausages)" },
  { id: 4, name: "Grilled Snails", price: 5000, desc: "Garnished snail, fries with seasoning" },
  { id: 5, name: "Asun", price: 4000, desc: "Grilled Goat meat" },
  { id: 6, name: "Chicken and Fries", price: 5000, desc: "Chicken, chips, salad" },
  { id: 7, name: "Turkey and Fries", price: 7000, desc: "Turkey, chips, salad" },
  { id: 8, name: "Grilled Catfish", price: 10000, desc: "Garnished, fries, ketchup, salad" },
  { id: 9, name: "Grilled Croaker", price: 15000, desc: "Garnished, fries, ketchup, salad" },
  { id: 10, name: "Grilled Tilapia", price: 15000, desc: "Garnished, fries, ketchup, salad" },
  { id: 11, name: "Mini-Loaded Chinese Fries", price: 10000, desc: "Loaded with toppings and ketchup" },
  { id: 12, name: "Supreme-Loaded Chinese Fries", price: 15000, desc: "Fully loaded and garnished" },
  { id: 13, name: "Loaded Beef and Fries", price: 8000, desc: "Beef, fries, salad" },
  { id: 14, name: "Loaded Egg-Sauce and Fries", price: 6000, desc: "Egg sauce, fries, ketchup" },
];

let cart = [];

function renderMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";
  MENU.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <small>${item.desc}</small><br>
        ₦${item.price.toLocaleString()}
      </div>
      <button onclick="addToCart(${item.id})">Add</button>
    `;
    menuDiv.appendChild(div);
  });
}

function addToCart(id) {
  const item = MENU.find(i => i.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div>${item.name} (₦${item.price.toLocaleString()})</div>
      <div>
        <button onclick="changeQty(${item.id}, -1)">-</button>
        ${item.qty}
        <button onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    `;
    cartDiv.appendChild(div);
  });

  const tax = Math.round(subtotal * 0.000);
  const total = subtotal + tax;

  document.getElementById("subtotal").innerText = subtotal.toLocaleString();
  document.getElementById("tax").innerText = tax.toLocaleString();
  document.getElementById("total").innerText = total.toLocaleString();
}

// Add delivery dropdown dynamically if not in HTML
if (!document.getElementById("delivery")) {
  const deliverySelect = document.createElement("select");
  deliverySelect.id = "delivery";
  deliverySelect.innerHTML = `
    <option value="">Delivery?</option>
    <option value="yes">Yes (₦1500 within Eagle Island)</option>
    <option value="no">No (Pickup or negotiate)</option>
  `;
  document.querySelector(".container").insertBefore(deliverySelect, document.getElementById("notes"));
}

document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const notes = document.getElementById("notes").value.trim();
  const delivery = document.getElementById("delivery").value;

  if (!name || !phone) {
    alert("Please enter your name and phone number before checkout.");
    return;
  }

  let subtotal = parseInt(document.getElementById("subtotal").innerText.replace(/,/g, ""));
  let total = subtotal;
  let deliveryText = "";

  if (delivery === "yes") {
    total += 1500;
    deliveryText = "✅ Delivery within Eagle Island (₦1500)";
  } else if (delivery === "no") {
    deliveryText = "🚚 Delivery to be negotiated.";
  }

  let message = `*NEW ORDER*%0A`;
  message += `*Name:* ${name}%0A`;
  message += `*Phone:* ${phone}%0A`;
  if (address) message += `*Address:* ${address}%0A`;

  message += `%0A*Items Ordered:*%0A`;
  cart.forEach(i => {
    message += `${i.qty} x ${i.name} - ₦${(i.price * i.qty).toLocaleString()}%0A`;
  });

  message += `%0A*Subtotal:* ₦${subtotal.toLocaleString()}%0A`;
  message += `*${deliveryText}*%0A`;
  message += `*Total:* ₦${total.toLocaleString()}%0A`;

  if (notes) message += `%0A*Notes:* ${notes}`;

  const phoneNumber = "2347035107709"; // your WhatsApp number
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
});

document.getElementById("clear").addEventListener("click", () => {
  cart = [];
  renderCart();
});

// Shrink logo on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) document.body.classList.add("scrolled");
  else document.body.classList.remove("scrolled");
});

renderMenu();
renderCart();
