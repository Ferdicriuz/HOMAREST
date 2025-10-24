const MENU = [
  { id: 1, name: "Beef Shawarma", price: 3500, desc: "Beef, veg, juice (Two sausages)" },
  { id: 2, name: "Chicken Shawarma", price: 3500, desc: "Chicken,  veg, juice (Two sausages)" },
  { id: 3, name: "Mix Shawarma", price: 4000, desc: "Beef, Chicken, veg, juice(Two sausages)" },
  { id: 4, name: "Full Protein Shawarma", price: 5500, desc: "Beef, Chicken, Mix (Two sausages)" },
  { id: 5, name: "Jumbo Shawarma", price: 6000, desc: "Beef, Chicken, Mix (Three sausages)" },
  { id: 6, name: "Grilled Snails", price: 5000, desc: "Garnished snail, fries with seasoning" },
  { id: 7, name: "Asun", price: 4000, desc: "Grilled Goat meat" },
  { id: 8, name: "Chicken and Fries", price: 5000, desc: "Chicken, chips, salad" },
  { id: 9, name: "Turkey and Fries", price: 7000, desc: "Turkey, chips, salad" },
  { id: 10, name: "Grilled Catfish", price: 10000, desc: "Garnished, fries, ketchup, salad" },
  { id: 11, name: "Grilled Croaker", price: 15000, desc: "Garnished, fries, ketchup, salad" },
  { id: 12, name: "Grilled Tilapia", price: 15000, desc: "Garnished, fries, ketchup, salad" },
  { id: 13, name: "Mini-Loaded Chinese Fries", price: 6000, desc: "Loaded with toppings and protein (chicken or beef)" },
  { id: 14, name: "Mix-Mini-Loaded Chinese Fries", price: 8000, desc: "Loaded with toppings, chicken and beef" },
  { id: 15, name: "Supreme-Loaded Chinese Fries", price: 10000, desc: "Fully loaded and garnished with protein, sausage, toppings" },
  { id: 16, name: "Mix-Supreme-Loaded Chinese Fries", price: 15000, desc: "Fully loaded and garnished with protein, sausage, toppings" },
  { id: 17, name: "Loaded Beef and Fries", price: 8000, desc: "Fully loaded with Beef,sausage, toppings, fries, salad" },
  { id: 18, name: "Loaded Egg-Sauce and Fries", price: 6000, desc: "Egg sauce,Beef-toppings fries, ketchup" },
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

  document.getElementById("subtotal").innerText = subtotal.toLocaleString();
  document.getElementById("tax").innerText = "0";
  document.getElementById("total").innerText = subtotal.toLocaleString();
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

  if (delivery === "within") {
    total += 1000;
    deliveryText = "🚚 Delivery within Eagle Island (₦1000)";
  } else if (delivery === "outside") {
    deliveryText = "🚛 Delivery outside Eagle Island (negotiable)";
  } else if (delivery === "none") {
    deliveryText = "🏃 Pickup by me from store";
  } else {
    alert("Please select a delivery option.");
    return;
  }

  let message = `
NEW ORDER
--------------------------
Name: ${name}
Phone: ${phone}
${address ? "Address: " + address : ""}
--------------------------
Items Ordered:
${cart.map(i => `${i.qty} x ${i.name} - ₦${(i.price * i.qty).toLocaleString()}`).join("\n")}
--------------------------
Subtotal: ₦${subtotal.toLocaleString()}
${deliveryText}
Total: ₦${total.toLocaleString()}
${notes ? "\nNotes: " + notes : ""}
`;

  const phoneNumber = "2347035107709"; // your WhatsApp number
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

document.getElementById("clear").addEventListener("click", () => {
  cart = [];
  renderCart();
});

renderMenu();
renderCart();

