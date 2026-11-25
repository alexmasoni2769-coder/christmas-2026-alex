/* =========================================================
   Liste de Noël d'Alex — logique du site
   ========================================================= */

const intro = document.getElementById("intro");
const liste = document.getElementById("liste");
const video = document.getElementById("santa-video");
const startScreen = document.getElementById("intro-start");
const playBtn = document.getElementById("play-btn");
const skipBtn = document.getElementById("skip-btn");
const muteBtn = document.getElementById("mute-btn");
const replayBtn = document.getElementById("replay-btn");

/* ---------- Intro vidéo ---------- */

// Si la vidéo est absente ou illisible, on garde l'écran d'accueil
// mais le bouton « Écouter » mène directement à la liste.
let videoOk = true;
video.addEventListener("error", () => (videoOk = false), true);

// Aperçu flouté en fond tant qu'on n'a pas cliqué (muet, sans son)
video.muted = true;
video.play().catch(() => {});
video.addEventListener("timeupdate", function previewLoop() {
  if (!intro.classList.contains("is-playing") && video.currentTime > 2.5) {
    video.currentTime = 0;
  }
});

playBtn.addEventListener("click", async () => {
  if (!videoOk) return showList();
  video.currentTime = 0;
  video.muted = false;
  intro.classList.add("is-playing");
  startScreen.classList.add("is-hidden");
  muteBtn.hidden = false;
  try {
    await video.play();
  } catch {
    // Lecture avec son refusée : on tente en muet
    video.muted = true;
    muteBtn.textContent = "🔇";
    video.play().catch(showList);
  }
});

muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? "🔇" : "🔊";
  muteBtn.setAttribute("aria-label", video.muted ? "Activer le son" : "Couper le son");
});

video.addEventListener("ended", () => {
  if (intro.classList.contains("is-playing")) setTimeout(showList, 600);
});

skipBtn.addEventListener("click", showList);

function showList() {
  video.pause();
  intro.classList.add("is-leaving");
  setTimeout(() => {
    intro.hidden = true;
    intro.classList.remove("is-leaving", "is-playing");
    liste.hidden = false;
    window.scrollTo(0, 0);
    requestAnimationFrame(() => liste.classList.add("is-visible"));
    startSnow();
  }, 700);
}

replayBtn.addEventListener("click", () => {
  liste.classList.remove("is-visible");
  liste.hidden = true;
  intro.hidden = false;
  startScreen.classList.remove("is-hidden");
  muteBtn.hidden = true;
  muteBtn.textContent = "🔊";
  video.muted = true;
  video.currentTime = 0;
  video.play().catch(() => {});
  window.scrollTo(0, 0);
});

/* ---------- Rendu des cadeaux ---------- */

const grid = document.getElementById("grid");

const formatPrix = (p) =>
  p == null || p === ""
    ? "Prix libre"
    : new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(p);

const ENVIES = {
  1: { label: "Sympa", stars: "★" },
  2: { label: "J'aimerais bien", stars: "★★" },
  3: { label: "J'en rêve", stars: "★★★" },
};

const escapeHtml = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function carte(c, i) {
  const envie = ENVIES[c.envie] || ENVIES[1];
  const image = c.image
    ? `<img src="${escapeHtml(c.image)}" alt="${escapeHtml(c.nom)}" loading="lazy" />`
    : `<div class="card__placeholder" aria-hidden="true">🎁</div>`;
  const lien = c.lien
    ? `<a class="btn btn--small" href="${escapeHtml(c.lien)}" target="_blank" rel="noopener">Voir l'article ↗</a>`
    : "";

  return `
    <article class="card ${c.envie === 3 ? "card--top" : ""}" style="--i:${i}">
      <div class="card__media">
        ${image}
        <span class="card__badge" title="${envie.label}">${envie.stars} ${envie.label}</span>
      </div>
      <div class="card__body">
        <h2 class="card__title">${escapeHtml(c.nom)}</h2>
        ${c.description ? `<p class="card__desc">${escapeHtml(c.description)}</p>` : ""}
        <div class="card__footer">
          <div class="card__pricing">
            ${c.prixAvant ? `<s class="card__old">${formatPrix(c.prixAvant)}</s>` : ""}
            <span class="card__price ${c.prixTexte ? "card__price--text" : ""}">${escapeHtml(c.prixTexte || formatPrix(c.prix))}</span>
          </div>
          ${lien}
        </div>
        ${c.note ? `<p class="card__note">🎁 ${escapeHtml(c.note)}</p>` : ""}
      </div>
    </article>`;
}

function render() {
  grid.innerHTML = CADEAUX.length
    ? CADEAUX.map(carte).join("")
    : `<p class="empty">La liste arrive bientôt 🎄</p>`;
}

render();

/* ---------- Neige ---------- */

let snowStarted = false;
function startSnow() {
  if (snowStarted || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  snowStarted = true;
  const canvas = document.getElementById("snow");
  const ctx = canvas.getContext("2d");
  let w, h, flakes;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(140, Math.floor(w / 10));
    flakes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.4 + 0.6,
      s: Math.random() * 0.6 + 0.25,
      d: Math.random() * Math.PI * 2,
    }));
  }
  resize();
  window.addEventListener("resize", resize);

  (function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255, 250, 240, 0.85)";
    for (const f of flakes) {
      f.y += f.s;
      f.d += 0.01;
      f.x += Math.sin(f.d) * 0.35;
      if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  })();
}
