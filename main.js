/* ================================================================
   main.js — selkeä versio
   - Teeman vaihto (light/dark) ikonilla ja muistilla
   - Mobiilivalikko (vasemmalta liukuva drawer)
   - Vuosiluku footerissa
   - Skip-linkin fokus (#main)
   ================================================================ */

(function () {
  const root = document.documentElement;

  /* ------------------------------------------------------------
     1) VUOSILUKU (esim. footerissa elementti id="year")
     ------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------
     2) TEEMAN VAIHTO (light/dark)
        - kun käyttäjä valitsee, tallennetaan localStorageen
        - muuten seurataan järjestelmän oletusta
        - päivitämme myös aria-pressed, aria-label ja title
     ------------------------------------------------------------ */
  const THEME_KEY = 'theme';
  const themeBtn = document.getElementById('theme-toggle');

  // Palauttaa 'light' tai 'dark'
  function getInitialTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function applyTheme(mode, persist = false) {
    root.setAttribute('data-theme', mode);
    if (persist) localStorage.setItem(THEME_KEY, mode);

    // Päivitä napin tila ja vihjeet
    if (themeBtn) {
      const isDark = mode === 'dark';
      themeBtn.setAttribute('aria-pressed', String(isDark));
      const nextLabel = isDark ? 'Toggle theme: Light' : 'Toggle theme: Dark';
      themeBtn.setAttribute('aria-label', nextLabel);
      themeBtn.setAttribute('title', nextLabel);
    }
  }

  // Alustus
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme, false);

  // Jos käyttäjä EI ole tehnyt valintaa, kuunnellaan järjestelmämuutoksia
  if (!localStorage.getItem(THEME_KEY) && window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', e => applyTheme(e.matches ? 'dark' : 'light', false));
  }

  // Klikki vaihtaa teemaa ja tallentaa valinnan
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
    });
  }

  /* ------------------------------------------------------------
     3) MOBIILIVALIKKO (oikealta liukuva drawer)
        - id="menu-toggle" nappi (hampurilainen)
        - id="mobile-drawer" nav-paneeli (64px headerista alas)
        - id="drawer-backdrop" taustahäivytys (headerista alas)
        - lisää/poista body.drawer-open, hallitse focus ja Esc
     ------------------------------------------------------------ */
  const menuBtn = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');

  // Fallback: jos käytössä on vielä vanha pystysuora valikko (site-nav)
  const legacyBtn = document.getElementById('nav-toggle');
  const legacyNav = document.getElementById('site-nav');

  // Fokuskelpoiset selektorit drawerissa
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

    // Focus first link after animation
    setTimeout(() => {
      const first = drawer.querySelector(FOCUSABLE);
      if (first) first.focus();
    }, 200);

    document.addEventListener('keydown', onKeydown, true);
    backdrop.addEventListener('click', closeDrawer, { once: true });
    document.addEventListener('click', onDocClick, true);

    // Close drawer when clicking any link inside
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

    // Wait for transition before hiding
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

    // Fokusansa drawerin sisällä
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
    // Sulje, jos klikataan drawerin ulkopuolelle (ei koske taustaa, se käsitellään erikseen)
    if (drawer && !drawer.contains(e.target) && e.target !== menuBtn) {
      closeDrawer();
    }
  }

  // Nappilogikka
 if (menuBtn && drawer) {
  backdrop && (backdrop.hidden = true);
  drawer.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    open ? closeDrawer() : openDrawer();
  });
} else if (legacyBtn && legacyNav) {
    // ------- VANHA MALLI (pudotusvalikko headerissa) -------
    // Pidetään kevyt tuki, jos sivulla on vielä nämä id:t.
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
     4) SKIP-LINK: jos osoite on #main, siirrä fokus mainiin
     ------------------------------------------------------------ */
  const main = document.getElementById('main');
  if (main && window.location.hash === '#main') {
    // varmista, että main on fokuskelpoinen (tabindex), jos ei jo ole
    if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
    main.focus();
  }
})();
