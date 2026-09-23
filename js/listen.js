// Listen page: mood selector, turntable, and the "now spinning" bar.
// Everything mood-specific comes from content/listen/moods.json
// (PROJECT-SPEC.md §7), so moods can be added, renamed, reordered, or
// removed there without touching this file.
//
// Playback lives in the now spinning bar as a visible Spotify or Apple
// Music embed. Spotify's IFrame API lets the turntable act as a second
// play/pause control; Apple Music's embed exposes no control API, so
// with Apple Music selected the turntable button is hidden and playback
// happens only inside the embed.
(function () {
  var CONFIG_URL = '/content/listen/moods.json';
  // Embed heights. Both must leave the current track's title and artist
  // visible; see TODO.md "Listen — now spinning bar" for test status.
  var SPOTIFY_HEIGHT = 80;
  var APPLE_HEIGHT = 175;

  var config = null;
  var state = {
    mood: null,
    preferredSource: 'spotify',
    activeSource: null,
    isPlaying: false
  };
  var spotify = { api: null, controller: null, uri: null };

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(id) { return document.getElementById(id); }

  // Values Sarah hasn't decided (or links that don't exist yet) are
  // stored as UNDECIDED / PLACEHOLDER and render as nothing.
  function isSet(value) {
    return typeof value === 'string' && value !== '' &&
      value !== 'UNDECIDED' && value !== 'PLACEHOLDER';
  }

  function spotifyUri(mood) {
    var url = mood.spotify && mood.spotify.url;
    var match = isSet(url) && url.match(/playlist[/:]([A-Za-z0-9]+)/);
    return match ? 'spotify:playlist:' + match[1] : null;
  }

  function appleEmbedSrc(mood) {
    var url = mood.appleMusic && mood.appleMusic.url;
    if (!isSet(url) || !/^https:\/\/(embed\.)?music\.apple\.com\//.test(url)) return null;
    return url.replace('https://music.apple.com/', 'https://embed.music.apple.com/');
  }

  function hasSource(mood, source) {
    return source === 'spotify' ? Boolean(spotifyUri(mood)) : Boolean(appleEmbedSrc(mood));
  }

  function moodColor(mood) {
    return (config.labelColors && config.labelColors[mood.color]) || '';
  }

  function assetUrl(path) {
    return encodeURI(path);
  }

  function getMood(id) {
    for (var i = 0; i < config.moods.length; i++) {
      if (config.moods[i].id === id) return config.moods[i];
    }
    return null;
  }

  // ── Mood selector ──

  function renderSelector() {
    var row = $('mood-row');
    row.innerHTML = '';

    config.moods.forEach(function (mood, i) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mood-circle mood-circle--' + (mood.labelText === 'light' ? 'light' : 'dark') + '-text';
      btn.dataset.moodId = mood.id;
      btn.setAttribute('aria-pressed', 'false');
      btn.tabIndex = -1;
      btn.style.backgroundImage = "url('" + assetUrl(mood.art.circle) + "')";

      var number = document.createElement('span');
      number.className = 'mood-circle__number';
      number.textContent = String(i + 1);
      btn.appendChild(number);

      var name = document.createElement('span');
      name.className = 'mood-circle__name';
      name.textContent = mood.name;
      btn.appendChild(name);

      if (isSet(mood.descriptor)) {
        var descriptor = document.createElement('span');
        descriptor.className = 'mood-circle__descriptor';
        descriptor.textContent = mood.descriptor;
        btn.appendChild(descriptor);
      }

      li.appendChild(btn);
      row.appendChild(li);
    });
  }

  function moodButtons() {
    return Array.prototype.slice.call($('mood-row').querySelectorAll('.mood-circle'));
  }

  function initSelectorControls() {
    var row = $('mood-row');

    row.addEventListener('click', function (e) {
      var btn = e.target.closest('.mood-circle');
      if (btn) selectMood(btn.dataset.moodId);
    });

    // One tab stop for the whole row; arrow keys move between labels.
    row.addEventListener('keydown', function (e) {
      var buttons = moodButtons();
      var index = buttons.indexOf(document.activeElement);
      if (index === -1) return;
      var next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % buttons.length;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + buttons.length) % buttons.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = buttons.length - 1;
      if (next === null) return;
      e.preventDefault();
      buttons[index].tabIndex = -1;
      buttons[next].tabIndex = 0;
      buttons[next].focus();
      buttons[next].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    var prevBtn = document.querySelector('.listen-moods__arrow--prev');
    var nextBtn = document.querySelector('.listen-moods__arrow--next');
    var behavior = reduceMotion ? 'auto' : 'smooth';
    if (prevBtn) prevBtn.addEventListener('click', function () { row.scrollBy({ left: -240, behavior: behavior }); });
    if (nextBtn) nextBtn.addEventListener('click', function () { row.scrollBy({ left: 240, behavior: behavior }); });
  }

  function markSelected(moodId) {
    moodButtons().forEach(function (btn) {
      var active = btn.dataset.moodId === moodId;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('is-active', active);
      btn.tabIndex = active ? 0 : -1;
    });
  }

  // ── Turntable ──

  function renderTurntable(mood) {
    $('tt-mood-name').textContent = mood.name;
    $('tt-record-img').src = assetUrl(mood.art.vinyl);

    var tape = $('tt-tape');
    if (isSet(mood.art.tape)) {
      tape.style.backgroundImage = "url('" + assetUrl(mood.art.tape) + "')";
      tape.style.backgroundColor = '';
    } else {
      tape.style.backgroundImage = 'none';
      tape.style.backgroundColor = moodColor(mood);
    }

    [['tt-blurb', mood.blurb], ['tt-description', mood.description]].forEach(function (pair) {
      var el = $(pair[0]);
      el.textContent = isSet(pair[1]) ? pair[1] : '';
      el.hidden = !isSet(pair[1]);
    });

    var picks = mood.picks || [];
    var list = $('tt-picks-list');
    list.innerHTML = '';
    picks.forEach(function (pick, i) {
      var li = document.createElement('li');
      li.className = 'tt-picks__item';
      li.style.setProperty('--tt-rotate', (i === 0 ? -12.18 : -6.99) + 'deg');
      li.textContent = pick.title + ' — ' + pick.artist;
      list.appendChild(li);
    });
    $('tt-picks').hidden = picks.length === 0;
  }

  function setPlaying(playing) {
    state.isPlaying = Boolean(playing);
    document.querySelector('.tt-record').classList.toggle('is-playing', state.isPlaying);
    $('now-spinning').classList.toggle('is-playing', state.isPlaying);

    var button = $('tt-playback-toggle');
    button.setAttribute('aria-pressed', state.isPlaying ? 'true' : 'false');
    button.setAttribute('aria-label', (state.isPlaying ? 'Pause ' : 'Play ') + (state.mood ? state.mood.name : '') + ' playlist');
    button.dataset.state = state.isPlaying ? 'playing' : 'paused';
    button.querySelector('.tt-playback-toggle__status').textContent =
      !spotify.controller ? 'Loading player…' : (state.isPlaying ? 'Playing' : 'Play');
  }

  // The turntable only works as a control while Spotify is the active
  // embed. Otherwise it's hidden rather than left looking clickable.
  function updateTurntableControl() {
    var button = $('tt-playback-toggle');
    var usable = state.activeSource === 'spotify';
    button.hidden = !usable;
    button.disabled = !usable || !spotify.controller;
    setPlaying(usable && state.isPlaying);
  }

  function initTurntableControl() {
    $('tt-playback-toggle').addEventListener('click', function () {
      if (state.activeSource !== 'spotify' || !spotify.controller) return;
      if (state.isPlaying) spotify.controller.pause();
      else spotify.controller.play();
    });
  }

  // ── Now spinning bar ──

  function renderBar(mood) {
    var bar = $('now-spinning');
    bar.hidden = false;
    bar.style.setProperty('--mood-color', moodColor(mood) || 'var(--color-near-black)');
    $('now-spinning-label').style.backgroundImage = "url('" + assetUrl(mood.art.circle) + "')";
    $('now-spinning-name').textContent = mood.name;

    Array.prototype.forEach.call(bar.querySelectorAll('.now-spinning__source-btn'), function (btn) {
      var source = btn.dataset.source;
      var available = hasSource(mood, source);
      var label = source === 'spotify' ? 'Spotify' : 'Apple Music';
      btn.disabled = !available;
      btn.setAttribute('aria-pressed', source === state.activeSource ? 'true' : 'false');
      if (available) {
        btn.removeAttribute('aria-label');
        btn.removeAttribute('title');
      } else {
        btn.setAttribute('aria-label', label + ' (not linked for this mood yet)');
        btn.title = 'Not linked for this mood yet';
      }
    });
  }

  function initSourceToggle() {
    Array.prototype.forEach.call(document.querySelectorAll('.now-spinning__source-btn'), function (btn) {
      btn.addEventListener('click', function () {
        if (btn.disabled || btn.dataset.source === state.activeSource) return;
        state.preferredSource = btn.dataset.source;
        loadPlayer(state.mood);
        renderBar(state.mood);
      });
    });
  }

  // Keep the page's last content clear of the fixed bar.
  function trackBarHeight() {
    var bar = $('now-spinning');
    function update() {
      document.documentElement.style.setProperty('--now-spinning-height', bar.offsetHeight + 'px');
    }
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(bar);
    else window.addEventListener('resize', update);
    update();
  }

  // ── Players ──

  function stopApple() {
    var host = $('now-spinning-apple');
    host.innerHTML = '';   // removing the iframe is the only way to stop it
    host.hidden = true;
  }

  function showApple(mood) {
    if (spotify.controller) spotify.controller.pause();
    $('now-spinning-spotify').hidden = true;

    var host = $('now-spinning-apple');
    var src = appleEmbedSrc(mood);
    var iframe = host.querySelector('iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.height = String(APPLE_HEIGHT);
      iframe.allow = 'autoplay *; encrypted-media *; fullscreen *; clipboard-write';
      iframe.setAttribute('sandbox', 'allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation');
      host.appendChild(iframe);
    }
    iframe.title = 'Apple Music player: ' + mood.name + ' playlist';
    if (iframe.getAttribute('src') !== src) iframe.src = src;
    host.hidden = false;
  }

  function showSpotify(mood) {
    stopApple();
    $('now-spinning-spotify').hidden = false;
    var uri = spotifyUri(mood);
    if (spotify.controller && spotify.uri !== uri) {
      spotify.controller.pause();
      spotify.controller.loadUri(uri);
      setPlaying(false);
    }
    spotify.uri = uri;
    createSpotifyController();
  }

  function createSpotifyController() {
    var mount = $('now-spinning-spotify-mount');
    if (!spotify.api || spotify.controller || !spotify.uri || !mount) return;
    var initialUri = spotify.uri;

    spotify.api.createController(mount, { uri: initialUri, width: '100%', height: String(SPOTIFY_HEIGHT) }, function (controller) {
      spotify.controller = controller;
      // Use the controller from this callback; a separate `ready` event
      // can fire before a listener is attached.
      if (spotify.uri !== initialUri) controller.loadUri(spotify.uri);
      controller.addListener('playback_update', function (event) {
        if (!event || !event.data || state.activeSource !== 'spotify') return;
        setPlaying(!event.data.isPaused && !event.data.isBuffering);
      });
      updateTurntableControl();
    });
  }

  function loadPlayer(mood) {
    var source = hasSource(mood, state.preferredSource) ? state.preferredSource
      : (hasSource(mood, 'spotify') ? 'spotify' : (hasSource(mood, 'apple') ? 'apple' : null));
    state.activeSource = source;
    state.isPlaying = false;

    var unavailable = $('now-spinning-unavailable');
    unavailable.hidden = source !== null;
    unavailable.textContent = source ? '' : 'No playlist linked for this mood yet.';

    if (source === 'spotify') showSpotify(mood);
    else if (source === 'apple') showApple(mood);
    else {
      if (spotify.controller) spotify.controller.pause();
      $('now-spinning-spotify').hidden = true;
      stopApple();
    }
    updateTurntableControl();
  }

  window.onSpotifyIframeApiReady = function (IFrameAPI) {
    spotify.api = IFrameAPI;
    if (state.activeSource === 'spotify') createSpotifyController();
  };

  // ── Selection ──

  function selectMood(moodId) {
    var mood = getMood(moodId);
    if (!mood || mood === state.mood) return;
    state.mood = mood;
    markSelected(mood.id);
    renderTurntable(mood);
    loadPlayer(mood);
    renderBar(mood);
  }

  function init() {
    initTurntableControl();
    initSourceToggle();

    fetch(CONFIG_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        config = data;
        renderSelector();
        initSelectorControls();
        trackBarHeight();
        selectMood(getMood(config.defaultMood) ? config.defaultMood : config.moods[0].id);
      })
      .catch(function (err) {
        $('mood-row').insertAdjacentHTML('afterend',
          '<p class="listen-moods__error">The moods didn’t load. Refresh the page to try again.</p>');
        if (window.console) console.error('Listen: could not load ' + CONFIG_URL, err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
