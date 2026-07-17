document.addEventListener("DOMContentLoaded", () => {
  // Roles Typing Effect
  const roles = ["AI/ML Enthusiast", "Full-Stack Developer"];
  const roleElement = document.getElementById("typing-role");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      charIndex--;
      roleElement.textContent = currentRole.substring(0, charIndex);
      typingSpeed = 50;
    } else {
      charIndex++;
      roleElement.textContent = currentRole.substring(0, charIndex);
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before starting next word
    }

    setTimeout(type, typingSpeed);
  }

  if (roleElement) {
    roleElement.style.animation = 'blink-caret .75s step-end infinite';
    type();
  }

  // Theme Toggler
  const themeToggleBtn = document.querySelector(".theme-toggle");
  const body = document.body;

  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

  // Initialize theme from localStorage if available
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-theme");
    if (themeToggleBtn) themeToggleBtn.innerHTML = sunIcon;
  } else {
    if (themeToggleBtn) themeToggleBtn.innerHTML = moonIcon;
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("light-theme");
      const isLight = body.classList.contains("light-theme");
      themeToggleBtn.innerHTML = isLight ? sunIcon : moonIcon;
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }

  // Scroll to explore UI fade out on scroll
  const scrollExplore = document.querySelector(".scroll-explore");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      scrollExplore?.classList.add("fade-out");
    } else {
      scrollExplore?.classList.remove("fade-out");
    }
  });

  // Academic & Achievements Tabs Toggle
  const toggleTabs = document.querySelectorAll(".toggle-tab");
  const tabPanes = document.querySelectorAll(".tab-pane");

  toggleTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      toggleTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      tabPanes.forEach(pane => pane.classList.remove("active"));
      const targetPane = document.getElementById(tab.dataset.target);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });

  // Expandable Experience Cards Toggle
  const expCards = document.querySelectorAll(".exp-card-expandable");
  
  expCards.forEach(card => {
    card.addEventListener("click", (e) => {
      // If clicking inside links or the expanded details content, do not toggle
      if (e.target.closest("a") || e.target.closest(".exp-content-expanded")) return;
      
      const isExpanded = card.classList.contains("expanded");
      
      // Close other cards first for a clean accordion effect
      expCards.forEach(c => {
        if (c !== card) {
          c.classList.remove("expanded");
          const indicatorText = c.querySelector(".exp-toggle-indicator span");
          if (indicatorText) indicatorText.textContent = "Click to see details";
        }
      });
      
      card.classList.toggle("expanded");
      const indicatorText = card.querySelector(".exp-toggle-indicator span");
      if (indicatorText) {
        indicatorText.textContent = isExpanded ? "Click to see details" : "Click to collapse details";
      }
    });
  });
});
