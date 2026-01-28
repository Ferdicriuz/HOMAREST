const categories = document.querySelectorAll(".category-card");
const items = document.querySelectorAll(".items");

categories.forEach(category => {
  category.addEventListener("click", () => {
    const target = category.dataset.target;
    const targetItems = document.getElementById(target);

    const isActive = category.classList.contains("active");

    // Close everything first
    categories.forEach(c => c.classList.remove("active"));
    items.forEach(i => i.classList.remove("active"));

    // Toggle behavior
    if (!isActive) {
      category.classList.add("active");
      targetItems.classList.add("active");
    }
  });
});


const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const closeMenu = document.getElementById("closeMenu");

// Open mobile menu
hamburger.addEventListener("click", () => {
  mobileNav.classList.add("active");
  hamburger.classList.add("active"); // optional for X animation
});

// Close menu via button
closeMenu.addEventListener("click", () => {
  mobileNav.classList.remove("active");
  hamburger.classList.remove("active");
});

// Close menu when any link is clicked
mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    hamburger.classList.remove("active");
  });
});




const categoryBtns = document.querySelectorAll(".category-btn");
let autoCloseTimer = null;

categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const wrap = btn.closest(".category-wrap");
    const target = document.getElementById(btn.dataset.desc);

    // Clear any existing timer
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
    }

    // Close all others
    document.querySelectorAll(".category-wrap").forEach(w => {
      if (w !== wrap) w.classList.remove("expanded");
    });

    document.querySelectorAll(".category-info").forEach(info => {
      if (info !== target) info.classList.remove("show");
    });

    // Toggle current
    const isOpen = wrap.classList.contains("expanded");

    wrap.classList.toggle("expanded", !isOpen);
    target.classList.toggle("show", !isOpen);

    // Auto close after 10 seconds
    if (!isOpen) {
      autoCloseTimer = setTimeout(() => {
        wrap.classList.remove("expanded");
        target.classList.remove("show");
      },10000); // ⏱ 20 seconds
    }
  });
});

const closeBtns = document.querySelectorAll(".close-desc");

closeBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    // Clear timer
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
      autoCloseTimer = null;
    }

    // 🔥 CLOSE EVERYTHING
    document.querySelectorAll(".category-wrap").forEach(wrap => {
      wrap.classList.remove("expanded");
    });

    document.querySelectorAll(".category-info").forEach(info => {
      info.classList.remove("show");
    });
  });
});


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
