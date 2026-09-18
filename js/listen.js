// Listen page — mood data + mood picker interaction (BUILD-ROADMAP.md
// Phase 4/5). Config-driven per PROJECT-SPEC.md §7: the taxonomy can
// grow/change without rewriting this file's logic.
//
// Content status: only "dreamy" has real Figma-sourced copy (matches the
// default Turntable + Mood Detail state in the source design). The other
// 8 circles are genuinely clickable/functional, but PROJECT-SPEC.md §7
// explicitly leaves the color→mood mapping undecided and CLAUDE.md
// forbids inventing mood names/descriptions/playlists — so those entries
// carry only their confirmed swatch color, marked curated:false, until
// Sarah assigns real names/copy/tracklists.
(function () {
  var MOODS = [
    {
      id: 'dreamy',
      label: 'Dreamy',
      circle: '/assets/images/listen/light-blue-cirle.png',
      curated: true,
      tapeLabel: 'DREAMY',
      tapeClass: 'is-light-blue',
      blurb: 'For when your mind needs some room to wonder',
      description: 'Floaty, atmospheric, and transportive. These are the songs for late nights, daydreaming, and everywhere in between.',
      picks: [
        { title: 'Falling', artist: 'Julee Cruise' },
        { title: 'Closer', artist: 'You’ll Never Get To Heaven' },
        { title: 'Kisses', artist: 'Slowdive' }
      ]
    },
    { id: 'yellow', label: 'Yellow mood — not yet curated', circle: '/assets/images/listen/yellow-circle.png', curated: false, tapeClass: 'is-yellow' },
    { id: 'red', label: 'Red mood — not yet curated', circle: '/assets/images/listen/red-circle.png', curated: false, tapeClass: 'is-red' },
    { id: 'pink', label: 'Pink mood — not yet curated', circle: '/assets/images/listen/pink-circle.png', curated: false, tapeClass: 'is-pink' },
    { id: 'orange', label: 'Orange mood — not yet curated', circle: '/assets/images/listen/orange-circle.png', curated: false, tapeClass: 'is-orange' },
    { id: 'light-green', label: 'Light green mood — not yet curated', circle: '/assets/images/listen/light-green-circle.png', curated: false, tapeClass: 'is-light-green' },
    { id: 'lavender', label: 'Lavender mood — not yet curated', circle: '/assets/images/listen/lavendar-circle.png', curated: false, tapeClass: 'is-lavender' },
    { id: 'dark-blue', label: 'Dark blue mood — not yet curated', circle: '/assets/images/listen/dark-blue-circle.png', curated: false, tapeClass: 'is-dark-blue' },
    { id: 'black', label: 'Black mood — not yet curated', circle: '/assets/images/listen/black-circle.png', curated: false, tapeClass: 'is-black' }
  ];

  window.SarahtoninListenMoods = MOODS;

  function getMood(id) {
    for (var i = 0; i < MOODS.length; i++) {
      if (MOODS[i].id === id) return MOODS[i];
    }
    return null;
  }
  window.SarahtoninGetMood = getMood;

  function initMoodPicker() {
    var row = document.getElementById('mood-row');
    if (!row) return;
    var buttons = Array.prototype.slice.call(row.querySelectorAll('.mood-circle'));

    function setActive(moodId) {
      buttons.forEach(function (btn) {
        var isActive = btn.dataset.moodId === moodId;
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        btn.classList.toggle('is-active', isActive);
      });
      document.dispatchEvent(new CustomEvent('listen:moodchange', { detail: { moodId: moodId } }));
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setActive(btn.dataset.moodId);
      });
    });

    var prevBtn = document.querySelector('.listen-moods__arrow--prev');
    var nextBtn = document.querySelector('.listen-moods__arrow--next');
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        row.scrollBy({ left: -240, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        row.scrollBy({ left: 240, behavior: 'smooth' });
      });
    }
  }

  // Provisional swatch colors for the tape label on uncurated moods —
  // same "provisional, not confirmed brand hex" status as the secondary
  // accents in css/tokens.css, used only until Sarah assigns real
  // per-mood color values.
  var TAPE_COLORS = {
    dreamy: null, // uses the confirmed --color-powder-blue tape via CSS
    yellow: '#f0c93a',
    red: '#c0392b',
    pink: '#f0b8d0',
    orange: '#e08a3c',
    'light-green': '#9fc37c',
    lavender: '#c7b3e0',
    'dark-blue': '#2d4a9e',
    black: '#3a3a3a'
  };

  function renderTurntable(moodId) {
    var mood = getMood(moodId);
    var tape = document.getElementById('tt-tape');
    var nameEl = document.getElementById('tt-mood-name');
    var blurbEl = document.getElementById('tt-blurb');
    var descEl = document.getElementById('tt-description');
    var picksList = document.getElementById('tt-picks-list');
    if (!mood || !tape || !nameEl) return;

    nameEl.textContent = mood.curated ? mood.label : mood.label.replace(/ — not yet curated$/, '');

    var color = TAPE_COLORS[mood.id];
    tape.style.backgroundColor = color || '';

    if (mood.curated) {
      blurbEl.textContent = mood.blurb;
      descEl.textContent = mood.description;
      picksList.innerHTML = '';
      mood.picks.forEach(function (pick, i) {
        var li = document.createElement('li');
        li.className = 'tt-picks__item';
        li.style.setProperty('--tt-rotate', (i === 0 ? -12.18 : -6.99) + 'deg');
        li.textContent = pick.title + ' — ' + pick.artist;
        picksList.appendChild(li);
      });
    } else {
      blurbEl.textContent = 'This mood is still being sorted.';
      descEl.textContent = 'Sarah hasn’t curated this playlist yet — check back soon.';
      picksList.innerHTML = '';
      var li = document.createElement('li');
      li.className = 'tt-picks__item';
      li.style.setProperty('--tt-rotate', '-4deg');
      li.textContent = 'Coming soon';
      picksList.appendChild(li);
    }
  }
  window.SarahtoninRenderTurntable = renderTurntable;

  document.addEventListener('listen:moodchange', function (e) {
    renderTurntable(e.detail.moodId);
  });

  function init() {
    initMoodPicker();
    if (document.getElementById('tt-tape')) {
      renderTurntable('dreamy');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
