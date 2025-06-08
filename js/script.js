// THEME TOGGLE

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

// CUSTOM CURSOR

const cursor = document.getElementById("cursor");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// CONTACT FORM VALIDATION + EMAILJS SENDING

const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

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

  formMessage.textContent = "Sending message...";
  formMessage.style.color = "var(--accent)";

  fetch("https://script.google.com/macros/s/AKfycbwWCY-1R6VTohoySQQ1RRhu6QpSWNg8wM3tJOXmGRipFWVBcwnbWK1cc_NCZDtNcrPBfA/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        formMessage.textContent = "Thank you for contacting me!";
        formMessage.style.color = "#00e676";
        form.reset();
      } else {
        formMessage.textContent = "Failed to send message. Please try again later.";
        formMessage.style.color = "#ff6666";
      }
    })
    .catch(() => {
      formMessage.textContent = "Failed to send message. Please check your connection.";
      formMessage.style.color = "#ff6666";
    });
});
