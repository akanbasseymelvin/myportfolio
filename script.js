document.addEventListener("DOMContentLoaded", () => {
  const taglines = document.querySelectorAll(".tagline-box .tagline");
  let i = 0;

  setInterval(() => {
    taglines[i].classList.remove("active");
    i = (i + 1) % taglines.length;
    taglines[i].classList.add("active");
  }, 3000); // change every 2.5s
});
// --- Hero Animation on Load ---
const heroElement = document.getElementById("hero");

// Animate hero once on page load
window.addEventListener("load", () => {
  heroElement.classList.add("show");
});

// --- Scroll-Triggered Animations ---
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      // Stop observing once shown (prevents reanimation on scroll-up)
      observer.unobserve(entry.target);
    }
  });
});

// Observe all .hidden elements except the hero
const scrollHiddenElements = document.querySelectorAll(".hidden");
scrollHiddenElements.forEach((el) => {
  if (el !== heroElement) {
    observer.observe(el);
  }
});


const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("overlay");

function toggleMenu() {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");
}

hamburger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

// Close nav when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
  });
});

// ==================== CERTIFICATE MODAL ====================
const modal = document.getElementById("certificate-modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeModal = document.querySelector(".close");

// Open modal when image is clicked
document.querySelectorAll(".certificate-img").forEach((img) => {
  img.addEventListener("click", () => {
    modal.classList.add("active");
    modalImg.src = img.src;
    captionText.textContent = img.alt;
  });
});

// Close modal when X or outside clicked
closeModal.addEventListener("click", () => modal.classList.remove("active"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});

// ==================== CONFIGURATION ====================
const CONFIG = {
  email: "akanbasseymelvin@gmail.com",
};

// ==================== SMOOTH SCROLL NAVIGATION ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Analytics hook
        console.log("Navigation:", href);
      }
    }
  });
});

// ==================== SKILLS ANIMATION ====================
const observerOptions = {
  threshold: 0.5,
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll(".skill-progress");
      progressBars.forEach((bar) => {
        const width = bar.dataset.width;
        bar.style.width = width + "%";
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".skill-category").forEach((category) => {
  skillObserver.observe(category);
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

// Form validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateForm() {
  let isValid = true;
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // Reset errors
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error");
  });

  // Validate name
  if (!name.value.trim()) {
    name.closest(".form-group").classList.add("error");
    isValid = false;
  }

  // Validate email
  if (!email.value.trim() || !validateEmail(email.value)) {
    email.closest(".form-group").classList.add("error");
    isValid = false;
  }

  // Validate message
  if (!message.value.trim()) {
    message.closest(".form-group").classList.add("error");
    isValid = false;
  }

  return isValid;
}

// Form submission (demo only - no actual network call)
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = this.querySelector('button[type="submit"]');
  if (submitBtn.disabled) return;

  if (validateForm()) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    setTimeout(() => {
      formSuccess.classList.add("show");
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";

      console.log("Form submitted successfully");

      setTimeout(() => {
        formSuccess.classList.remove("show");
      }, 5000);
    }, 1500);
  }
});

// ==================== EMAIL COPY FUNCTION ====================
function copyEmail() {
  const email = CONFIG.email;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        alert("Email copied to clipboard!");
        console.log("Email copied:", email);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        fallbackCopyEmail(email);
      });
  } else {
    fallbackCopyEmail(email);
  }
}

function fallbackCopyEmail(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand("copy");
    alert("Email copied to clipboard!");
    console.log("Email copied:", text);
  } catch (err) {
    console.error("Failed to copy:", err);
    alert("Failed to copy email. Please copy manually: " + text);
  }

  document.body.removeChild(textArea);
}

// ==================== FOOTER YEAR ====================
document.getElementById("currentYear").textContent = new Date().getFullYear();

// ==================== INITIALIZATION ====================
console.log("Portfolio initialized");
console.log("Ready for customization - see HTML comments for instructions");
