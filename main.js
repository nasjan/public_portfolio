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
     3) Skip-link: if URL is #main, focus the main element
     ------------------------------------------------------------ */
  const main = document.getElementById('main');
  if (main && window.location.hash === '#main') {
    // Ensure main is focusable
    if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
    main.focus();
  }
})();
