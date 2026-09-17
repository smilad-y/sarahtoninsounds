// Listen page — mood picker + player panel (PROJECT-SPEC.md §7).
//
// Mood metadata is a small config array, not hardcoded markup, so the
// taxonomy can keep evolving without rewriting this file (§7 requirement).
// Only "dreamy" has finalized content (mood name, descriptor copy, Sarah's
// Picks tracklist) straight from the approved Figma file. The other eight
// colors it also defines (ASSET-MANIFEST.md §3: 13 circle images supplied,
// color→mood mapping "not decided") are real, clickable, keyboard-operable
// swatches — clicking one shows an honest "still being curated" state
// instead of an invented mood name/description.

(function () {
  var MOODS = [
    { id: 'light-blue', color: 'Light blue', asset: '/assets/images/listen/light-blue-cirle.png', ready: true,
      name: 'Dreamy',
      hook: 'For when your mind needs some room to wonder',
      desc: 'Floaty, atmospheric, and transportive. These are the songs for late nights, daydreaming, and everywhere in between.',
      tracklist: ['Falling — Julee Cruise', 'Closer — You’ll Never Get to Heaven', 'Kisses — Slowdive'] },
    { id: 'yellow', color: 'Yellow', asset: '/assets/images/listen/yellow-circle.png', ready: false },
    { id: 'red', color: 'Red', asset: '/assets/images/listen/red-circle.png', ready: false },
    { id: 'pink', color: 'Pink', asset: '/assets/images/listen/pink-circle.png', ready: false },
    { id: 'orange', color: 'Orange', asset: '/assets/images/listen/orange-circle.png', ready: false },
    { id: 'light-green', color: 'Light green', asset: '/assets/images/listen/light-green-circle.png', ready: false },
    { id: 'lavender', color: 'Lavender', asset: '/assets/images/listen/lavendar-circle.png', ready: false },
    { id: 'dark-blue', color: 'Dark blue', asset: '/assets/images/listen/dark-blue-circle.png', ready: false },
    { id: 'black', color: 'Black', asset: '/assets/images/listen/black-circle.png', ready: false }
  ];

  var CURATED_MESSAGE = 'This mood is still being curated — check back soon.';

  function renderMoodButtons(track) {
    MOODS.forEach(function (mood) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lst-moods__circle';
      btn.style.backgroundImage = "url('" + mood.asset + "')";
      btn.setAttribute('role', 'listitem');
      btn.setAttribute('aria-pressed', mood.ready && mood.id === 'light-blue' ? 'true' : 'false');
      btn.setAttribute('aria-label', mood.ready ? mood.name : mood.color + ' mood — still being curated');
      btn.dataset.moodId = mood.id;
      track.appendChild(btn);
    });
  }

  function selectMood(mood, buttons) {
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.moodId === mood.id ? 'true' : 'false');
    });

    var nameEl = document.getElementById('lst-mood-name');
    var hookEl = document.getElementById('lst-mood-hook');
    var descEl = document.getElementById('lst-mood-desc');
    var tracklistEl = document.getElementById('lst-mood-tracklist');
    var picksEl = document.getElementById('lst-mood-picks');
    var playerEl = document.getElementById('lst-player');

    playerEl.classList.toggle('lst-player--curated', !mood.ready);
    nameEl.textContent = mood.ready ? mood.name : mood.color;

    if (mood.ready) {
      hookEl.textContent = mood.hook;
      hookEl.hidden = false;
      descEl.textContent = mood.desc;
      descEl.hidden = false;
      tracklistEl.innerHTML = '';
      mood.tracklist.forEach(function (track) {
        var li = document.createElement('li');
        li.textContent = track;
        tracklistEl.appendChild(li);
      });
      picksEl.hidden = false;
    } else {
      hookEl.hidden = true;
      descEl.textContent = CURATED_MESSAGE;
      descEl.hidden = false;
      picksEl.hidden = true;
    }
  }

  function init() {
    var track = document.getElementById('lst-mood-track');
    if (!track) return;

    renderMoodButtons(track);
    var buttons = Array.prototype.slice.call(track.querySelectorAll('.lst-moods__circle'));

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var mood = MOODS.filter(function (m) { return m.id === btn.dataset.moodId; })[0];
        if (mood) selectMood(mood, buttons);
      });
    });

    var prevBtn = document.querySelector('.lst-moods__arrow--prev');
    var nextBtn = document.querySelector('.lst-moods__arrow--next');
    if (prevBtn && nextBtn) {
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var scrollByOne = function (direction) {
        var circle = track.querySelector('.lst-moods__circle');
        var step = circle ? circle.getBoundingClientRect().width * 1.3 : 120;
        track.scrollBy({ left: direction * step, behavior: reduceMotion ? 'auto' : 'smooth' });
      };
      prevBtn.addEventListener('click', function () { scrollByOne(-1); });
      nextBtn.addEventListener('click', function () { scrollByOne(1); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
