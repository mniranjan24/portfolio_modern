(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const opening = document.getElementById("opening");
  const projectModal = document.getElementById("project-modal");
  const topbar = document.getElementById("topbar");
  const replayButton = document.getElementById("replay-intro");
  const $ = (selector, root = document) => root.querySelector(selector);
  const aboutTypedText = {
    "about-quote": "“A B.Tech CS graduate and full-stack developer building AI-powered platforms and scalable SaaS with a focus on real-world impact.”",
    "type-training": "Java Full Stack",
    "type-training-sub": "MashupStack | Structured technical training",
    "type-philosophy": "I love building applications that solve practical, real-world problems."
  };
  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);

  let openingTimeline;
  let entered = false;
  let animationsReady = false;
  let currentIndex = 0;
  let lastFocusedElement = null;

  function renderHeroStack() {
    $("#hero-stack").innerHTML = data.profile.heroStack
      .map((technology) => `<li>${escapeHTML(technology)}</li>`).join("");
  }

  function renderAbout() {
    $("#about-eyebrow").textContent = "The Pilot";
    Object.entries(aboutTypedText).forEach(([id, content]) => {
      document.getElementById(id).textContent = content;
    });
    if (reduceMotion || !window.gsap || !window.ScrollTrigger) $("#about-quote").classList.remove("typewriter-text");
    $("#bento-stat-grad").textContent = "2026";
    $("#bento-stat-projects").textContent = data.profile.projectCount.split(" ")[0] || "3+";
    $("#bento-stat-mentoring").textContent = "3";
  }

  function renderProjects() {
    $("#project-track").innerHTML = data.projects.map((project) => `
      <button class="project-card" data-project="${escapeHTML(project.id)}" type="button"
        style="--accent:${escapeHTML(project.accent)}"
        aria-label="Open ${escapeHTML(project.title)} case study">
        <div class="project-card__image" style="background-image:url('${escapeHTML(project.image)}')">
          <span class="project-card__badge">${escapeHTML(project.badge)}</span>
          <span class="project-card__number">${escapeHTML(project.number)}</span>
        </div>
        <div class="project-card__body">
          <p>${escapeHTML(project.category)}</p>
          <h3>${escapeHTML(project.title)}</h3>
          <p class="project-card__blurb">${escapeHTML(project.blurb)}</p>
          <ul class="project-card__stack">${project.stack.map((technology) => `<li>${escapeHTML(technology)}</li>`).join("")}</ul>
          <div class="project-card__meta"><span>${escapeHTML(project.year)}</span><span>${escapeHTML(project.badge)}</span></div>
        </div>
        <span class="project-card__open" aria-hidden="true">↗</span>
      </button>
    `).join("");
  }

  function renderStack() {
    $("#stack-grid").innerHTML = data.stack.map((item) => `
      <article class="genre">
        <span class="genre__icon" aria-hidden="true">${escapeHTML(item.icon)}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p class="genre__desc">${escapeHTML(item.description)}</p>
        <ul class="genre__skills">${item.skills.map((skill) => `<li>${escapeHTML(skill)}</li>`).join("")}</ul>
      </article>
    `).join("");
  }

  function renderTechUniverse() {
    const techStack = [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Spring", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" }
    ];
    $("#magnetic-grid").innerHTML = techStack.map((tech) => `
      <div class="magnetic-anchor">
        <div class="magnetic-item">
          <img src="${escapeHTML(tech.icon)}" alt="${escapeHTML(tech.name)}" loading="lazy" decoding="async" />
          <span aria-hidden="true">${escapeHTML(tech.name)}</span>
        </div>
      </div>
    `).join("");
  }

  function renderJourney() {
    $("#journey-rail").innerHTML = data.journey.map((item) => `
      <article class="journey-card">
        <p class="journey-card__year">${escapeHTML(item.year)}</p>
        <h3>${escapeHTML(item.title)}</h3>
        <p class="journey-card__org">${escapeHTML(item.org)}</p>
        <p class="journey-card__desc">${escapeHTML(item.description)}</p>
      </article>
    `).join("");
  }

  function wireProfile() {
    // 1. Update Resume Links
    ["resume-link", "resume-hero", "finale-resume"].forEach((id) => {
      const link = document.getElementById(id);
      link.href = data.profile.resumeUrl;
      link.setAttribute("download", "Arya_Anand_Resume.pdf"); // Force download
      link.setAttribute("target", "_blank"); // Fallback to open in new tab if browser blocks download
    });

    // 2. Update Email Link
    $("#finale-email").href = `mailto:${data.profile.email}`;

    // 3. Update Images
    $(".hero__portrait").style.backgroundImage = `url('${data.profile.portrait}')`;
    $(".opening__portrait-image").style.backgroundImage = `url('${data.profile.portrait}')`;

    // 4. Inject Names and Initials dynamically
    const initials = data.profile.firstName.substring(0, 1).toUpperCase() +
                     (data.profile.name.split(" ")[1] ? data.profile.name.split(" ")[1].substring(0, 1).toUpperCase() : "");

    if ($("#brand-name")) $("#brand-name").textContent = data.profile.firstName;
    if ($("#opening-initials")) $("#opening-initials").textContent = initials;
    if ($("#opening-name")) $("#opening-name").textContent = data.profile.name;
    if ($("#opening-title")) $("#opening-title").textContent = data.profile.title;
    if ($("#hero-kicker-name")) $("#hero-kicker-name").textContent = `${data.profile.name}+`;

    // 5. Inject Metadata
    if ($("#hero-meta-exp")) $("#hero-meta-exp").textContent = data.profile.yearsExperience;
    if ($("#hero-meta-projects")) $("#hero-meta-projects").textContent = data.profile.projectCount;
    if ($("#hero-meta-loc")) $("#hero-meta-loc").textContent = data.profile.location.split(",")[0]; // Just the city

    // 6. Update Page Titles
    if ($("#page-title")) $("#page-title").textContent = `${data.profile.name} — ${data.profile.title}`;
    if ($("#og-title")) $("#og-title").setAttribute("content", `${data.profile.name} — ${data.profile.title}`);

    // Social Links
    if ($("#social-github") && data.profile.socials.github) {
      $("#social-github").href = data.profile.socials.github;
    }
    if ($("#social-linkedin") && data.profile.socials.linkedin) {
      $("#social-linkedin").href = data.profile.socials.linkedin;
    }
  }

  function preloadImages(urls, timeout = 3000) {
    const list = urls.filter(Boolean);
    if (!list.length) return Promise.resolve();
    return Promise.race([
      Promise.all(list.map((url) => new Promise((resolve) => {
        const image = new Image();
        image.onload = image.onerror = resolve;
        image.src = url;
      }))),
      new Promise((resolve) => setTimeout(resolve, timeout))
    ]);
  }

  function createParticles() {
    if (reduceMotion) return;
    $("#particles").innerHTML = Array.from({ length: 24 }, (_, index) => {
      const x = (index * 37) % 100;
      const y = (index * 53) % 100;
      const size = 1 + (index % 3);
      const delay = (index % 7) * -0.9;
      return `<i style="--x:${x}%;--y:${y}%;--size:${size}px;--delay:${delay}s"></i>`;
    }).join("");
  }

  function finishEntry() {
    opening.hidden = true;
    document.body.classList.remove("is-locked");
    try { localStorage.setItem("portfolio:entered", "1"); } catch (_) { /* Storage may be unavailable. */ }
    replayButton.hidden = false;
    setupGSAP();
    requestAnimationFrame(() => {
      window.ScrollTrigger?.refresh();
      document.getElementById("hero-title")?.focus({ preventScroll: true });
    });
  }

  function enterSite() {
    if (entered) return;
    entered = true;
    if (openingTimeline) openingTimeline.kill();
    if (window.gsap) gsap.set(".opening__frame", { clearProps: "all" });
    if (reduceMotion || !window.gsap || Number(gsap.getProperty(opening, "opacity")) <= 0.01) {
      finishEntry();
      return;
    }
    gsap.to("#opening", { autoAlpha: 0, duration: 0.6, onComplete: finishEntry });
  }

  function runOpening() {
    if (reduceMotion || !window.gsap) {
      enterSite();
      return;
    }
    const urls = [data.profile.portrait, ...data.projects.map((project) => project.image)];
    openingTimeline = gsap.timeline({ defaults: { ease: "power3.inOut" }, onComplete: enterSite });
    openingTimeline
      .set(".opening__frame", { autoAlpha: 0 })
      .to(".opening__studio", { autoAlpha: 1, duration: 0.45 }, 0)
      .from(".opening__studio span", { scale: 0.65, duration: 0.45, ease: "back.out(1.6)" }, 0)
      .to(".opening__studio", { autoAlpha: 0, duration: 0.35 }, 1)
      .to(".opening__portrait", { autoAlpha: 1, duration: 0.35 }, 1.2)
      .from(".opening__portrait-image", { scale: 1.12, opacity: 0, filter: "sepia(0.2) saturate(1.2) brightness(1.1)", duration: 1.2, ease: "power2.out" }, 1.2)
      .to(".opening__portrait-scan", { opacity: 0.6, duration: 0.5 }, 1.6)
      .from(".opening__portrait p", { opacity: 0, y: 20, duration: 0.6 }, 1.6)
      .to(".opening__portrait", { autoAlpha: 0, duration: 0.35 }, 3.0)
      .to(".opening__title", { autoAlpha: 1, duration: 0.35 }, 3.1)
      .from(".opening__title h1", { scale: 0.92, letterSpacing: "0.2em", duration: 0.9, ease: "power3.out" }, 3.1)
      .to(".opening__title", { autoAlpha: 0, duration: 0.35 }, 4.8)
      .addPause("+=0.2", () => {
        preloadImages(urls).then(() => {
          if (!entered && openingTimeline) openingTimeline.play();
        });
      })
      .to("#opening", { autoAlpha: 0, duration: 0.8, ease: "power2.inOut" })
      .from(".reveal-inner", {
        y: 100, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power4.out"
      }, "-=0.5");
  }

  function setupMagneticButtons() {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".button").forEach((button) => {
      button.addEventListener("mousemove", (event) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2 - Number(gsap.getProperty(button, "x"));
        const centerY = rect.top + rect.height / 2 - Number(gsap.getProperty(button, "y"));
        const x = (event.clientX - centerX) * 0.4;
        const y = (event.clientY - centerY) * 0.4;
        gsap.to(button, { x, y, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(button, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.3)", overwrite: "auto" });
      });
    });
  }

  function setupCursorGlow() {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
    const hero = document.querySelector(".hero");
    const glow = document.getElementById("cursor-glow");
    gsap.set(glow, { x: -500, y: -500 });
    hero.addEventListener("mousemove", (event) => {
      const rect = hero.getBoundingClientRect();
      gsap.to(glow, {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
    hero.addEventListener("mouseleave", () => {
      gsap.to(glow, { opacity: 0, duration: 0.4 });
    });
  }

  function populateModal(index) {
    const project = data.projects[index];
    if (!project) return;
    $("#modal-visual").style.backgroundImage = `linear-gradient(180deg,transparent 15%,rgba(0,0,0,.88)),url('${project.image}')`;
    $("#modal-kicker").textContent = `${project.category} · ${project.year}`;
    $("#modal-title").textContent = project.title;
    $("#modal-summary").textContent = project.summary;
    $("#modal-meta").innerHTML = project.tags.map((tag) => `<span>${escapeHTML(tag)}</span>`).join("");
    $("#modal-link").href = project.link;
  }

  function openProject(projectId) {
    const index = data.projects.findIndex((project) => project.id === projectId);
    if (index < 0) return;
    currentIndex = index;
    lastFocusedElement = document.activeElement;
    populateModal(currentIndex);
    projectModal.showModal();
    document.body.classList.add("is-locked");
    if (!reduceMotion && window.gsap) {
      gsap.fromTo(".project-modal__panel", { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
    }
    $("#modal-close").focus();
  }

  function navigateProject(direction) {
    if (!projectModal.open || !data.projects.length) return;
    currentIndex = (currentIndex + direction + data.projects.length) % data.projects.length;
    if (reduceMotion || !window.gsap) {
      populateModal(currentIndex);
      return;
    }
    gsap.killTweensOf(".project-modal__content, .project-modal__visual");
    gsap.to(".project-modal__content, .project-modal__visual", {
      opacity: 0, duration: 0.2, onComplete: () => {
        populateModal(currentIndex);
        gsap.to(".project-modal__content, .project-modal__visual", { opacity: 1, duration: 0.2 });
      }
    });
  }

  function closeDialog(dialog, panelSelector) {
    if (!dialog.open) return;
    if (reduceMotion || !window.gsap) dialog.close();
    else gsap.to(panelSelector, { scale: 0.94, opacity: 0, duration: 0.25, ease: "power2.in", onComplete: () => dialog.close() });
  }

  function setupInteractions() {
    opening.addEventListener("click", enterSite, { once: true });
    replayButton.addEventListener("click", () => {
      try { localStorage.removeItem("portfolio:entered"); } catch (_) { /* Storage may be unavailable. */ }
      location.reload();
    });
    $("#project-track").addEventListener("click", (event) => {
      const card = event.target.closest(".project-card");
      if (card) openProject(card.dataset.project);
    });
    $("#modal-close").addEventListener("click", () => closeDialog(projectModal, ".project-modal__panel"));
    projectModal.addEventListener("click", (event) => {
      if (event.target === projectModal) closeDialog(projectModal, ".project-modal__panel");
    });
    projectModal.addEventListener("close", () => {
      document.body.classList.remove("is-locked");
      lastFocusedElement?.focus();
      if (window.gsap) gsap.set(".project-modal__panel, .project-modal__content, .project-modal__visual", { clearProps: "transform,opacity,visibility" });
    });
    projectModal.querySelector("[data-nav='prev']").addEventListener("click", () => navigateProject(-1));
    projectModal.querySelector("[data-nav='next']").addEventListener("click", () => navigateProject(1));
    projectModal.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        navigateProject(event.key === "ArrowLeft" ? -1 : 1);
      }
    });

    const magneticGrid = document.getElementById("magnetic-grid");
    if (magneticGrid && window.gsap && !reduceMotion && !window.matchMedia("(pointer: coarse)").matches) {
      const items = magneticGrid.querySelectorAll(".magnetic-item");
      const resetItem = (item) => {
        if (!item.dataset.magneticActive) return;
        delete item.dataset.magneticActive;
        // Floating runs on the parent anchor, so the pointer offset can return to zero.
        gsap.to(item, {
          x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)", overwrite: "auto"
        });
      };
      magneticGrid.addEventListener("mousemove", (event) => {
        items.forEach((item) => {
          if (!item.classList.contains("is-ready")) return;
          const rect = item.getBoundingClientRect();
          const itemX = rect.left + rect.width / 2 - Number(gsap.getProperty(item, "x"));
          const itemY = rect.top + rect.height / 2 - Number(gsap.getProperty(item, "y"));
          const distance = Math.hypot(event.clientX - itemX, event.clientY - itemY);
          if (distance < 150) {
            item.dataset.magneticActive = "1";
            gsap.to(item, {
              x: (event.clientX - itemX) * 0.4,
              y: (event.clientY - itemY) * 0.4,
              duration: 0.4, ease: "power2.out", overwrite: "auto"
            });
          } else {
            resetItem(item);
          }
        });
      });
      magneticGrid.addEventListener("mouseleave", () => items.forEach(resetItem));
    }

    // Tech Stack Hover Spread
    const stackGrid = document.getElementById("stack-grid");
    if (stackGrid && window.gsap && !reduceMotion && !window.matchMedia("(pointer: coarse)").matches) {
      const cards = gsap.utils.toArray(".genre");
      stackGrid.addEventListener("mousemove", (e) => {
        const rect = stackGrid.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const cardX = cardRect.left - rect.left + cardRect.width / 2;
          const cardY = cardRect.top - rect.top + cardRect.height / 2;
          const dist = Math.hypot(x - cardX, y - cardY);

          if (dist < 300) {
            const factor = (300 - dist) / 300;
            gsap.to(card, {
              scale: 1 + (factor * 0.05),
              rotationX: -(y - cardY) * 0.05,
              rotationY: (x - cardX) * 0.05,
              zIndex: 10,
              boxShadow: "0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(229,9,20,0.3)",
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto"
            });
          } else {
            gsap.to(card, {
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              zIndex: 1,
              boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0)",
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto"
            });
          }
        });
      });

      stackGrid.addEventListener("mouseleave", () => {
        cards.forEach((card) => {
          gsap.to(card, {
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            zIndex: 1,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0)",
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto"
          });
        });
      });
    }

    if (window.gsap && !reduceMotion && !window.matchMedia("(pointer: coarse)").matches) {
      document.querySelectorAll(".journey-card").forEach((card) => {
        card.addEventListener("mousemove", (event) => {
          if (!card.classList.contains("is-ready")) return;
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          gsap.to(card, {
            rotationX: ((y - rect.height / 2) / rect.height) * -15,
            rotationY: ((x - rect.width / 2) / rect.width) * 15,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
        });
        card.addEventListener("mouseleave", () => {
          if (!card.classList.contains("is-ready")) return;
          gsap.to(card, {
            rotationX: 0, rotationY: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto"
          });
        });
      });
    }

    let lastY = 0;
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        topbar.classList.toggle("topbar--hidden", y > lastY && y > 160);
        topbar.classList.toggle("topbar--solid", y > 40);
        lastY = y;
        ticking = false;
      });
    }, { passive: true });
  }

  function setupGSAP() {
    if (animationsReady || !window.gsap || !window.ScrollTrigger) return;
    animationsReady = true;
    gsap.registerPlugin(ScrollTrigger);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const bar = document.getElementById("scroll-progress");
        if (bar) bar.style.width = `${self.progress * 100}%`;
      }
    });
    setupMagneticButtons();
    setupCursorGlow();
    if (reduceMotion) return;

    const marqueeTrack = document.querySelector(".marquee__track");
    if (marqueeTrack) {
      gsap.to(marqueeTrack, {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1
      });
    }

    document.querySelectorAll(".content-section").forEach((section) => {
      section.classList.add("section-reveal");
      ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        onEnter: () => section.classList.add("is-visible"),
        onLeaveBack: () => section.classList.remove("is-visible")
      });
    });

    const aboutBento = document.querySelector(".about__bento");
    const aboutSection = document.querySelector("#about");
    if (aboutBento && aboutSection) {
      const bentoCards = aboutBento.querySelectorAll(".bento-card");
      const circuitLines = aboutSection.querySelectorAll(".circuit-line");
      const circuitNodes = aboutSection.querySelectorAll(".circuit-node");

      gsap.set(bentoCards, { y: 150, opacity: 0, rotationX: -30, scale: 0.9 });
      const aboutTl = gsap.timeline({
        scrollTrigger: { trigger: aboutSection, start: "top 75%", once: true }
      });

      aboutTl
        .to(circuitLines, {
          strokeDashoffset: 0, duration: 1.5, stagger: 0.2, ease: "power2.inOut"
        }, 0)
        .fromTo(circuitNodes,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(2)" },
          0.5
        )
        .to(bentoCards, {
          y: 0, opacity: 1, rotationX: 0, scale: 1,
          duration: 0.8, stagger: 0.1, ease: "power4.out",
          clearProps: "transform,opacity",
          onComplete: () => bentoCards.forEach((card) => card.classList.add("is-loaded"))
        }, "-=0.5")
        .add(() => {
          const typeText = (id, text, delay = 0) => {
            const element = document.getElementById(id);
            if (!element) return;
            const typing = { length: 0 };
            gsap.to(typing, {
              length: text.length,
              duration: text.length * 0.02,
              delay,
              ease: "none",
              snap: { length: 1 },
              onStart: () => {
                element.textContent = "";
                element.classList.add("typewriter-text");
              },
              onUpdate: () => { element.textContent = text.slice(0, typing.length); },
              onComplete: () => element.classList.remove("typewriter-text")
            });
          };
          typeText("about-quote", aboutTypedText["about-quote"]);
          typeText("type-training", aboutTypedText["type-training"], 0.5);
          typeText("type-training-sub", aboutTypedText["type-training-sub"], 1);
          typeText("type-philosophy", aboutTypedText["type-philosophy"], 1.5);
        }, "-=0.5");
    }

    const techUniverse = document.querySelector(".tech-universe");
    const techItems = gsap.utils.toArray(".magnetic-item");
    if (techUniverse && techItems.length) {
      gsap.set(techItems, { y: 100, opacity: 0, rotationX: -45, scale: 0.8 });
      ScrollTrigger.create({
        trigger: techUniverse,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(techItems, {
            y: 0, opacity: 1, rotationX: 0, scale: 1,
            duration: 1, stagger: 0.05, ease: "back.out(1.5)",
            clearProps: "transform,opacity",
            onComplete: () => {
              techItems.forEach((item, index) => {
                item.classList.add("is-ready");
                gsap.to(item.parentElement, {
                  y: -10,
                  duration: 2 + (index % 3) * 0.5,
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                  delay: index * 0.1
                });
              });
            }
          });
        }
      });
    }

    gsap.to(".hero__portrait-wrap", {
      yPercent: 16, scale: 1.04, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 }
    });
    gsap.to(".hero__content", {
      yPercent: 9, autoAlpha: 0.35, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "45% top", end: "bottom top", scrub: true }
    });

    const media = gsap.matchMedia();
    media.add("(min-width: 769px) and (hover: hover) and (pointer: fine)", () => {
      const track = document.getElementById("project-track");
      const getDistance = () => {
        const vp = track.parentElement.getBoundingClientRect().width;
        return Math.max(0, track.scrollWidth - vp + 64);
      };
      const horizontalTween = gsap.to(track, {
        x: () => -getDistance(), ease: "none",
        scrollTrigger: {
          trigger: "#projects", start: "top top",
          end: () => `+=${getDistance() + window.innerHeight * 2}`,
          pin: true, scrub: 0.8, invalidateOnRefresh: true
        }
      });
      document.querySelectorAll(".project-card").forEach((card, i) => {
        gsap.fromTo(card,
          { rotationY: i % 2 === 0 ? -45 : 45, x: i % 2 === 0 ? 90 : -90 },
          { rotationY: 0, x: 0, ease: "none",
            scrollTrigger: {
              trigger: card, containerAnimation: horizontalTween,
              start: "left 95%", end: "left 25%", scrub: true
            }
          }
        );
      });
    });
    media.add("(max-width: 768px), (hover: none), (pointer: coarse)", () => {
      gsap.set(".project-card", { clearProps: "transform" });
      document.querySelectorAll(".project-card").forEach((card) => {
        gsap.from(card, {
          y: 35, autoAlpha: 0, duration: 0.6,
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" }
        });
      });
    });
    // --- TECH STACK: 3D Flip-In + Chip Pop + Scan Line ---
    const stackSection = document.querySelector(".skills");
    const genreCards = gsap.utils.toArray(".genre");

    if (stackSection && genreCards.length) {
      // 1. Scanning line
      const scanLine = document.querySelector(".skills__scan");
      if (scanLine) {
        gsap.timeline({
          scrollTrigger: { trigger: stackSection, start: "top 80%", toggleActions: "play none none reverse" }
        })
        .to(scanLine, { opacity: 1, duration: 0.15 })
        .fromTo(scanLine, { top: "0%" }, { top: "100%", duration: 1.4, ease: "power2.inOut" }, 0)
        .to(scanLine, { opacity: 0, duration: 0.25 }, "-=0.2");
      }

      // 2. Main card timeline (slower + glowing border)
      const stackTl = gsap.timeline({
        scrollTrigger: { trigger: stackSection, start: "top 75%", toggleActions: "play none none reverse" }
      });

      genreCards.forEach((card, index) => {
        const cardDelay = index * 0.25; // Increased from 0.12 to 0.25 for a slower stagger

        // Card flips in
        stackTl.fromTo(card,
          { rotationX: 90, y: 80, opacity: 0, transformPerspective: 1200, transformOrigin: "top center", boxShadow: "0 0 0 rgba(229,9,20,0)" },
          {
            rotationX: 0,
            y: 0,
            opacity: 1,
            duration: 1.2, // Increased from 0.9 to 1.2
            ease: "back.out(1.2)", // Slightly less bouncy, more dramatic
            boxShadow: "0 0 30px rgba(229,9,20,0.3), 0 40px 90px rgba(0,0,0,0.44)",
            borderColor: "rgba(229,9,20,0.5)"
          },
          cardDelay
        );

        // Fade border back to normal after landing
        stackTl.to(card, {
          borderColor: "var(--line)",
          borderLeftColor: "var(--red)",
          boxShadow: "0 40px 90px rgba(0,0,0,0.44)",
          duration: 0.8,
          ease: "power2.out"
        }, cardDelay + 1.2);

        // Chips pop in
        const chips = card.querySelectorAll(".genre__skills li");
        if (chips.length) {
          stackTl.to(chips, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6, // Increased from 0.4 to 0.6
            stagger: 0.1,  // Increased from 0.06 to 0.1
            ease: "back.out(2)"
          }, cardDelay + 0.9); // Starts 900ms after card begins flipping
        }
      });
    }
    const journeySection = document.querySelector(".journey");
    const journeyCards = gsap.utils.toArray(".journey-card");
    const journeyLine = document.querySelector(".journey-line-active");
    if (journeySection && journeyCards.length && journeyLine) {
      gsap.to(journeyLine, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: journeySection,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1
        }
      });
      journeyCards.forEach((card) => {
        gsap.from(card, {
          x: -50, opacity: 0, rotationY: 15,
          transformPerspective: 1000,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "back.out(1.2)",
          onComplete: () => card.classList.add("is-ready"),
          onReverseComplete: () => card.classList.remove("is-ready"),
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
        gsap.from(card, {
          "--dot-scale": 0,
          duration: 0.4,
          delay: 0.4,
          scrollTrigger: { trigger: card, start: "top 85%" }
        });
      });
      ScrollTrigger.create({
        trigger: journeySection,
        start: "top 60%",
        once: true,
        onEnter: () => {
          journeyCards.forEach((card, index) => {
            gsap.to(card, {
              y: -8,
              duration: 2.5 + index * 0.3,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: index * 0.2
            });
          });
        }
      });
    }
    document.querySelectorAll(".section-heading").forEach((heading) => {
      const timeline = gsap.timeline({ scrollTrigger: {
        trigger: heading, start: "top 85%", toggleActions: "play none none reverse"
      } });
      const eyebrow = heading.querySelector(".eyebrow");
      const title = heading.querySelector("h2");
      const subtitle = heading.querySelector(":scope > p");
      if (eyebrow) timeline.from(eyebrow, { opacity: 0, y: 10, duration: 0.4 });
      if (title) timeline.from(title, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.2");
      if (subtitle) timeline.from(subtitle, { opacity: 0, y: 15, duration: 0.5 }, "-=0.35");
    });
  }

  function init() {
    renderHeroStack();
    renderAbout();
    renderProjects();
    renderStack();
    renderTechUniverse();
    renderJourney();
    wireProfile();
    createParticles();

    // Wrap hero title words for kinetic reveal
    const heroTitle = document.getElementById("hero-title");
    if (heroTitle && !heroTitle.dataset.revealed) {
      const words = heroTitle.innerHTML.split(" ");
      heroTitle.innerHTML = words.map(word => `<span class="reveal-word" style="display:inline-block; overflow:hidden; vertical-align:top;"><span class="reveal-inner" style="display:inline-block;">${word}</span></span>`).join(" ");
      heroTitle.dataset.revealed = "true";
    }

    setupInteractions();

    let visited = false;
    try { visited = localStorage.getItem("portfolio:entered") === "1"; } catch (_) { /* Storage may be unavailable. */ }
    if (visited) {
      entered = true;
      opening.hidden = true;
      document.body.classList.remove("is-locked");
      replayButton.hidden = false;
      setupGSAP();
      requestAnimationFrame(() => window.ScrollTrigger?.refresh());
    } else {
      document.body.classList.add("is-locked");
      runOpening();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
