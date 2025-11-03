const MENU = [
  { id: 1, name: "Beef Shawarma 🌯", price: 3500, desc: "Beef, veg, juice (Two sausages)" },
  { id: 2, name: "Chicken Shawarma 🌯", price: 3500, desc: "Chicken, veg, juice (Two sausages)" },
  { id: 3, name: "Mix Shawarma 🌯", price: 4000, desc: "Beef, Chicken, veg, juice (Two sausages)" },
  { id: 4, name: "Full Protein Shawarma 💪", price: 5500, desc: "Beef, Chicken, Mix (Two sausages)" },
  { id: 5, name: "Jumbo Shawarma 🌯🔥", price: 6000, desc: "Beef, Chicken, Mix (Three sausages)" },
  { id: 6, name: "Grilled Snails 🐌", price: 5000, desc: "Garnished snail, fries with seasoning" },
  { id: 7, name: "Asun 🐐🔥", price: 4000, desc: "Grilled Goat meat" },
  { id: 8, name: "Chicken and Fries 🍗🍟", price: 5000, desc: "Chicken, chips, salad" },
  { id: 9, name: "Turkey and Fries 🦃🍟", price: 7000, desc: "Turkey, chips, salad" },
  { id: 10, name: "Grilled Catfish 🐟", price: 10000, desc: "Garnished, fries, ketchup, salad" },
  { id: 11, name: "Grilled Croaker 🐠", price: 15000, desc: "Garnished, fries, ketchup, salad" },
  { id: 12, name: "Grilled Tilapia 🐡", price: 15000, desc: "Garnished, fries, ketchup, salad" },
  { id: 13, name: "Mini-Loaded Chinese Fries 🍟", price: 6000, desc: "Loaded with toppings and protein (chicken or beef)" },
  { id: 14, name: "Mix-Mini-Loaded Chinese Fries 🍟", price: 8000, desc: "Loaded with toppings, chicken and beef" },
  { id: 15, name: "Supreme-Loaded Chinese Fries 👑🍟", price: 10000, desc: "Fully loaded with protein, sausage, toppings" },
  { id: 16, name: "Mix-Supreme-Loaded Chinese Fries 👑🍟", price: 15000, desc: "Fully loaded and garnished with protein, sausage, toppings" },
  { id: 17, name: "Loaded Beef and Fries 🥩🍟", price: 8000, desc: "Fully loaded with Beef, sausage, toppings, fries, salad" },
  { id: 18, name: "Loaded Egg-Sauce and Fries 🍳🍟", price: 6000, desc: "Egg sauce, Beef-toppings fries, ketchup" },
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
        💰 ₦${item.price.toLocaleString()}
      </div>
      <button onclick="addToCart(${item.id})">🛒 Add</button>
    `;
    menuDiv.appendChild(div);
  });
}

function addToCart(id) {
  const item = MENU.find(i => i.id === id);
  if (!item) return;

  let extraSausages = 0;
  let extraChips = 0;

  const lowerName = item.name.toLowerCase();

  // Shawarma 🥖 extra sausages
  if (lowerName.includes("shawarma")) {
    const input = prompt("🥖 Add extra sausages? ₦500 each. Enter quantity (0 for none):", "0");
    if (input === null) return;
    extraSausages = parseInt(input) || 0;
    if (extraSausages < 0) extraSausages = 0;
  }

  // Fries 🍟 extra chips
  if (lowerName.includes("fries")) {
    const chipsInput = prompt("🍟 Add extra chips (fries)? ₦1000 per portion. Enter quantity (0 for none):", "0");
    if (chipsInput === null) return;
    extraChips = parseInt(chipsInput) || 0;
    if (extraChips < 0) extraChips = 0;
  }

  const existing = cart.find(i =>
    i.id === id &&
    i.extraSausages === extraSausages &&
    i.extraChips === extraChips
  );

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1, extraSausages, extraChips });
  }

  renderCart();
}

function changeQty(id, delta, extraSausages = 0, extraChips = 0) {
  const item = cart.find(i =>
    i.id === id &&
    i.extraSausages === extraSausages &&
    i.extraChips === extraChips
  );
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i =>
      !(i.id === id && i.extraSausages === extraSausages && i.extraChips === extraChips)
    );
  }
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    const sausageCost = item.extraSausages * 500;
    const chipsCost = item.extraChips * 1000;
    const itemTotal = (item.price + sausageCost + chipsCost) * item.qty;
    subtotal += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div>
        ${item.name} <br>
        💰 ₦${item.price.toLocaleString()}
        ${item.extraSausages > 0 ? `<br><small>🥖 +${item.extraSausages} sausage(s) (₦${(item.extraSausages * 500).toLocaleString()})</small>` : ""}
        ${item.extraChips > 0 ? `<br><small>🍟 +${item.extraChips} chips portion(s) (₦${(item.extraChips * 1000).toLocaleString()})</small>` : ""}
      </div>
      <div>
        <button onclick="changeQty(${item.id}, -1, ${item.extraSausages}, ${item.extraChips})">➖</button>
        ${item.qty}
        <button onclick="changeQty(${item.id}, 1, ${item.extraSausages}, ${item.extraChips})">➕</button>
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
    alert("🛒 Your cart is empty.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const notes = document.getElementById("notes").value.trim();
  const delivery = document.getElementById("delivery").value;

  if (!name || !phone) {
    alert("✏️ Please enter your name and phone number before checkout.");
    return;
  }

  let subtotal = parseInt(document.getElementById("subtotal").innerText.replace(/,/g, "")) || 0;
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

  const message = 
`🍴 *NEW ORDER ALERT* 🍴
--------------------------
👤 Name: ${name}
📞 Phone: ${phone}
${address ? "🏠 Address: " + address : ""}
--------------------------
🧾 *Items Ordered:*
${cart.map(i => {
  const sausageCost = i.extraSausages * 500;
  const chipsCost = i.extraChips * 1000;
  const itemTotal = (i.price + sausageCost + chipsCost) * i.qty;
  return `🟢 ${i.qty} x ${i.name}${
    i.extraSausages > 0 ? ` (+${i.extraSausages} 🥖)` : ""
  }${
    i.extraChips > 0 ? ` (+${i.extraChips} 🍟)` : ""
  } - ₦${itemTotal.toLocaleString()}`;
}).join("\n")}
--------------------------
💵 Subtotal: ₦${subtotal.toLocaleString()}
${deliveryText}
💰 Total: ₦${total.toLocaleString()}
${notes ? "\n📝 Notes: " + notes : ""}
`;

  const phoneNumber = "2348067853972"; // your WhatsApp number
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

document.getElementById("clear").addEventListener("click", () => {
  cart = [];
  renderCart();
});

renderMenu();
renderCart();
