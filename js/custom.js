"use strict";

console.log("loaded fitness_js.js");


  window.Webflow ||= [];
  window.Webflow.push(() => {
    // ==========================================
    // BODY LOADED
    // Працює на всіх сторінках
    // Додає клас loaded після завантаження DOM
    // ==========================================
    document.body.classList.add("loaded");

    // =========================
    // NAV MENU
    // Працює на всіх сторінках
    // =========================
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const targetId = this.dataset.target;
        const currentPage = document.title.trim().toLowerCase();

        // Якщо data-target немає, нічого не робимо
        if (!targetId) return;
        e.preventDefault();

        // Якщо клік по About, переходимо на окрему сторінку about
        if (targetId === "about") {
          setTimeout(() => {
            window.location.href = "about.html";
          }, 500);
        } else if (currentPage !== "fitness" && targetId !== "about") {
          // Якщо ми НЕ на головній сторінці,
          // переходимо на home + потрібний якір
          setTimeout(() => {
            window.location.href = `index.html#${targetId}`;
          }, 500);
        } else {
          // Якщо ми на головній сторінці,
          // робимо плавну прокрутку до секції без переходу
          e.preventDefault();

          const targetEl = document.getElementById(targetId);

          if (targetEl && targetId !== "about") {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });

    // ==========================================
    // CONTACTS CARD HOVER
    // Працює тільки на сторінці Home
    // ==========================================
    if (document.body.classList.contains("home")) {
      const cards = document.querySelectorAll(".contacts-card");

      cards.forEach((card) => {
        const textItems = card.querySelectorAll(".card-heading");

        // Плавна анімація фону картки
        card.style.transition = "background-color 0.3s ease";

        // Плавна анімація кольору тексту
        textItems.forEach((item) => {
          item.style.transition = "color 0.3s ease";
        });

        // Наведення курсора
        card.addEventListener("mouseenter", () => {
          card.style.backgroundColor = "#b60d20";

          textItems.forEach((item) => {
            item.style.color = "#000000";
          });
        });

        // Вихід курсора
        card.addEventListener("mouseleave", () => {
          card.style.backgroundColor = "";

          textItems.forEach((item) => {
            item.style.color = "";
          });
        });
      });
    }

    // ==========================================
    // ПЛАВНА ПРОКРУТКА ПО HASH
    // Працює тільки на сторінці About
    // ==========================================
    if (document.body.classList.contains("about")) {
      const hash = window.location.hash;

      // Якщо в URL є якір, наприклад #team
      if (hash) {
        const target = document.querySelector(hash);

        // Якщо елемент знайдено, плавно прокручуємо до нього
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }
      }
    }
  });


// Static portfolio export: keep the original form layout without hosted submissions.
window.Webflow.push(() => {
  const form = document.getElementById('email-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    document.getElementById('demo-form-notice').textContent =
      'Demo only — your information has not been sent or saved.';
  });
});
