// Listen page — mood picker + player panel (PROJECT-SPEC.md §7).
//
// Mood metadata is a small config array, not hardcoded markup, so the
// taxonomy can keep evolving without rewriting this file (§7 requirement).
// Only "light-blue" (Dreamy) has finalized name/hook/description/tracklist
// content, straight from the approved Figma file. The other 12 colors
// (ASSET-MANIFEST.md §3: 13 circle images supplied, color→mood mapping
// "not decided") are real, clickable, keyboard-operable swatches that
// swap in their own colored-vinyl record photo but show an honest "still
// being curated" state instead of an invented mood name/description.
//
// Record-image mapping notes (colored vinyl photos supplied directly by
// Sarah at assets/images/listen/, filenames carry a literal space after
// "sarahtonin"):
//   berry circle      -> mapped to the "maroon" record, the only record
//                         color with no circle claiming it otherwise.
//                         ASSUMPTION, not confirmed by Sarah.
//   dark-green circle -> plain "green" record (confirmed correct).

(function () {
  var RECORD_BASE = '/assets/images/listen/sarahtonin%20sounds-listen-record-';

  var MOODS = [
    { id: 'light-blue', color: 'Light blue', circle: 'light-blue-cirle.png', record: 'light_blue.png', ready: true,
      name: 'Dreamy',
      hook: 'For when your mind needs some room to wonder',
      desc: 'Floaty, atmospheric, and transportive. These are the songs for late nights, daydreaming, and everywhere in between.',
      tracklist: ['Falling — Julee Cruise', 'Closer — You’ll Never Get to Heaven', 'Kisses — Slowdive'] },
    { id: 'yellow', color: 'Yellow', circle: 'yellow-circle.png', record: 'yellow.png', ready: false },
    { id: 'red', color: 'Red', circle: 'red-circle.png', record: 'red.png', ready: false },
    { id: 'pink', color: 'Pink', circle: 'pink-circle.png', record: 'pink.png', ready: false },
    { id: 'orange', color: 'Orange', circle: 'orange-circle.png', record: 'orange.png', ready: false },
    { id: 'light-green', color: 'Light green', circle: 'light-green-circle.png', record: 'light%20green.png', ready: false },
    { id: 'lavender', color: 'Lavender', circle: 'lavendar-circle.png', record: 'lavendar.png', ready: false },
    { id: 'dark-blue', color: 'Dark blue', circle: 'dark-blue-circle.png', record: 'dark_blue.png', ready: false },
    { id: 'black', color: 'Black', circle: 'black-circle.png', record: 'black.png', ready: false },
    { id: 'berry', color: 'Berry', circle: 'berry-circle.png', record: 'maroon.png', ready: false },
    { id: 'dark-green', color: 'Dark green', circle: 'dark-green-circle.png', record: 'green.png', ready: false },
    { id: 'purple', color: 'Purple', circle: 'purple-circle.png', record: 'purple.png', ready: false },
    { id: 'peach', color: 'Peach', circle: 'peach-cirlcle.png', record: 'peach.png', ready: false }
  ];

  var CURATED_MESSAGE = 'This mood is still being curated — check back soon.';

  function renderMoodButtons(track) {
    MOODS.forEach(function (mood) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lst-moods__circle';
      btn.style.backgroundImage = "url('/assets/images/listen/" + mood.circle + "')";
      btn.setAttribute('role', 'listitem');
      btn.setAttribute('aria-pressed', mood.id === 'light-blue' ? 'true' : 'false');
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
    var recordImg = document.getElementById('lst-mood-record-img');

    playerEl.classList.toggle('lst-player--curated', !mood.ready);
    nameEl.textContent = mood.ready ? mood.name : mood.color;
    recordImg.src = RECORD_BASE + mood.record;
    recordImg.alt = 'Turntable playing a ' + mood.color.toLowerCase() + ' record' + (mood.ready ? ' for the ' + mood.name + ' mood' : '');

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
