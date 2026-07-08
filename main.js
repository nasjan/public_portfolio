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
      document.querySelectorAll('.drawer-lang__pill').forEach(function (btn) {
        var isActive = btn.getAttribute('data-lang') === lang;
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
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

    document.querySelectorAll('.drawer-lang__pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang');
        localStorage.setItem(STORAGE_KEY, lang);
        applyLang(lang);
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
     3) Carousels — cs-carousel
     ------------------------------------------------------------ */
  (function () {
    document.querySelectorAll('.cs-carousel').forEach(function (carousel) {
      var slides = Array.from(carousel.querySelectorAll('.cs-carousel__slide'));
      if (slides.length < 2) return;

      var prevBtn = carousel.querySelector('.cs-carousel__nav--prev');
      var nextBtn = carousel.querySelector('.cs-carousel__nav--next');
      var current = 0;

      function show(index) {
        slides[current].classList.remove('cs-carousel__slide--active');
        slides[current].setAttribute('aria-hidden', 'true');
        current = index;
        slides[current].classList.add('cs-carousel__slide--active');
        slides[current].setAttribute('aria-hidden', 'false');
        if (prevBtn) prevBtn.hidden = current === 0;
        if (nextBtn) nextBtn.hidden = current === slides.length - 1;
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          if (current > 0) show(current - 1);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          if (current < slides.length - 1) show(current + 1);
        });
      }

      // Touch swipe on the carousel itself
      var touchStartX = 0;
      var touchStartY = 0;
      var touchMoved  = false;
      carousel.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchMoved  = false;
      }, { passive: true });
      carousel.addEventListener('touchmove', function () {
        touchMoved = true;
      }, { passive: true });
      carousel.addEventListener('touchend', function (e) {
        if (!touchMoved) return;
        var dx = e.changedTouches[0].clientX - touchStartX;
        var dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;
        if (dx < 0 && current < slides.length - 1) show(current + 1);
        if (dx > 0 && current > 0) show(current - 1);
      }, { passive: true });
    });
  })();

  /* ------------------------------------------------------------
     4) Image lightbox — cs-main figures (carousel nav + swipe)
     ------------------------------------------------------------ */
  (function () {
    var csMain = document.querySelector('.cs-main');
    if (!csMain) return;

    csMain.querySelectorAll('figure').forEach(function (figure) {
      var img = figure.querySelector('img');
      if (!img) return;
      figure.setAttribute('tabindex', '0');
      figure.setAttribute('role', 'button');
      figure.setAttribute('aria-label', 'View image larger' + (img.alt ? ': ' + img.alt : ''));
    });

    var overlay = document.createElement('div');
    overlay.id = 'lb-overlay';
    overlay.className = 'lb-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.hidden = true;
    overlay.innerHTML =
      '<button class="lb-nav lb-nav--prev" aria-label="Previous image / Edellinen kuva" hidden>' +
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3l-5 5 5 5"/></svg>' +
      '</button>' +
      '<div class="lb-dialog">' +
      '<button class="lb-close" aria-label="Close image viewer">×</button>' +
      '<img class="lb-img" src="" alt="" />' +
      '<p class="lb-caption"></p>' +
      '</div>' +
      '<button class="lb-nav lb-nav--next" aria-label="Next image / Seuraava kuva" hidden>' +
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>' +
      '</button>';
    document.body.appendChild(overlay);

    var lbImg     = overlay.querySelector('.lb-img');
    var lbCaption = overlay.querySelector('.lb-caption');
    var lbClose   = overlay.querySelector('.lb-close');
    var lbPrev    = overlay.querySelector('.lb-nav--prev');
    var lbNext    = overlay.querySelector('.lb-nav--next');
    var lastFocused = null;
    var lbFigures = [];
    var lbIndex   = 0;

    function collectFigures(figure) {
      var slide = figure.closest('.cs-carousel__slide');
      if (!slide) return [figure];
      var track = slide.closest('.cs-carousel__track');
      if (!track) return [figure];
      var figures = [];
      track.querySelectorAll('.cs-carousel__slide').forEach(function (s) {
        var f = s.querySelector('figure');
        if (f && f.querySelector('img')) figures.push(f);
      });
      return figures.length ? figures : [figure];
    }

    function showAt(index) {
      var figure = lbFigures[index];
      var img = figure.querySelector('img');
      lbImg.src = img ? img.src : '';
      lbImg.alt = img ? (img.alt || '') : '';
      var figcaption = figure.querySelector('figcaption');
      var caption = '';
      if (figcaption) {
        var lang = document.documentElement.lang || 'en';
        var span = figcaption.querySelector('.lang-' + lang);
        caption = span ? span.textContent.trim() : figcaption.textContent.trim();
      }
      lbCaption.textContent = caption;
      lbCaption.hidden = !caption;
      lbIndex = index;
      lbPrev.hidden = lbFigures.length < 2 || index === 0;
      lbNext.hidden = lbFigures.length < 2 || index === lbFigures.length - 1;
    }

    function openLb(figure) {
      if (!figure.querySelector('img')) return;
      lastFocused = figure;
      lbFigures = collectFigures(figure);
      lbIndex = lbFigures.indexOf(figure);
      if (lbIndex < 0) lbIndex = 0;
      showAt(lbIndex);
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () { lbClose.focus(); });
      document.addEventListener('keydown', onKey, true);
    }

    function closeLb() {
      overlay.hidden = true;
      document.body.style.overflow = '';
      lbFigures = [];
      document.removeEventListener('keydown', onKey, true);
      if (lastFocused instanceof HTMLElement) lastFocused.focus();
    }

    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); closeLb(); return; }
      if (e.key === 'ArrowLeft'  && lbIndex > 0)                       { e.preventDefault(); showAt(lbIndex - 1); return; }
      if (e.key === 'ArrowRight' && lbIndex < lbFigures.length - 1)    { e.preventDefault(); showAt(lbIndex + 1); }
    }

    csMain.addEventListener('click', function (e) {
      var figure = e.target.closest('figure');
      if (figure && figure.querySelector('img')) openLb(figure);
    });

    csMain.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var figure = e.target.closest('figure[tabindex]');
      if (figure && figure.querySelector('img')) { e.preventDefault(); openLb(figure); }
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLb();
    });

    lbClose.addEventListener('click', closeLb);

    lbPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      if (lbIndex > 0) showAt(lbIndex - 1);
    });

    lbNext.addEventListener('click', function (e) {
      e.stopPropagation();
      if (lbIndex < lbFigures.length - 1) showAt(lbIndex + 1);
    });

    // Touch swipe
    var swipeX = 0;
    var swipeY = 0;
    overlay.addEventListener('touchstart', function (e) {
      swipeX = e.touches[0].clientX;
      swipeY = e.touches[0].clientY;
    }, { passive: true });
    overlay.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - swipeX;
      var dy = e.changedTouches[0].clientY - swipeY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx < 0 && lbIndex < lbFigures.length - 1) showAt(lbIndex + 1);
        if (dx > 0 && lbIndex > 0) showAt(lbIndex - 1);
      }
    }, { passive: true });

  })();

})();
