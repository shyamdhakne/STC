(function () {
  "use strict";

  /**
   * Contact and enquiry configuration.
   * Replace FORMSPREE_ENDPOINT if you later connect Netlify Forms / Formspree.
   * FORM_MODE: "whatsapp" | "mailto" | "formspree"
   */
  var CONFIG = {
    PHONE_E164: "919823031563",
    PHONE_DISPLAY: "+91-9823031563",
    EMAIL: "shreetrimurti_computers@rediffmail.com",
    WHATSAPP_NUMBER: "919823031563",
    FORM_MODE: "whatsapp",
    FORMSPREE_ENDPOINT: "https://formspree.io/f/YOUR_FORM_ID"
  };

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var yearEl = document.getElementById("year");
  var form = document.getElementById("enquiry");
  var statusEl = document.getElementById("form-status");
  var requirement = document.getElementById("requirement");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function closeNav() {
    document.body.classList.remove("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  }

  function openNav() {
    document.body.classList.add("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      if (document.body.classList.contains("nav-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNav();
      }
    });

    document.querySelectorAll("[data-nav-close]").forEach(function (el) {
      el.addEventListener("click", closeNav);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var id = link.getAttribute("href");
      if (!id || id === "#") {
        return;
      }
      var target = document.querySelector(id);
      if (!target) {
        return;
      }
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-enquire]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (requirement) {
        requirement.value = link.getAttribute("data-enquire") || "";
      }
    });
  });

  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".site-nav a[href^='#']");

  function updateActiveNav() {
    var current = "home";
    sections.forEach(function (section) {
      var top = section.getBoundingClientRect().top;
      if (top - 120 <= 0) {
        current = section.id;
      }
    });
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      link.classList.toggle("is-active", href === "#" + current);
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      },
      { passive: true }
    );
  }

  function encode(value) {
    return encodeURIComponent(value || "");
  }

  function buildEnquiryText(data) {
    return [
      "Hello Shree Trimurti Computers,",
      "Name: " + data.name,
      "Mobile: " + data.mobile,
      "Email: " + data.email,
      "Requirement: " + data.requirement,
      "Message: " + data.message
    ].join("\n");
  }

  function validEmail(value) {
    if (!value) {
      return true;
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = {
        name: (form.name.value || "").trim(),
        mobile: (form.mobile.value || "").trim(),
        email: (form.email.value || "").trim(),
        requirement: (form.requirement.value || "").trim(),
        message: (form.message.value || "").trim()
      };

      if (!data.name || !data.mobile || !data.requirement || !data.message) {
        statusEl.textContent = "Please fill in name, mobile, requirement, and message.";
        return;
      }

      if (!validEmail(data.email)) {
        statusEl.textContent = "Please enter a valid email address, or leave it blank.";
        return;
      }

      if (CONFIG.FORM_MODE === "formspree") {
        if (CONFIG.FORMSPREE_ENDPOINT.indexOf("YOUR_FORM_ID") !== -1) {
          statusEl.textContent = "Formspree is not configured yet. Update FORMSPREE_ENDPOINT in js/script.js.";
          return;
        }
        fetch(CONFIG.FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("Request failed");
            }
            statusEl.textContent = "Thank you. Your enquiry was sent.";
            form.reset();
          })
          .catch(function () {
            statusEl.textContent = "The form service could not be reached. Please call or use WhatsApp.";
          });
        return;
      }

      if (CONFIG.FORM_MODE === "mailto") {
        var subject = "Website enquiry: " + data.requirement;
        var body =
          "Name: " + data.name + "\n" +
          "Mobile: " + data.mobile + "\n" +
          "Email: " + data.email + "\n" +
          "Requirement: " + data.requirement + "\n" +
          "Message: " + data.message;
        window.location.href =
          "mailto:" + CONFIG.EMAIL +
          "?subject=" + encode(subject) +
          "&body=" + encode(body);
        statusEl.textContent = "Opening your email app…";
        return;
      }

      var text = buildEnquiryText(data);
      window.open("https://wa.me/" + CONFIG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      statusEl.textContent = "Opening WhatsApp with your enquiry…";
    });
  }
})();
