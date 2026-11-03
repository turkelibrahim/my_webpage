(() => {
  const html = document.documentElement;
  const languageButtons = [...document.querySelectorAll('[data-language]')];
  const languageNodes = [...document.querySelectorAll('[data-tr][data-en]')];
  const nav = document.querySelector('.main-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const form = document.querySelector('#contact-form');
  const formFeedback = document.querySelector('#form-feedback');
  const contactEmail = 'ibrahimturkel18@gmail.com';

  const descriptions = {
    tr: 'İbrahim Türkel’in kişisel portföyü. Bilgisayar mühendisliği, yazılım geliştirme, yapay zekâ uygulamaları ve seçilmiş GitHub projeleri.',
    en: 'The personal portfolio of İbrahim Türkel. Computer engineering, software development, AI applications, and selected GitHub projects.',
  };

  const messages = {
    tr: {
      fallback: 'Form servisi yapılandırılmadı. Mesajın e-posta uygulamanda taslak olarak açılacak.',
      sending: 'Gönderiliyor…',
      sent: 'Mesaj form servisine iletildi. Teşekkürler!',
      error: 'Lütfen tüm alanları geçerli bir e-posta ile doldurunuz.',
    },
    en: {
      fallback: 'The form service is not configured. Your message will open as a draft in your email app.',
      sending: 'Sending…',
      sent: 'Your message was sent successfully. Thank you!',
      error: 'Please fill in all fields with a valid email address.',
    },
  };

  let currentLanguage = 'tr';
  try {
    const savedLanguage = localStorage.getItem('portfolio-language');
    if (savedLanguage === 'en' || savedLanguage === 'tr') currentLanguage = savedLanguage;
  } catch {
    // Storage fallback
  }

  // -------------------------------------------------------------
  // Theme Management (Warm Editorial Light <-> Cyber AI Dark)
  // -------------------------------------------------------------
  let currentTheme = 'light';
  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      currentTheme = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      currentTheme = 'dark';
    }
  } catch {
    // Storage fallback
  }

  function setTheme(theme) {
    currentTheme = theme;
    html.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç');
      const lightIcon = themeToggle.querySelector('.theme-icon-light');
      const darkIcon = themeToggle.querySelector('.theme-icon-dark');
      if (lightIcon && darkIcon) {
        if (theme === 'dark') {
          lightIcon.classList.add('hidden');
          darkIcon.classList.remove('hidden');
        } else {
          lightIcon.classList.remove('hidden');
          darkIcon.classList.add('hidden');
        }
      }
    }
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Ignore
    }
  }

  setTheme(currentTheme);
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
  }

  // -------------------------------------------------------------
  // Language Management
  // -------------------------------------------------------------
  function setLanguage(language) {
    if (!['tr', 'en'].includes(language)) return;
    currentLanguage = language;
    html.lang = language;
    document.title = language === 'tr'
      ? 'İbrahim Türkel | AI Developer & Bilgisayar Mühendisliği'
      : 'İbrahim Türkel | AI Developer & Computer Engineering';

    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = descriptions[language];

    languageNodes.forEach((node) => {
      node.textContent = node.getAttribute(`data-${language}`) || node.textContent;
    });

    languageButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });

    const mainNav = document.querySelector('.main-nav');
    if (mainNav) mainNav.setAttribute('aria-label', language === 'tr' ? 'Ana gezinme' : 'Main navigation');
    if (menuToggle) {
      menuToggle.setAttribute('aria-label', nav?.classList.contains('is-open')
        ? (language === 'tr' ? 'Menüyü kapat' : 'Close menu')
        : (language === 'tr' ? 'Menüyü aç' : 'Open menu'));
    }

    try { localStorage.setItem('portfolio-language', language); } catch {}
    if (formFeedback && formFeedback.dataset.state === 'fallback') formFeedback.textContent = messages[language].fallback;
    if (formFeedback && formFeedback.dataset.state === 'error') formFeedback.textContent = messages[language].error;
    if (formFeedback && formFeedback.dataset.state === 'sent') formFeedback.textContent = messages[language].sent;

    const cvLinks = [...document.querySelectorAll('.cv-download-link')];
    cvLinks.forEach((link) => {
      const targetHref = language === 'en'
        ? (link.dataset.enHref || '/Ibrahim_Turkel_en_CV.pdf?v=6.5')
        : (link.dataset.trHref || '/Ibrahim_Turkel_tr_CV.pdf?v=6.5');
      link.setAttribute('href', targetHref);
    });

    const activeId = document.querySelector('.main-nav a.active')?.getAttribute('href')?.slice(1) || 'home';
    setActiveSection(activeId);
  }

  languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));

  document.querySelectorAll('.cv-download-link').forEach((link) => {
    link.addEventListener('click', () => {
      const targetHref = currentLanguage === 'en'
        ? (link.dataset.enHref || '/Ibrahim_Turkel_en_CV.pdf?v=6.5')
        : (link.dataset.trHref || '/Ibrahim_Turkel_tr_CV.pdf?v=6.5');
      link.setAttribute('href', targetHref);
    });
  });

  // -------------------------------------------------------------
  // Mobile Menu
  // -------------------------------------------------------------
  if (menuToggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', currentLanguage === 'tr' ? 'Menüyü aç' : 'Open menu');
    };
    menuToggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open
        ? (currentLanguage === 'tr' ? 'Menüyü kapat' : 'Close menu')
        : (currentLanguage === 'tr' ? 'Menüyü aç' : 'Open menu'));
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  }

  // -------------------------------------------------------------
  // Project Filtering
  // -------------------------------------------------------------
  const projectFilters = [...document.querySelectorAll('[data-project-filter]')];
  const projectCards = [...document.querySelectorAll('.project-card[data-category]')];
  projectFilters.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.projectFilter;
      projectFilters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
    });
  });

  // -------------------------------------------------------------
  // Certificate Filtering (SAS, BTK, Turkcell, Udemy)
  // -------------------------------------------------------------
  const certFilters = [...document.querySelectorAll('[data-cert-filter]')];
  const certCards = [...document.querySelectorAll('.cert-card[data-issuer]')];
  certFilters.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.certFilter;
      certFilters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      certCards.forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.issuer !== filter;
      });
    });
  });

  // -------------------------------------------------------------
  // Intersection Observer for Reveal Animations
  // -------------------------------------------------------------
  html.classList.add('js-ready');
  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // -------------------------------------------------------------
  // Scroll Progress & Active Section Spy
  // -------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const progressFill = document.querySelector('.progress-fill');
  const progressLabel = document.querySelector('.progress-label');
  const sections = [...document.querySelectorAll('main > section[id]')];
  const navLinks = [...(nav?.querySelectorAll('a[href^="#"]') || [])];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sectionNames = {
    home: { tr: '01 · Ana Sayfa', en: '01 · Home' },
    about: { tr: '02 · Hakkımda', en: '02 · About' },
    projects: { tr: '03 · Projeler', en: '03 · Projects' },
    skills: { tr: '04 · Yetkinlikler', en: '04 · Skills' },
    certificates: { tr: '05 · Sertifikalar', en: '05 · Certificates' },
    experience: { tr: '06 · Deneyim', en: '06 · Experience' },
    contact: { tr: '07 · İletişim', en: '07 · Contact' },
  };

  function setActiveSection(id) {
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (progressLabel && sectionNames[id]) {
      progressLabel.textContent = sectionNames[id][currentLanguage] || sectionNames[id].tr;
    }
  }

  function scrollToSection(target, behavior = 'smooth') {
    if (!target) return;
    const headerHeight = header?.getBoundingClientRect().height || 72;
    const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - headerHeight - 14);
    window.scrollTo({ top, behavior: reducedMotion ? 'auto' : behavior });
    setActiveSection(target.id);
  }

  function updateScrollState() {
    const marker = (header?.getBoundingClientRect().height || 72) + 40;
    let current = sections[0]?.id || 'home';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) current = section.id;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5) {
      current = sections.at(-1)?.id || current;
    }
    setActiveSection(current);

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 0;
    if (progressFill) progressFill.style.width = `${progress}%`;
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateScrollState();
      scrollTicking = false;
    });
  }, { passive: true });
  window.addEventListener('resize', updateScrollState, { passive: true });

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      const hash = `#${target.id}`;
      if (window.location.hash !== hash) history.pushState({ section: target.id }, '', hash);
      scrollToSection(target);
      nav?.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  function restoreHashTarget() {
    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target) scrollToSection(target, 'auto');
    updateScrollState();
  }
  window.addEventListener('popstate', restoreHashTarget);
  window.addEventListener('hashchange', restoreHashTarget);
  if (window.location.hash) requestAnimationFrame(() => requestAnimationFrame(restoreHashTarget));
  updateScrollState();

  // -------------------------------------------------------------
  // Form Submission Handling
  // -------------------------------------------------------------
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const endpoint = String(window.PORTFOLIO_CONTACT_ENDPOINT || '').trim();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const subject = String(data.get('subject') || '').trim();
      const message = String(data.get('message') || '').trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || !email || !subject || !message || !emailPattern.test(email)) {
        formFeedback.textContent = messages[currentLanguage].error;
        formFeedback.dataset.state = 'error';
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      const submitLabel = submitButton?.querySelector('[data-tr][data-en]');
      const originalLabel = submitLabel?.textContent || '';
      if (submitButton) submitButton.disabled = true;

      // Validate endpoint URL protocol if provided
      let isSafeEndpoint = false;
      if (endpoint) {
        try {
          const parsed = new URL(endpoint, window.location.origin);
          isSafeEndpoint = parsed.protocol === 'https:' || parsed.protocol === 'http:';
        } catch {
          isSafeEndpoint = false;
        }
      }

      if (!endpoint || !isSafeEndpoint) {
        const body = `${currentLanguage === 'tr' ? 'Ad Soyad' : 'Name'}: ${name}\n${currentLanguage === 'tr' ? 'E-posta' : 'Email'}: ${email}\n${currentLanguage === 'tr' ? 'Konu' : 'Subject'}: ${subject}\n\n${currentLanguage === 'tr' ? 'Mesaj' : 'Message'}:\n${message}`;
        const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        formFeedback.textContent = messages[currentLanguage].fallback;
        formFeedback.dataset.state = 'fallback';
        window.location.href = mailto;
        if (submitButton) submitButton.disabled = false;
        if (submitLabel) submitLabel.textContent = originalLabel;
        return;
      }

      if (submitLabel) submitLabel.textContent = messages[currentLanguage].sending;
      formFeedback.textContent = '';
      formFeedback.removeAttribute('data-state');

      try {
        data.append('_subject', `Portfolio contact: ${subject}`);
        const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);
        form.reset();
        formFeedback.textContent = messages[currentLanguage].sent;
        formFeedback.dataset.state = 'sent';
      } catch {
        formFeedback.textContent = messages[currentLanguage].error;
        formFeedback.dataset.state = 'error';
      } finally {
        if (submitButton) submitButton.disabled = false;
        if (submitLabel) submitLabel.textContent = originalLabel;
      }
    });
  }

  const copyEmailBtn = document.querySelector('.copy-email-btn');
  const toast = document.querySelector('#toast');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-message');
    if (msgEl) msgEl.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(contactEmail);
        showToast(currentLanguage === 'tr' ? 'E-posta panoya kopyalandı!' : 'Email copied to clipboard!');
      } catch {
        showToast(contactEmail);
      }
    });
  }

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();

  setLanguage(currentLanguage);
})();
