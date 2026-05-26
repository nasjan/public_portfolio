/* ================================================================
   main.js
   - Mobile drawer navigation (slides from right)
   - Footer year
   - Skip-link focus (#main)
   ================================================================ */

(function () {
  /* ------------------------------------------------------------
     1) Footer year
     ------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------
     0) Language toggle
     ------------------------------------------------------------ */
  (function () {
    const STORAGE_KEY = 'portfolio-lang';
    const DEFAULT_LANG = 'en';
    const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

    function applyLang(lang) {
      document.documentElement.lang = lang;
      document.querySelectorAll('.lang-toggle').forEach(function (btn) {
        btn.textContent = lang === 'fi' ? 'EN' : 'FI';
        btn.setAttribute('aria-label', lang === 'fi' ? 'Switch to English' : 'Vaihda suomeksi');
      });
    }

    applyLang(saved);

    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const current = document.documentElement.lang;
        const next = current === 'fi' ? 'en' : 'fi';
        localStorage.setItem(STORAGE_KEY, next);
        applyLang(next);
      });
    });
  })();

  /* ------------------------------------------------------------
     2) Mobile drawer (slides from right)
     - #menu-toggle button (hamburger)
     - #mobile-drawer nav panel
     - #drawer-backdrop overlay
     - Toggles body.drawer-open, manages focus trap & Escape
     ------------------------------------------------------------ */
  const menuBtn = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');

  // Fallback: support for older vertical nav (site-nav)
  const legacyBtn = document.getElementById('nav-toggle');
  const legacyNav = document.getElementById('site-nav');

  // Focusable elements inside drawer
  const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  function openDrawer() {
    if (!menuBtn || !drawer || !backdrop) return;
    lastFocused = document.activeElement;

    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close menu');
    drawer.hidden = false;
    backdrop.hidden = false;

    // Wait a frame for display:block before animating
    requestAnimationFrame(() => {
      document.body.classList.add('drawer-open');
      document.body.style.overflow = 'hidden';
    });

    // Focus first link after transition
    setTimeout(() => {
      const first = drawer.querySelector(FOCUSABLE);
      if (first) first.focus();
    }, 200);

    document.addEventListener('keydown', onKeydown, true);
    backdrop.addEventListener('click', closeDrawer, { once: true });
    document.addEventListener('click', onDocClick, true);

    // Close drawer when clicking any link inside it
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer, { once: true });
    });
  }

  function closeDrawer() {
    if (!menuBtn || !drawer || !backdrop) return;

    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';

    // Wait for transition before hiding elements
    setTimeout(() => {
      drawer.hidden = true;
      backdrop.hidden = true;
    }, 200);

    if (lastFocused instanceof HTMLElement) {
      lastFocused.focus();
    }

    document.removeEventListener('keydown', onKeydown, true);
    document.removeEventListener('click', onDocClick, true);
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer();
      return;
    }
    if (e.key !== 'Tab') return;

    // Focus trap inside drawer
    const focusables = drawer.querySelectorAll(FOCUSABLE);
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  function onDocClick(e) {
    // Close if clicking outside drawer (backdrop handled separately)
    if (drawer && !drawer.contains(e.target) && e.target !== menuBtn) {
      closeDrawer();
    }
  }

  // Button logic
 if (menuBtn && drawer) {
  backdrop && (backdrop.hidden = true);
  drawer.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    open ? closeDrawer() : openDrawer();
  });
} else if (legacyBtn && legacyNav) {
    // ------- LEGACY NAV (dropdown in header) -------
    // Kept for backward compatibility if these IDs still exist.
    let legacyOpen = false;
    function legacyOpenMenu() {
      legacyBtn.setAttribute('aria-expanded', 'true');
      legacyNav.style.display = 'block';
      legacyOpen = true;
      document.addEventListener('keydown', legacyKeydown, true);
      document.addEventListener('click', legacyOutside, true);
    }
    function legacyCloseMenu() {
      legacyBtn.setAttribute('aria-expanded', 'false');
      legacyNav.style.display = '';
      legacyOpen = false;
      document.removeEventListener('keydown', legacyKeydown, true);
      document.removeEventListener('click', legacyOutside, true);
      legacyBtn.focus();
    }
    function legacyKeydown(e) {
      if (e.key === 'Escape' && legacyOpen) {
        e.preventDefault(); legacyCloseMenu();
      }
    }
    function legacyOutside(e) {
      if (!legacyNav.contains(e.target) && e.target !== legacyBtn) {
        legacyCloseMenu();
      }
    }
    legacyBtn.addEventListener('click', () => {
      legacyOpen ? legacyCloseMenu() : legacyOpenMenu();
    });
  }

  /* ------------------------------------------------------------
     3) Image lightbox — cs-main figures
     ------------------------------------------------------------ */
  (function () {
    var csMain = document.querySelector('.cs-main');
    if (!csMain) return;

    // Make every figure keyboard-navigable
    csMain.querySelectorAll('figure').forEach(function (figure) {
      var img = figure.querySelector('img');
      if (!img) return;
      figure.setAttribute('tabindex', '0');
      figure.setAttribute('role', 'button');
      figure.setAttribute('aria-label', 'View image larger' + (img.alt ? ': ' + img.alt : ''));
    });

    // Build overlay once
    var overlay = document.createElement('div');
    overlay.id = 'lb-overlay';
    overlay.className = 'lb-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.hidden = true;
    overlay.innerHTML =
      '<div class="lb-dialog">' +
      '<button class="lb-close" aria-label="Close image viewer">×</button>' +
      '<img class="lb-img" src="" alt="" />' +
      '<p class="lb-caption"></p>' +
      '</div>';
    document.body.appendChild(overlay);

    var lbImg     = overlay.querySelector('.lb-img');
    var lbCaption = overlay.querySelector('.lb-caption');
    var lbClose   = overlay.querySelector('.lb-close');
    var lastFocused = null;

    function openLb(figure) {
      var img = figure.querySelector('img');
      if (!img) return;
      lastFocused = figure;

      lbImg.src = img.src;
      lbImg.alt = img.alt || '';

      // Prefer current-language figcaption; fall back to full text
      var figcaption = figure.querySelector('figcaption');
      var caption = '';
      if (figcaption) {
        var lang = document.documentElement.lang || 'en';
        var span = figcaption.querySelector('.lang-' + lang);
        caption = span ? span.textContent.trim() : figcaption.textContent.trim();
      }
      lbCaption.textContent = caption;
      lbCaption.hidden = !caption;

      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () { lbClose.focus(); });
      document.addEventListener('keydown', onKey, true);
    }

    function closeLb() {
      overlay.hidden = true;
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey, true);
      if (lastFocused instanceof HTMLElement) lastFocused.focus();
    }

    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); closeLb(); }
    }

    // Click anywhere inside a figure
    csMain.addEventListener('click', function (e) {
      var figure = e.target.closest('figure');
      if (figure && figure.querySelector('img')) openLb(figure);
    });

    // Keyboard: Enter or Space on a focused figure
    csMain.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var figure = e.target.closest('figure[tabindex]');
      if (figure && figure.querySelector('img')) { e.preventDefault(); openLb(figure); }
    });

    // Backdrop click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLb();
    });

    lbClose.addEventListener('click', closeLb);
  })();

})();
