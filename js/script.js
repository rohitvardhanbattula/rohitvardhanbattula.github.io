// ========== THEME TOGGLE ==========
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const icon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  if (body.classList.contains("light-theme")) {
    icon.classList.replace("fa-moon", "fa-sun");
    toggleBtn.setAttribute("aria-label", "Switch to dark mode");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    toggleBtn.setAttribute("aria-label", "Switch to light mode");
  }
});

// ========== CUSTOM CURSOR ==========
const cursor = document.getElementById("cursor");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// ========== CONTACT FORM VALIDATION & EMAILJS ==========
emailjs.init("_bflkLf_B-dSqWcK4"); // Your EmailJS Public Key

const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

  // Simple Validation
  if (!data.name || !data.email || !data.message) {
    formMessage.textContent = "Please fill out all fields.";
    formMessage.style.color = "#ff6666";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email)) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.style.color = "#ff6666";
    return;
  }

  // Sending Message
  formMessage.textContent = "Sending message...";
  formMessage.style.color = "var(--accent)";
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;

  emailjs.send("service_77xngdk", "template_alo40hg", data)
    .then(() => {
      formMessage.textContent = "✅ Thank you for contacting me!";
      formMessage.style.color = "#00e676";
      form.reset();
      submitBtn.disabled = false;
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      formMessage.textContent = "❌ Failed to send message. Please try again later.";
      formMessage.style.color = "#ff6666";
      submitBtn.disabled = false;
    });
});
