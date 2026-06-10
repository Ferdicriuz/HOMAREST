
const MENU = [
  {
    id: 1,
    name: "Beef Shawarma 🌯",
    price: 3500,
    desc: "Beef, veg, juice (Two sausages)",
    image: "images/beef-shawarma.jpg"
  },
  {
    id: 2,
    name: "Chicken Shawarma 🌯",
    price: 3500,
    desc: "Chicken, veg, juice (Two sausages)",
    image: "images/chicken-shawarma.jpg"
  },
  {
    id: 3,
    name: "Mix Shawarma 🌯",
    price: 4000,
    desc: "Beef, Chicken, veg, juice (Two sausages)",
    image: "images/mix-shawarma.jpg"
  },
  {
    id: 4,
    name: "Full Protein Shawarma 🌯",
    price: 5500,
    desc: "Beef, Chicken, Mix (Two sausages)",
    image: "images/full-protein-shawarma.jpg"
  },
  {
    id: 5,
    name: "Jumbo Shawarma 🌯🔥",
    price: 6000,
    desc: "Beef, Chicken, Mix (Three sausages)",
    image: "images/jumbo-shawarma.jpg"
  },
  {
    id: 6,
    name: "Grilled Snails 🐌",
    price: 5000,
    desc: "Garnished snail, fries with seasoning",
    image: "images/grilled-snails.jpg"
  },
  {
    id: 7,
    name: "Asun 🐐🔥",
    price: 4000,
    desc: "Grilled Goat meat",
    image: "images/asun.jpg"
  },
  {
    id: 8,
    name: "Chicken and Fries 🍗🍟",
    price: 5000,
    desc: "Chicken, chips, salad",
    image: "images/chicken-fries.jpg"
  },
  {
    id: 9,
    name: "Chicken and Fries 🍗🍟",
    price: 7000,
    desc: "Chicken, chips, salad",
    image: "images/chicken-fries.jpg"
  },
  {
    id: 10,
    name: "Chicken Wings and Fries 🍗🍟",
    price: 10000,
    desc: "Chicken, chips, salad",
    image: "images/Chicken Skewers.jpg"
  },
  {
    id: 11,
    name: "Turkey and Fries 🦃🍟",
    price: 8000,
    desc: "Turkey, chips, salad",
    image: "images/turkey-fries.jpg"
  },
  {
    id: 12,
    name: "Grilled Catfish 🐟",
    price: 10000,
    desc: "Garnished, fries, ketchup, salad",
    image: "images/grilled-catfish.jpg"
  },
  {
    id: 13,
    name: "Grilled Catfish 🐟",
    price: 12000,
    desc: "Garnished, fries, ketchup, salad",
    image: "images/grilled-catfish.jpg"
  },
  {
    id: 14,
    name: "Grilled Croaker 🐠",
    price: 15000,
    desc: "Garnished, fries, ketchup, salad",
    image: "images/grilled-croaker.jpg"
  },
  {
    id: 15,
    name: "Grilled Croaker 🐠",
    price: 18000,
    desc: "Garnished, fries, ketchup, salad",
    image: "images/grilled-croaker.jpg"
  },
  {
    id: 16,
    name: "Grilled Tilapia 🐡",
    price: 15000,
    desc: "Garnished, fries, ketchup, salad",
    image: "images/grilled-tilapia.jpg"
  },
  {
    id: 17,
    name: "Mini-Loaded Chinese Fries 🍟",
    price: 6000,
    desc: "Loaded with toppings and protein (chicken or beef)",
    image: "images/mini-loaded-fries.jpg"
  },
  {
    id: 18,
    name: "Mix-Mini-Loaded Chinese Fries 🍟",
    price: 8000,
    desc: "Loaded with toppings, chicken and beef",
    image: "images/mix-mini-loaded-fries.jpg"
  },
 
  {
    id: 19,
    name: "Loaded Beef and Fries 🥩🍟",
    price: 8000,
    desc: "Fully loaded with Beef, sausage, toppings, fries, salad",
    image: "images/loaded-beef-fries.jpg"
  },
  {
    id: 20,
    name: "Loaded Egg-Sauce and Fries 🍳🍟",
    price: 6000,
    desc: "Egg sauce, Beef-toppings fries, ketchup",
    image: "images/egg-sauce-fries.jpg"
  }
];

let cart = [];



function renderMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  MENU.forEach(item => {
    const div = document.createElement("div");

    div.className = "menu-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="menu-img">

      <div class="menu-details">
        <strong>${item.name}</strong><br>
        <small>${item.desc}</small><br>
        ₦${item.price.toLocaleString()}
      </div>

      <button type="button" onclick="addToCart(${item.id})">
        🛒 Add
      </button>
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
         ₦${item.price.toLocaleString()}
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

  const currentHour = Number(
  new Intl.DateTimeFormat("en-NG", {
    timeZone: "Africa/Lagos",
    hour: "numeric",
    hour12: false
  }).format(new Date())
);



if (delivery === "within") {

  let deliveryFee;

  if (currentHour >= 20 && currentHour <= 22) {
    deliveryFee = 1500; // 8 PM - 10 PM
  } else {
    deliveryFee = 1000; // 3 PM - 7:59 PM
  }

  total += deliveryFee;
  deliveryText = `🚚 Delivery within Eagle Island (₦${deliveryFee})`;

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
Subtotal: ₦${subtotal.toLocaleString()}
${deliveryText}
Total: ₦${total.toLocaleString()}
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


// ----------------------------
// CUSTOMER CARE WIDGET
// ----------------------------
const careBtn = document.getElementById("careBtn");
const careOptions = document.getElementById("careOptions");
const careForm = document.getElementById("careForm");
const formTitle = document.getElementById("formTitle");
const submitCare = document.getElementById("submitCare");
const cancelCare = document.getElementById("cancelCare");

let selectedType = "";

careBtn.addEventListener("click", () => {
  careOptions.classList.toggle("hidden");
  careForm.classList.add("hidden");

  // 🛑 Stop blinking after first click
  careBtn.style.animation = "none";
});

document.querySelectorAll(".option-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedType = btn.dataset.type; // "Complain" or "Review"
    formTitle.innerText = `${selectedType} Form`;
    careOptions.classList.add("hidden");
    careForm.classList.remove("hidden");
  });
});

cancelCare.addEventListener("click", () => {
  careForm.classList.add("hidden");

  // ✅ Resume blinking when user cancels
  careBtn.style.animation = "blinkPulse 1.5s infinite";
});
submitCare.addEventListener("click", (event) => {
  event.preventDefault(); // 🚫 Stop form from refreshing the page

  const email = document.getElementById("careEmail").value.trim();
  const message = document.getElementById("careMessage").value.trim();

  if (!email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // ✅ Subject now only shows the selected type ("Complain" or "Review")
  const subject = selectedType;

  // ✅ Email body includes user's email and message
  const body = `${message}`;

  // Open default email app
  const mailto = `mailto:homagrills@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  // Reset form
  document.getElementById("careEmail").value = "";
  document.getElementById("careMessage").value = "";
  careForm.classList.add("hidden");

  // ✅ Resume blinking after submit
  careBtn.style.animation = "blinkPulse 1.5s infinite";
});


  function toggleItems(id) {
    const section = document.getElementById(id);

    // Check current state
    const isOpen = section.style.display === "flex";

    // Close all sections first
    document.querySelectorAll('.items').forEach(item => {
      item.style.display = "none";
    });

    // If it was closed, open it
    if (!isOpen) {
      section.style.display = "flex";
    }
  }


  // Hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});





document.addEventListener('DOMContentLoaded', () => {
  const categoryCards = document.querySelectorAll('.category-card');
  const itemsSections = document.querySelectorAll('.items');

  // Ensure all sections are closed on page load
  itemsSections.forEach(section => section.style.display = 'none');

  // Add click listener to each category card
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      // Close all other sections
      itemsSections.forEach(section => {
        if (section !== targetSection) section.style.display = 'none';
      });

      // Toggle clicked section
      targetSection.style.display = (targetSection.style.display === 'flex') ? 'none' : 'flex';
    });
  });
});



