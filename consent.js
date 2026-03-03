// consent.js – saavutettava cookie banner, Clarity lataus, asetusten muutos
(function () {
  const CLARITY_PROJECT_ID = "j2w7qgk6xg"; // Varmista, että tämä on oikea ID
  const CONSENT_KEY = "clarityConsent";

  // Tietosuojaselosteen sisältö (Tyylitelty versio)
  const PRIVACY_TEXT = `
    <div class="privacy-header">
      <h2>Tietosuojaseloste</h2>
    </div>
    
    <div class="privacy-content-body">
      <div class="privacy-section">
        <h3>Rekisterinpitäjä</h3>
        <p>
          Jan Nässi<br>
          <a href="mailto:jan.nassi@outlook.com">jan.nassi@outlook.com</a><br>
          <a href="https://nasjan.github.io/public_portfolio/" target="_blank">https://nasjan.github.io/public_portfolio/</a>
        </p>
      </div>

      <div class="privacy-section">
        <h3>Mitä tietoja kerätään</h3>
        <p>Sivusto käyttää Microsoft Clarity -analytiikkaa. Palvelu kerää anonymisoitua tietoa sivuston käytöstä, kuten sivulatauksia, klikkauksia, vierityksiä, selaintietoja ja osittain anonymisoidun IP-osoitteen.</p>
      </div>

      <div class="privacy-section">
        <h3>Käyttötarkoitus</h3>
        <p>Tietoja käytetään sivuston käytön analysointiin ja käyttäjäkokemuksen kehittämiseen.</p>
      </div>

      <div class="privacy-section">
        <h3>Oikeusperuste</h3>
        <p>Tietojen käsittely perustuu käyttäjän suostumukseen.</p>
      </div>

      <div class="privacy-section">
        <h3>Tietojen luovutus</h3>
        <p>Tietoja käsittelee Microsoft Clarity -palvelun tarjoaja. Dataa voidaan siirtää EU/ETA-alueen ulkopuolelle palveluntarjoajan infrastruktuurin mukaisesti.</p>
      </div>

      <div class="privacy-section">
        <h3>Säilytysaika</h3>
        <p>Tietoja säilytetään analytiikkapalvelun oletusasetusten mukaisesti.</p>
      </div>

      <div class="privacy-section">
        <h3>Oikeutesi</h3>
        <p>Voit peruuttaa suostumuksesi milloin tahansa evästeasetuksista.</p>
      </div>
    </div>
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

  // UUSI: Tyylitelty tietosuojamodaali (X-nappi piilotettu mobiilissa)
  function showPrivacyModal() {
    if (document.getElementById("privacy-modal")) return;
    
    // Luodaan tyylit dynaamisesti tätä modaalia varten
    const modalStyles = `
      <style>
        /* --- MODAALIN TAUSTA JA ASETTELU --- */
        #privacy-modal {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px);
          z-index: 10000; 
          /* Flexbox keskittää modaalin täydellisesti pysty- ja vaakasuunnassa */
          display: flex; justify-content: center; align-items: center;
          padding: 20px; box-sizing: border-box;
        }

        /* --- KORTTI --- */
        .privacy-card {
          background: #fff; 
          max-width: 600px; width: 100%; 
          /* Desktop: max-height 85vh jättää nätit reunat ylös ja alas */
          max-height: 85vh;
          border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          display: flex; flex-direction: column; overflow: hidden;
          position: relative; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        /* --- HEADER --- */
        .privacy-header {
          /* Desktop: Tilaa oikealla X-napille */
          padding: 1.5rem 3.5rem 1rem 2rem; 
          border-bottom: 1px solid #eee;
          background: #fafafa;
        }
        .privacy-header h2 { margin: 0; font-size: 1.5rem; color: #111; }

        /* --- SISÄLTÖ --- */
        .privacy-content-body {
          padding: 2rem; overflow-y: auto; color: #444; line-height: 1.6;
        }
        .privacy-section { margin-bottom: 1.5rem; }
        .privacy-section:last-child { margin-bottom: 0; }
        .privacy-section h3 {
          font-size: 1rem; text-transform: uppercase; letter-spacing: 0.5px;
          color: #008282; margin: 0 0 0.5rem 0; font-weight: 700;
        }
        .privacy-section p { margin: 0; font-size: 0.95rem; }
        .privacy-section a { color: #008282; text-decoration: underline; }
        .privacy-section a:hover { text-decoration: none; }
        
        /* --- X-NAPPI (DESKTOP) --- */
        .close-icon-btn {
          position: absolute; top: 1rem; right: 1rem; background: transparent;
          border: none; font-size: 2rem; line-height: 1; color: #888;
          cursor: pointer; transition: color 0.2s; width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center; border-radius: 50%;
          z-index: 10;
        }
        .close-icon-btn:hover { color: #111; background: rgba(0,0,0,0.05); }
        
        /* --- FOOTER --- */
        .privacy-footer {
          padding: 1rem 2rem; border-top: 1px solid #eee; background: #fafafa;
          display: flex; justify-content: center; /* Keskittää "Sulje"-napin */
        }
        #privacy-close-bottom {
          padding: 0.6rem 1.5rem; background: #008282; color: #fff;
          border: none; border-radius: 6px; cursor: pointer;
          font-weight: 600; font-size: 0.95rem; transition: background 0.2s;
        }
        #privacy-close-bottom:hover { background: #006666; }

        /* --- MEDIA QUERY MOBIILILLE (alle 670px) --- */
        @media (max-width: 670px) {
          .privacy-card {
            width: 90%; 
            /* Mobiili: 80vh varmistaa että kortti "kelluu" keskellä, 
               eikä osu ylä- tai alareunaan */
            max-height: 80vh; 
          }
          
          /* Piilota X-nappi mobiilissa */
          .close-icon-btn {
            display: none;
          }

          .privacy-header {
            /* Tasainen padding, koska X-nappi on poissa */
            padding: 1rem 1.5rem 0.5rem 1.5rem;
            text-align: center;
          }
          
          .privacy-header h2 {
            font-size: 1.1rem; 
            line-height: 1.3;
          }
          .privacy-content-body {
            padding: 1rem;
          }
          /* Pienennetään fontteja mobiilissa */
          .privacy-section h3 { font-size: 0.8rem; }
          .privacy-section p { font-size: 0.85rem; }
          
          #privacy-close-bottom {
            padding: 0.5rem 1.2rem; font-size: 0.85rem;
          }
          .privacy-footer {
            padding: 0.8rem 1.5rem;
          }
        }
      </style>
    `;

    const modal = document.createElement("div");
    modal.id = "privacy-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Tietosuojaseloste");

    modal.innerHTML = `
      ${modalStyles}
      <div class="privacy-card">
        <button id="privacy-close" class="close-icon-btn" aria-label="Sulje">&times;</button>
        ${PRIVACY_TEXT}
        <div class="privacy-footer">
          <button id="privacy-close-bottom">Sulje</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    
    const closeBtnTop = modal.querySelector("#privacy-close");
    const closeBtnBottom = modal.querySelector("#privacy-close-bottom");
    
    // Fokusointi (jos top-nappi piilotettu, fokusoidaan silti siihen tai modaaliin, 
    // mutta mobiilissa käyttäjä selaa luonnollisesti)
    if (getComputedStyle(closeBtnTop).display !== 'none') {
        closeBtnTop.focus();
    } else {
        closeBtnBottom.focus();
    }
    
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

    // Lisätään tyylit bannerille, jos niitä ei vielä ole
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

    // Estä fokuksen karkaaminen taustalle
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
        // Sulje ESC:llä vain jos avattu footerista
        if (window.__cookie_settings_focus) {
          removeBanner();
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
    btn.onclick = function (e) {
      e.preventDefault(); // Estä sivun hyppääminen ylös
      window.__cookie_settings_focus = true;
      showBanner(false); 
      // Siirrä fokus bannerin "Hyväksy" -nappiin
      setTimeout(() => {
        const accept = document.getElementById("cookie-accept");
        if(accept) accept.focus();
      }, 50); 
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
      showBanner(true); // Ensimmäinen vierailu
    }
  });
})();