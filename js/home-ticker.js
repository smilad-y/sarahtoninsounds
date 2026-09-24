// Home ticker. The build renders the phrases once as a plain line
// (.hv2-ticker__line), which is what shows without JS or with reduced
// motion. With motion allowed, that line becomes screen-reader-only and
// an aria-hidden copy scrolls in a seamless loop, with a pause button.
(function () {
  var ticker = document.querySelector('[data-ticker]');
  if (!ticker) return;

  var line = ticker.querySelector('.hv2-ticker__line');
  var toggle = ticker.querySelector('.hv2-ticker__toggle');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var SEPARATOR = ' ✶ ';
  // Scroll speed, in multiples of the font size per second.
  var SPEED_EM = 2.2;
  var windowEl = null;
  var resizeTimer = null;

  function build() {
    teardown();
    if (reduceMotion.matches) return;

    ticker.classList.add('is-moving');
    windowEl = document.createElement('div');
    windowEl.className = 'hv2-ticker__window';
    windowEl.setAttribute('aria-hidden', 'true');
    var track = document.createElement('div');
    track.className = 'hv2-ticker__track';
    windowEl.appendChild(track);
    ticker.insertBefore(windowEl, line);

    // One "set" is the phrases repeated until they span the window, so
    // the loop never shows a gap; the set is then doubled and the track
    // slides by exactly half its width.
    var unit = line.textContent + SEPARATOR;
    var set = document.createElement('span');
    set.textContent = unit;
    track.appendChild(set);
    var guard = 0;
    while (set.offsetWidth < windowEl.clientWidth && guard++ < 20) {
      set.textContent += unit;
    }
    track.appendChild(set.cloneNode(true));

    var fontSize = parseFloat(getComputedStyle(ticker).fontSize) || 16;
    track.style.setProperty('--ticker-duration', (set.offsetWidth / (fontSize * SPEED_EM)) + 's');

    line.classList.add('visually-hidden');
    toggle.hidden = false;
  }

  function teardown() {
    if (windowEl) windowEl.remove();
    windowEl = null;
    line.classList.remove('visually-hidden');
    ticker.classList.remove('is-moving');
    toggle.hidden = true;
    setPaused(false);
  }

  function setPaused(paused) {
    ticker.classList.toggle('is-paused', paused);
    toggle.setAttribute('aria-label', paused ? 'Play ticker' : 'Pause ticker');
  }

  toggle.addEventListener('click', function () {
    setPaused(!ticker.classList.contains('is-paused'));
  });

  function rebuildKeepingState() {
    var paused = ticker.classList.contains('is-paused');
    build();
    if (windowEl) setPaused(paused);
  }

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(rebuildKeepingState, 200);
  });

  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener('change', build);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(build);
  } else {
    build();
  }
})();
