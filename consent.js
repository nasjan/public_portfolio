// consent.js – saavutettava cookie banner, Clarity lataus, asetusten muutos
(function () {
  const CLARITY_PROJECT_ID = "j2w7qgk6xg"; // Varmista, että tämä on oikea ID
  const CONSENT_KEY = "clarityConsent";

  // Tietosuojaselosteen sisältö
  const PRIVACY_TEXT = `
    <h2 style='margin-top:0'>Tietosuojaseloste</h2>
    <strong>Rekisterinpitäjä:</strong><br>
    Jan Nässi<br>
    <a href='mailto:jan.nassi@outlook.com'>jan.nassi@outlook.com</a><br>
    <a href='https://nasjan.github.io/public_portfolio/' target='_blank'>https://nasjan.github.io/public_portfolio/</a><br><br>
    <strong>Mitä tietoja kerätään</strong><br>
    Sivusto käyttää Microsoft Clarity -analytiikkaa. Palvelu kerää anonymisoitua tietoa sivuston käytöstä, kuten sivulatauksia, klikkauksia, vierityksiä, selaintietoja ja osittain anonymisoidun IP-osoitteen.<br><br>
    <strong>Käyttötarkoitus</strong><br>
    Tietoja käytetään sivuston käytön analysointiin ja käyttäjäkokemuksen kehittämiseen.<br><br>
    <strong>Oikeusperuste</strong><br>
    Tietojen käsittely perustuu käyttäjän suostumukseen.<br><br>
    <strong>Tietojen luovutus</strong><br>
    Tietoja käsittelee Microsoft Clarity -palvelun tarjoaja. Dataa voidaan siirtää EU/ETA-alueen ulkopuolelle palveluntarjoajan infrastruktuurin mukaisesti.<br><br>
    <strong>Säilytysaika</strong><br>
    Tietoja säilytetään analytiikkapalvelun oletusasetusten mukaisesti.<br><br>
    <strong>Oikeutesi</strong><br>
    Voit peruuttaa suostumuksesi milloin tahansa evästeasetuksista.
  `;

  function loadClarity() {
    if (window.__clarity_loaded) return;
    window.__clarity_loaded = true;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
    document.head.appendChild(script);
  }

  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
    if (value === "accepted") {
      loadClarity();
    }
    removeBanner();
  }

  function removeBanner() {
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.remove();
    // Palauta fokus footerin asetuspainikkeeseen, jos banneri suljettiin asetuksista
    if (window.__cookie_settings_focus) {
      const btn = document.getElementById("cookie-settings");
      if (btn) btn.focus();
      window.__cookie_settings_focus = false;
    }
  }

  function showPrivacyModal() {
    if (document.getElementById("privacy-modal")) return;
    
    const modal = document.createElement("div");
    modal.id = "privacy-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Tietosuojaseloste");
    
    // Tyylit inline-tyyleinä (tai luokkina jos CSS-tiedosto on käytössä)
    Object.assign(modal.style, {
      position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.45)", zIndex: "10000",
      display: "flex", justifyContent: "center", alignItems: "center"
    });

    modal.innerHTML = `
      <div style="background:#fff;max-width:600px;width:90vw;padding:2rem 1.5rem;border-radius:8px;box-shadow:0 2px 16px rgba(0,0,0,0.12);position:relative;display:flex;flex-direction:column;align-items:center;">
        <button id="privacy-close" aria-label="Sulje tietosuojaseloste" style="position:absolute;top:1rem;right:2.5rem;background:none;border:none;font-size:2rem;line-height:1;color:#008282;cursor:pointer;z-index:2;">&times;</button>
        <div style="overflow-y:auto;max-height:70vh;width:100%;">${PRIVACY_TEXT}</div>
        <button id="privacy-close-bottom" aria-label="Sulje tietosuojaseloste" style="margin-top:2rem;padding:0.7rem 1.5rem;background:#008282;color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:600;font-size:1rem;">Sulje</button>
      </div>
    `;

    document.body.appendChild(modal);
    
    const closeBtnTop = modal.querySelector("#privacy-close");
    const closeBtnBottom = modal.querySelector("#privacy-close-bottom");

    // Fokusointi
    closeBtnTop.focus();

    const closeModal = () => modal.remove();

    closeBtnTop.onclick = closeModal;
    closeBtnBottom.onclick = closeModal;

    // Sulje ESC:llä
    modal.addEventListener("keydown", function(e){
      if(e.key === "Escape") closeModal();
    });

    // Poista klikattaessa taustaa
    modal.onclick = function(e){
      if(e.target === modal) closeModal();
    };
  }

  function showBanner(focusFirst = true) {
    if (document.getElementById("cookie-banner")) return;

    // Lisätään tyylit, jos niitä ei vielä ole
    if (!document.getElementById("cookie-banner-style")) {
      const style = document.createElement("style");
      style.id = "cookie-banner-style";
      style.textContent = `
        #cookie-banner {
          position: fixed; left: 0; bottom: 0; width: 100%;
          background: #fffffff5; box-shadow: 0 -2px 8px rgba(0,0,0,0.08);
          z-index: 9999; display: flex; justify-content: center; align-items: center;
          padding: 4rem 1rem; opacity: 0; transform: translateY(40px);
          transition: opacity 0.25s cubic-bezier(.4,0,.2,1), transform 0.25s cubic-bezier(.4,0,.2,1);
        }
        #cookie-banner.cookie-banner--visible { opacity: 1; transform: translateY(0); }
        .cookie-banner-inner { max-width: 600px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; justify-content: center; }
        #cookie-banner-desc { font-size: 1rem; color: #222; margin-bottom: 0; text-align: center; width: 100%; }
        .cookie-banner-actions { display: flex; gap: 1rem; flex-shrink: 0; justify-content: center; }
        #cookie-accept, #cookie-reject { padding: 1rem 1.2rem; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 1rem; transition: background 0.18s, color 0.18s, box-shadow 0.18s; outline-offset: 2px; }
        #cookie-accept { background: #008282; color: #fff; }
        #cookie-accept:hover, #cookie-accept:focus-visible { background: #005e5e; color: #fff; box-shadow: 0 2px 8px rgba(0,130,130,0.10); }
        #cookie-reject { background: #eee; color: #222; }
        #cookie-reject:hover, #cookie-reject:focus-visible { background: #d2d2d2; color: #111; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        @media (max-width: 600px) { .cookie-banner-inner { gap: 1rem; } }
      `;
      document.head.appendChild(style);
    }

    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-modal", "true");
    banner.setAttribute("aria-label", "Evästeasetukset");
    banner.setAttribute("aria-describedby", "cookie-banner-desc");
    
    banner.innerHTML = `
      <div class="cookie-banner-inner">
        <span id="cookie-banner-desc">
          Tämä sivusto käyttää Microsoft Clarity -analytiikkaa sivuston käytön mittaamiseen ja kehittämiseen. 
          <a href="#" id="privacy-link" style="color:#008282;text-decoration:underline;">Lue tietosuojaseloste</a>.
        </span>
        <div class="cookie-banner-actions">
          <button id="cookie-reject" aria-label="Hylkää analytiikka">Hylkää</button>
          <button id="cookie-accept" aria-label="Hyväksy analytiikka">Hyväksy analytiikka</button>
        </div>
      </div>
    `;

    // Estä fokuksen karkaaminen taustalle (tabindex -1 ei tässä välttämätön koska on dialog, mutta ei haittaa)
    banner.setAttribute("tabindex", "-1");
    document.body.appendChild(banner);

    // Animaatio
    setTimeout(() => banner.classList.add("cookie-banner--visible"), 10);

    // Elementit
    const privacyLink = banner.querySelector("#privacy-link");
    const acceptBtn = banner.querySelector("#cookie-accept");
    const rejectBtn = banner.querySelector("#cookie-reject");

    // Linkin toiminta
    privacyLink.onclick = function(e){
      e.preventDefault();
      showPrivacyModal();
    };

    // Painikkeiden toiminta
    acceptBtn.onclick = () => setConsent("accepted");
    rejectBtn.onclick = () => setConsent("rejected");

    // --- NÄPPÄIMISTÖNAVIGAATIO (FOCUS TRAP) ---
    // KORJAUS: Lisätty privacyLink focusables-listaan, jotta tab ei jumiudu nappeihin
    const focusables = [privacyLink, rejectBtn, acceptBtn];
    
    banner.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        
        if (e.shiftKey) { // Shift+Tab
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else { // Tab
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      } else if (e.key === "Escape") {
        // Sulje ESC:llä vain jos avattu footerista (ei pakota valintaa uudelleen)
        if (window.__cookie_settings_focus) {
          removeBanner(); // Tai setConsent("none") jos haluat nollata
          window.__cookie_settings_focus = false;
        }
      }
    });

    if (focusFirst) acceptBtn.focus();
  }

  // Footerin "Muuta evästeasetuksia" -nappi
  function setupFooterSettingsButton() {
    const btn = document.getElementById("cookie-settings");
    if (!btn) return;
    btn.onclick = function () {
      // Huom: emme poista suostumusta heti, vaan vasta kun käyttäjä valitsee uuden
      window.__cookie_settings_focus = true;
      showBanner(false); // false = älä varasta fokusta heti aggressiivisesti, tai true jos haluat
      // Jos haluat fokuksen heti banneriin:
      setTimeout(() => document.getElementById("cookie-accept").focus(), 50); 
    };
  }

  // Main logic
  document.addEventListener("DOMContentLoaded", function () {
    setupFooterSettingsButton();
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === "accepted") {
      loadClarity();
    } else if (consent === "rejected") {
      // Ei tehdä mitään
    } else {
      showBanner(true); // Ensimmäinen vierailu: näytä ja fokusoi
    }
  });
})();