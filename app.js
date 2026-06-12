const calendarIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M3.5 10h17"></path></svg>';
const clockIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"></circle><path d="M12 7.5v5l3.2 2"></path></svg>';

const compositions = {
  original: [
    {
      title: 'Invasion from the Deep', year: '2023', duration: '2:26', type: 'Solo Piano',
      description: 'A dramatic, turbulent work evoking the relentless surge of dark waters rising from below — thunderous bass clusters give way to frantic, cascading runs in the upper register.',
      tags: ['Solo Piano', 'Programmatic']
    },
    {
      title: 'Waltz on the Moon', year: '2026', duration: '6:53', type: 'Solo Piano',
      description: 'A weightless, lilting waltz imagining a dance in low gravity — the melody floats with an unhurried elegance, each phrase drifting gently before settling back to earth.',
      tags: ['Solo Piano', 'Waltz']
    },
    {
      title: 'Last Stand', year: '2025', duration: '3:02', type: 'Solo Piano',
      description: 'A fierce, defiant piece built on a relentless rhythmic drive — moments of quiet resolve interrupted by surging, fortissimo outbursts that refuse to yield.',
      tags: ['Solo Piano', 'Contemporary']
    },
    {
      title: 'Nocturnal Reverie', year: '2025', duration: '5:15', type: 'Solo Piano',
      description: 'A late-night meditation drifting between wakefulness and dream — soft, luminous harmonies dissolve into one another beneath a singing, improvisatory melody.',
      tags: ['Solo Piano', 'Nocturne']
    },
    {
      title: 'Long Lost Land', year: '2024', duration: '2:30', type: 'Solo Piano',
      description: 'A sweeping, nostalgic journey through a landscape half-remembered and half-imagined — wide, open harmonies and a yearning melodic line evoking distance and longing.',
      tags: ['Solo Piano', 'Lyrical']
    }
  ],
  remix: [
    {
      title: 'Inferno', year: '2026', duration: '2:36', type: 'Solo Piano',
      description: "A fiery piano arrangement of Mrs. Green Apple's Fire Force theme, capturing the blazing intensity of the original with cascading runs and a thunderous left-hand ostinato.",
      tags: ['Mrs. Green Apple', 'Anime', 'J-Rock']
    },
    {
      title: 'Gurenge', year: '2026', duration: '4:30', type: 'Solo Piano',
      description: "LiSA's Demon Slayer opening reimagined for solo piano — the soaring vocal melody transformed into a singing cantabile line over a turbulent, storm-like accompaniment.",
      tags: ['LiSA', 'Demon Slayer', 'Anime']
    },
    {
      title: 'You Say Run', year: '2026', duration: '3:55', type: 'Solo Piano',
      description: "Yuki Hayashi's legendary My Hero Academia track arranged for piano, building from a quiet, determined opening to an overwhelming, triumphant climax.",
      tags: ['Yuki Hayashi', 'My Hero Academia', 'Anime']
    },
    {
      title: 'Boom Boom Boom Boom', year: '2025', duration: '3:45', type: 'Solo Piano',
      description: "A piano reimagining of the Vengaboys' iconic Eurodance anthem, recast as a driving, rhythmically charged solo piece that balances playful energy with harmonic richness.",
      tags: ['Vengaboys', 'Pop', 'Dance']
    },
    {
      title: 'Stargazing', year: '2025', duration: '4:05', type: 'Solo Piano',
      description: "Myles Smith's introspective indie ballad reinterpreted for solo piano — sparse, luminous, and unhurried, with the melody floating above a gentle, open-voiced accompaniment.",
      tags: ['Myles Smith', 'Indie', 'Pop']
    },
    {
      title: '起风了 (Qi Feng Le)', year: '2024', duration: '5:20', type: 'Solo Piano',
      description: "A lyrical piano arrangement of Yu Takahashi and Mi Guo's beloved ballad, preserving the wistful, windswept emotion of the original through delicate voicing and expressive rubato.",
      tags: ['Yu Takahashi', 'Mi Guo', 'Chinese Pop']
    }
  ]
};

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

function renderList(kind) {
  const list = document.querySelector(`[data-list="${kind}"]`);
  list.innerHTML = compositions[kind].map((piece, index) => `
    <article class="piece">
      <div class="piece-number">${String(index + 1).padStart(2, '0')}</div>
      <div class="piece-main">
        <h2>${escapeHtml(piece.title)}</h2>
        <p class="type">${escapeHtml(piece.type)}</p>
        <p class="desc">${escapeHtml(piece.description)}</p>
        <div class="tags">${piece.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      </div>
      <div class="meta" aria-label="${escapeHtml(piece.title)} details">
        <span>${calendarIcon}${escapeHtml(piece.year)}</span>
        <span>${clockIcon}${escapeHtml(piece.duration)}</span>
      </div>
    </article>`).join('');
}

renderList('original');
renderList('remix');

document.querySelectorAll('.visible-tabs .tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.visible-tabs .tab').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
  });
});



// Add real clickable menu hotspots over each screenshot so the screenshot navigation works.
function addHotspots(section) {
  if (!section || section.querySelector('.hotspot-nav')) return;
  const nav = document.createElement('nav');
  nav.className = 'hotspot-nav';
  nav.setAttribute('aria-label', 'Screenshot navigation');
  nav.innerHTML = `
    <a class="hot-home" href="#home">Home</a>
    <a class="hot-compositions" href="#compositions">Compositions</a>
    <a class="hot-awards" href="#awards">Awards</a>
    <a class="hot-bio" href="#biography">Biographies</a>
    <a class="hot-contact" href="#contact">Contact</a>
  `;
  section.appendChild(nav);
}
document.querySelectorAll('.screenshot-section').forEach(addHotspots);

// Make all internal navigation scroll cleanly to the exact section.
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
});

// Let users click the screenshot-based slides to view the sharper full-resolution image.
const zoomOverlay = document.querySelector('.zoom-overlay');
const zoomImage = zoomOverlay ? zoomOverlay.querySelector('img') : null;
const zoomClose = document.querySelector('.zoom-close');
function closeZoom() {
  if (!zoomOverlay || !zoomImage) return;
  zoomOverlay.classList.remove('is-open');
  zoomOverlay.setAttribute('aria-hidden', 'true');
  zoomImage.removeAttribute('src');
}
document.querySelectorAll('.screenshot-section img').forEach((image) => {
  image.addEventListener('click', () => {
    if (!zoomOverlay || !zoomImage || window.matchMedia('(max-width: 760px)').matches) return;
    zoomImage.src = image.currentSrc || image.src;
    zoomImage.alt = image.alt || 'Expanded slide view';
    zoomOverlay.classList.add('is-open');
    zoomOverlay.setAttribute('aria-hidden', 'false');
  });
});
if (zoomClose) zoomClose.addEventListener('click', closeZoom);
if (zoomOverlay) zoomOverlay.addEventListener('click', (event) => {
  if (event.target === zoomOverlay || event.target === zoomImage) closeZoom();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeZoom();
});
