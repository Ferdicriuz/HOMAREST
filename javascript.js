const MENU = [
  { id: 1, name: "Regular Shawarma", price: 3500, desc: "Beef, Chicken, Mix (Two sausages)" },
  { id: 2, name: "Full Protein Shawarma", price: 5500, desc: "Beef, Chicken, Mix (Two sausages)" },
  { id: 3, name: "Jumbo Shawarma", price: 6000, desc: "Beef, Chicken, Mix (Three sausages)" },
  { id: 4, name: "Grilled Snails", price: 5000, desc: "Garnished snail, fries with seasoning" },
  { id: 5, name: "Asun", price: 4000, desc: "Grilled Goatmeat" },
  { id: 6, name: "Chicken and Fries", price: 5000, desc: "Chicken, chips, salad" },
  { id: 7, name: "Turkey and Fries", price: 7000, desc: "Turkey, chips, salad" },
  { id: 8, name: "Grilled Catfish", price: 10000, desc: "Garnished, fries, ketchup, salad" },
  { id: 9, name: "Grilled Croaker", price: 15000, desc: "Garnished, fries, ketchup, salad" },
  { id: 10, name: "Grilled Tilapia", price: 15000, desc: "Garnished, fries, ketchup, salad" },
  { id: 11, name: "Mini-Loaded Chinese Fries", price: 10000, desc: "Loaded fries, chicken, salad" },
  { id: 12, name: "Supreme-Loaded Chinese Fries", price: 15000, desc: "Loaded fries, beef, chicken, salad" },
  { id: 13, name: "Loaded Beef and Fries", price: 8000, desc: "Loaded fries with beef" },
  { id: 14, name: "Loaded Egg-Sauce and Fries", price: 6000, desc: "Egg sauce with fries" },
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
      <div>${item.name} (₦${item.price})</div>
      <div>
        <button onclick="changeQty(${item.id}, -1)">-</button>
        ${item.qty}
        <button onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    `;
    cartDiv.appendChild(div);
  });

  const tax = Math.round(subtotal * 0.075);
  let total = subtotal + tax;

  const deliveryOption = document.getElementById("delivery").value;
  const deliveryText = document.getElementById("delivery-fee-text");
  let deliveryFee = 0;

  if (deliveryOption === "yes") {
    deliveryFee = 1500;
    total += deliveryFee;
    deliveryText.style.display = "block";
  } else {
    deliveryText.style.display = "none";
  }

  document.getElementById("subtotal").innerText = subtotal.toLocaleString();
  document.getElementById("tax").innerText = tax.toLocaleString();
  document.getElementById("total").innerText = total.toLocaleString();
}

document.getElementById("delivery").addEventListener("change", renderCart);

document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const notes = document.getElementById("notes").value.trim();
  const deliveryOption = document.getElementById("delivery").value;

  let message = `*NEW ORDER*%0A`;
  if (name) message += `*Name:* ${name}%0A`;
  if (phone) message += `*Phone:* ${phone}%0A`;
  if (address) message += `*Address:* ${address}%0A`;

  message += `%0A*Items:*%0A`;
  cart.forEach(i => {
    message += `${i.qty} x ${i.name} - ₦${(i.price * i.qty).toLocaleString()}%0A`;
  });

  let subtotal = parseInt(document.getElementById("subtotal").innerText.replace(/,/g, ""));
  let tax = parseInt(document.getElementById("tax").innerText.replace(/,/g, ""));
  let total = parseInt(document.getElementById("total").innerText.replace(/,/g, ""));

  if (deliveryOption === "yes") {
    message += `%0A*Delivery:* Yes (₦1500 within Eagle Island)%0A`;
  } else {
    message += `%0A*Delivery:* No (To be negotiated)%0A`;
  }

  message += `%0A*Subtotal:* ₦${subtotal.toLocaleString()}%0A`;
  message += `*Tax (7.5%):* ₦${tax.toLocaleString()}%0A`;
  message += `*Total:* ₦${total.toLocaleString()}%0A`;

  if (notes) message += `%0A*Notes:* ${notes}%0A`;

  const phoneNumber = "2347035107709";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(decodeURIComponent(message))}`;
  window.open(url, "_blank");
});

document.getElementById("clear").addEventListener("click", () => {
  cart = [];
  renderCart();
});

renderMenu();
renderCart();


