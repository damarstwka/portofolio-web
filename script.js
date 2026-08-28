document.addEventListener("DOMContentLoaded", () => {
  // 0. Paksa browser mulai dari posisi paling atas saat halaman di-refresh
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  // 1. Mobile Hamburger Menu Toggle
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const icon = hamburgerBtn.querySelector("i");
      if (navMenu.classList.contains("active")) {
        icon.className = "fa-solid fa-xmark";
      } else {
        icon.className = "fa-solid fa-bars";
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburgerBtn.querySelector("i").className = "fa-solid fa-bars";
      });
    });
  }

  // 2. Buka Koordinat Presisi Google Maps saat Alamat Diklik
  const addressBox = document.getElementById("address-box");

  if (addressBox) {
    addressBox.addEventListener("click", () => {
      const mapsUrl = "https://www.google.com/maps?q=-8.047474,110.521290";
      window.open(mapsUrl, "_blank");
    });
  }

  // 3. Animasi Typing Text (Untuk elemen #typing-text)
  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
    const words = ["Informatics Engineering", "Content Creator"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }

  // 4. Animasi Muncul Saat Di-scroll (Dengan Effect Stagger)
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    const cards = section.querySelectorAll(".card, .section-title");
    cards.forEach((card, index) => {
      card.classList.add("reveal");
      card.style.transitionDelay = `${index * 0.15}s`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // 5. Scrollspy: Sorot Menu Navbar Sesuai Posisi Scroll
  const allSections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const scrollPosition = window.pageYOffset;

    allSections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  // 6. Efek 3D Tilt Interaktif pada Kartu (Saat Kursor Bergerak di Atas Kartu)
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      card.style.transform = `perspective(1000px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });

  // 7. Bayangan Navbar Otomatis Saat Di-Scroll
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.4)";
        navbar.style.borderBottomColor = "rgba(56, 189, 248, 0.2)";
      } else {
        navbar.style.boxShadow = "none";
        navbar.style.borderBottomColor = "var(--border-color)";
      }
    });
  }

  // 8. Animasi Angka Berjalan (Stats Strip Counter)
  const statValue = document.querySelectorAll(".stat-value[data-target]");

  if (statValue.length > 0) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.getAttribute("data-target"), 10);

            if (!isNaN(countTo)) {
              let currentCount = 0;
              const duration = 1500;
              const stepTime = 20;
              const steps = duration / stepTime;
              const increment = countTo / steps;

              const counter = setInterval(() => {
                currentCount += increment;
                if (currentCount >= countTo) {
                  target.innerText = countTo + "+";
                  clearInterval(counter);
                } else {
                  target.innerText = Math.floor(currentCount);
                }
              }, stepTime);
            }
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statValue.forEach((stat) => statsObserver.observe(stat));
  }

  // 9. Scroll Progress Bar
  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("scroll-progress");

    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }
  });

  // 10. Pop-Up Zoom Gambar (Prestasi & Hobi)
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".modal-close");
  const zoomableImages = document.querySelectorAll(".achievement-img-wrapper img, .hobby-img-wrapper img");

  zoomableImages.forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      if (modal && modalImg) {
        modal.classList.add("active");
        modalImg.src = img.src;
        modalImg.alt = img.alt || "Zoom Image";
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }
});