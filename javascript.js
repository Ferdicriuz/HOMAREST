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
    selectedType = btn.dataset.type;
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

submitCare.addEventListener("click", () => {
  const email = document.getElementById("careEmail").value.trim();
  const message = document.getElementById("careMessage").value.trim();

  if (!email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const subject = selectedType === "Complain" ? "Customer Complain" : "Customer Review";
  const body = `From: ${email}\n\n${message}`;

  // Open default email app with prefilled details
  const mailto = `mailto:homagrills@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  // Reset form
  document.getElementById("careEmail").value = "";
  document.getElementById("careMessage").value = "";
  careForm.classList.add("hidden");

  // ✅ Resume blinking after submit
  careBtn.style.animation = "blinkPulse 1.5s infinite";
});
