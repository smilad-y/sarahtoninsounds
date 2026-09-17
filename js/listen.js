// Listen page — mood selector + turntable/tracklist bridge
// (PROJECT-SPEC.md §7, BUILD-ROADMAP.md Phase 4/5).
//
// The mood selector and the turntable panel are wired together only
// through a `moodselected` CustomEvent (detail: { moodId }), dispatched
// on the track and picked up on document — not a direct function call —
// so either piece can be reworked independently later.
//
// Only mood-01 (Dreamy) has real name/tagline/description/tracklist
// content. Every other mood swaps its record image but shows the
// empty-note state instead of invented copy, per the no-filler-content
// rule (CLAUDE.md). Add real content to MOOD_DATA as it's ready — no
// HTML/CSS changes needed.
//
// Mapping notes:
//   mood-03 (red circle)        -> record-red.png
//   mood-10 (berry circle)      -> mapped to the "maroon" record file,
//                                   the only record color left with no
//                                   circle claiming it yet. ASSUMPTION,
//                                   not confirmed by Sarah.
//   mood-11 (dark-green circle) -> confirmed correct: plain "green" record.
//
// No-ops on any page without both a mood track and a turntable panel,
// so it's safe to load everywhere.

(function () {
  var ASSET_BASE = '/assets/images/listen/';

  var MOOD_DATA = {
    'mood-01': {
      recordImage: 'sarahtonin%20sounds-listen-record-light_blue.png',
      name: 'DREAMY',
      tagline: 'For when your mind needs some room to wonder',
      description: 'Floaty, atmospheric, ans transportive. These are the songs for late nights, daydreaming, and everywhere in between.',
      tracklist: [
        'Falling &ndash; Julee Cruise',
        "Closer &ndash; You'll Never Get to Heaven",
        'Kisses &ndash; Slowdive'
      ]
    },
    'mood-02': { recordImage: 'sarahtonin%20sounds-listen-record-yellow.png' },
    'mood-03': { recordImage: 'sarahtonin%20sounds-listen-record-red.png' },
    'mood-04': { recordImage: 'sarahtonin%20sounds-listen-record-pink.png' },
    'mood-05': { recordImage: 'sarahtonin%20sounds-listen-record-orange.png' },
    'mood-06': { recordImage: 'sarahtonin%20sounds-listen-record-light%20green.png' },
    'mood-07': { recordImage: 'sarahtonin%20sounds-listen-record-lavendar.png' },
    'mood-08': { recordImage: 'sarahtonin%20sounds-listen-record-dark_blue.png' },
    'mood-09': { recordImage: 'sarahtonin%20sounds-listen-record-black.png' },
    'mood-10': { recordImage: 'sarahtonin%20sounds-listen-record-maroon.png' },
    'mood-11': { recordImage: 'sarahtonin%20sounds-listen-record-green.png' },
    'mood-12': { recordImage: 'sarahtonin%20sounds-listen-record-purple.png' },
    'mood-13': { recordImage: 'sarahtonin%20sounds-listen-record-peach.png' }
  };

  var track = document.querySelector('[data-mood-track]');
  var prevBtn = document.querySelector('[data-scroll-prev]');
  var nextBtn = document.querySelector('[data-scroll-next]');
  var panel = document.querySelector('[data-mood-panel]');
  if (!track || !prevBtn || !nextBtn || !panel) return;

  var nameEl = panel.querySelector('[data-mood-name]');
  var taglineEl = panel.querySelector('[data-mood-tagline]');
  var descriptionEl = panel.querySelector('[data-mood-description]');
  var tracklistEl = panel.querySelector('[data-tracklist]');
  var imageEl = panel.querySelector('[data-turntable-image]');
  var emptyNoteEl = panel.querySelector('[data-mood-empty-note]');
  var contentEls = panel.querySelectorAll('[data-mood-content]');

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function scrollStep() {
    var circle = track.querySelector('.mood-circle');
    return (circle ? circle.offsetWidth : 111) * 3;
  }

  function updateArrowStates() {
    var maxScroll = track.scrollWidth - track.clientWidth;
    prevBtn.disabled = track.scrollLeft <= 0;
    nextBtn.disabled = track.scrollLeft >= maxScroll - 1;
  }

  function scrollByAmount(amount) {
    track.scrollBy({ left: amount, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }

  prevBtn.addEventListener('click', function () {
    scrollByAmount(-scrollStep());
  });
  nextBtn.addEventListener('click', function () {
    scrollByAmount(scrollStep());
  });
  track.addEventListener('scroll', updateArrowStates);
  window.addEventListener('resize', updateArrowStates);

  track.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollByAmount(scrollStep());
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollByAmount(-scrollStep());
    }
  });

  function selectMood(button) {
    var circles = track.querySelectorAll('.mood-circle');
    for (var i = 0; i < circles.length; i++) {
      circles[i].setAttribute('aria-pressed', 'false');
    }
    button.setAttribute('aria-pressed', 'true');

    track.dispatchEvent(new CustomEvent('moodselected', {
      bubbles: true,
      detail: { moodId: button.dataset.moodId }
    }));
  }

  track.addEventListener('click', function (event) {
    var button = event.target.closest('.mood-circle');
    if (!button) return;
    selectMood(button);
  });

  function updateTurntable(moodId) {
    var mood = MOOD_DATA[moodId];
    if (!mood) return;

    panel.dataset.moodId = moodId;

    if (mood.recordImage) {
      imageEl.src = ASSET_BASE + mood.recordImage;
      imageEl.hidden = false;
    } else {
      imageEl.hidden = true;
    }

    if (mood.name) {
      for (var i = 0; i < contentEls.length; i++) {
        contentEls[i].removeAttribute('hidden');
      }
      emptyNoteEl.setAttribute('hidden', '');
      nameEl.textContent = mood.name;
      taglineEl.textContent = mood.tagline;
      descriptionEl.innerHTML = mood.description;
      tracklistEl.innerHTML = mood.tracklist.map(function (song) {
        return '<li>' + song + '</li>';
      }).join('');
    } else {
      for (var j = 0; j < contentEls.length; j++) {
        contentEls[j].setAttribute('hidden', '');
      }
      emptyNoteEl.removeAttribute('hidden');
    }
  }

  document.addEventListener('moodselected', function (event) {
    updateTurntable(event.detail.moodId);
  });

  updateArrowStates();

  // Fire once on load so the turntable panel is driven by MOOD_DATA from
  // the start, not just the hard-coded mood-01 markup it ships with.
  var pressed = track.querySelector('.mood-circle[aria-pressed="true"]');
  if (pressed) selectMood(pressed);
})();
