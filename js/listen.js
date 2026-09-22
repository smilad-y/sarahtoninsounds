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
      record: '/assets/images/listen/sarahtonin_sounds-listen-record-dreamy_2.png', vinyl: '/assets/images/listen/Colored Records/Record-Light_Blue.png',
      tape: '/assets/images/listen/Tape-Light_Blue_1.png',
      curated: true,
      tapeLabel: 'DREAMY',
      spotifyPlaylistId: '6FhZxeM54u0L6x8muXy7SI',
      blurb: 'For when your mind needs some room to wonder',
      description: 'Floaty, atmospheric, and transportive. These are the songs for late nights, daydreaming, and everywhere in between.',
      picks: [
        { title: 'Falling', artist: 'Julee Cruise' },
        { title: 'Closer', artist: 'You’ll Never Get To Heaven' },
        { title: 'Kisses', artist: 'Slowdive' }
      ]
    },
    { id: 'yellow', label: 'Energized — not yet curated', circle: '/assets/images/listen/yellow-circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-yellow.png', vinyl: '/assets/images/listen/Colored Records/Record-Yellow.png', tape: '/assets/images/listen/Tape-Yellow.png', spotifyPlaylistId: '5BrpdG6D8ZWvZRpem1YUjK', curated: false },
    { id: 'red', label: 'Sultry — not yet curated', circle: '/assets/images/listen/red-circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-red.png', vinyl: '/assets/images/listen/Colored Records/Record-Red.png', tape: '/assets/images/listen/Tape-Red.png', spotifyPlaylistId: '5gZMZPKxAf6YaPvVm799tg', curated: false },
    { id: 'pink', label: 'Cute — not yet curated', circle: '/assets/images/listen/pink-circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-pink.png', vinyl: '/assets/images/listen/Colored Records/Record-Pink.png', tape: '/assets/images/listen/Tape-Pink.png', spotifyPlaylistId: '1MKeBuS1z21UUnE01WeC7F', curated: false },
    { id: 'orange', label: 'Audacious — not yet curated', circle: '/assets/images/listen/orange-circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-orange.png', vinyl: '/assets/images/listen/Colored Records/Record-Orange.png', tape: '/assets/images/listen/Tape-Orange.png', spotifyPlaylistId: '1nRKb7lCLt7ehak4PoAr4Y', curated: false },
    { id: 'light-green', label: 'Chill — not yet curated', circle: '/assets/images/listen/light-green-circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-light green.png', vinyl: '/assets/images/listen/Colored Records/Record-Light_Green.png', tape: '/assets/images/listen/Tape-Light_Green.png', spotifyPlaylistId: '24fenp1dE6vpIDbmS6FwAB', curated: false },
    { id: 'lavender', label: 'Melancholy — not yet curated', circle: '/assets/images/listen/lavendar-circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-lavendar.png', vinyl: '/assets/images/listen/Colored Records/Recoord-Lavendar.png', tape: '/assets/images/listen/Tape-Lavendar.png', spotifyPlaylistId: '5JAjZESFqplxGdXXnkZv7d', curated: false },
    { id: 'brown', label: 'Lost — not yet curated', circle: '/assets/images/listen/brown_Circle.png', record: '/assets/images/listen/sarahtonin_sounds-listen-record-brown.png', vinyl: '/assets/images/listen/Colored Records/Record-Brown.png', tape: '/assets/images/listen/Tape-brown.png', spotifyPlaylistId: '0H4yQYUFBjYbRaUGEG3MzA', curated: false },
    { id: 'dark-blue', label: 'Burdened — not yet curated', circle: '/assets/images/listen/dark-blue-circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-dark_blue.png', vinyl: '/assets/images/listen/Colored Records/Record-Dark_Blue.png', tape: '/assets/images/listen/Tape-Dark_Blue.png', spotifyPlaylistId: '4oS3oJ23hvqh8PMDnxrbtY', curated: false },
    { id: 'black', label: 'Defiant — not yet curated', circle: '/assets/images/listen/black-circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-black.png', vinyl: '/assets/images/listen/Colored Records/Record-Black.png', tape: '/assets/images/listen/Tape-Black.png', spotifyPlaylistId: '4TQdShNqgVeLDUD0X4Gquq', curated: false },
    { id: 'berry', label: 'Playful / Cheeky — not yet curated', circle: '/assets/images/listen/berry-circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-maroon.png', vinyl: '/assets/images/listen/Colored Records/Record-Maroon.png', tape: '/assets/images/listen/Tape-Maroon.png', spotifyPlaylistId: '52MLdAdmlGKmj8Q7OESYYA', curated: false },
    { id: 'dark-green', label: 'Unleashed — not yet curated', circle: '/assets/images/listen/dark-green-circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-green.png', vinyl: '/assets/images/listen/Colored Records/Record-Green.png', tape: '/assets/images/listen/Tape-Green.png', spotifyPlaylistId: '0zksiK8ZEBUECUqxLAHRzp', curated: false },
    { id: 'purple', label: 'Hype — not yet curated', circle: '/assets/images/listen/purple-circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-purple.png', vinyl: '/assets/images/listen/Colored Records/Record-Purple.png', tape: '/assets/images/listen/Tape-Purple.png', spotifyPlaylistId: '7eluu31I9kVwckY5gspmKR', curated: false },
    { id: 'peach', label: 'Nostalgic — not yet curated', circle: '/assets/images/listen/peach-cirlcle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-peach.png', vinyl: '/assets/images/listen/Colored Records/Record-Peach.png', tape: '/assets/images/listen/Tape-Peach.png', spotifyPlaylistId: '6sP6dpEbjOagcJGJ7bgINa', curated: false },
    { id: 'forest-green', label: 'Hopeful / At Peace — not yet curated', circle: '/assets/images/listen/forest green circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-forest-green.png', vinyl: '/assets/images/listen/Record-forest_Green.png', tape: '/assets/images/listen/Tape-Forest_Green.png', spotifyPlaylistId: '5RbZK1fPP47ohsKVMBQUcO', curated: false },
    { id: 'gold', label: 'Euphoric — not yet curated', circle: '/assets/images/listen/gold circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-gold.png', vinyl: '/assets/images/listen/Record-gold.png', tape: '/assets/images/listen/Tape-Gold.png', spotifyPlaylistId: '3XKtSRi5IhoSJA4flxU58N', curated: false },
    { id: 'fuschia', label: 'Tender — not yet curated', circle: '/assets/images/listen/Fuschia Circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-fuschia.png', vinyl: '/assets/images/listen/Record-fuschia.png', tape: '/assets/images/listen/Tape-Fuschia.png', spotifyPlaylistId: '5BHM7EYebAJE4QZQcCoapO', curated: false },
    { id: 'silver', label: 'Hypnotic — not yet curated', circle: '/assets/images/listen/Silver Circle.png', record: '/assets/images/listen/sarahtonin sounds-listen-record-silver.png', vinyl: '/assets/images/listen/Record-silver.png', tape: '/assets/images/listen/Tape-Silver.png', spotifyPlaylistId: '00G4dsIODpNybJ17oYCpIc', curated: false }
  ];

  window.SarahtoninListenMoods = MOODS;

  function getMood(id) {
    for (var i = 0; i < MOODS.length; i++) {
      if (MOODS[i].id === id) return MOODS[i];
    }
    return null;
  }
  window.SarahtoninGetMood = getMood;

  var spotifyIFrameAPI = null;
  var spotifyController = null;
  var activePlaylistId = null;
  var activeMoodLabel = '';
  var isPlaying = false;
  var playerIsReady = false;

  function getPlaybackElements() {
    return {
      record: document.querySelector('.tt-record'),
      button: document.getElementById('tt-playback-toggle'),
      status: document.querySelector('.tt-playback-toggle__status'),
      shell: document.getElementById('spotify-embed-shell'),
      container: document.getElementById('spotify-embed-container')
    };
  }

  function setPlaybackUI(playing) {
    var elements = getPlaybackElements();
    isPlaying = Boolean(playing);

    if (elements.record) {
      elements.record.classList.toggle('is-playing', isPlaying);
    }

    if (!elements.button) return;

    elements.button.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
    elements.button.setAttribute(
      'aria-label',
      (isPlaying ? 'Pause ' : 'Play ') + activeMoodLabel + ' playlist'
    );
    elements.button.dataset.state = isPlaying ? 'playing' : 'paused';

    if (elements.status) {
      elements.status.textContent = isPlaying ? 'Playing' : 'Play';
    }
  }

  function setPlayerAvailability(isAvailable) {
    var elements = getPlaybackElements();
    if (elements.button) {
      elements.button.hidden = !isAvailable;
      elements.button.disabled = !isAvailable || !playerIsReady;
    }
    if (elements.shell) {
      elements.shell.classList.toggle('is-unavailable', !isAvailable);
    }
    if (isAvailable && !playerIsReady && elements.status) {
      elements.status.textContent = 'Loading player…';
    }
  }

  function createSpotifyController() {
    var elements = getPlaybackElements();
    if (!spotifyIFrameAPI || spotifyController || !activePlaylistId || !elements.container) return;

    var initialPlaylistId = activePlaylistId;

    spotifyIFrameAPI.createController(
      elements.container,
      {
        uri: 'spotify:playlist:' + initialPlaylistId,
        width: '100%',
        height: '80'
      },
      function (controller) {
        spotifyController = controller;
        playerIsReady = true;

        // Spotify supplies a usable controller through this callback. Waiting
        // for a separate `ready` event can leave the custom control disabled
        // forever because that event may have fired before listeners attach.
        if (activePlaylistId && activePlaylistId !== initialPlaylistId) {
          controller.loadUri('spotify:playlist:' + activePlaylistId);
        }
        setPlayerAvailability(Boolean(activePlaylistId));
        setPlaybackUI(false);

        controller.addListener('playback_update', function (event) {
          if (!event || !event.data) return;
          setPlaybackUI(!event.data.isPaused && !event.data.isBuffering);
        });
      }
    );
  }

  function loadSpotifyMood(mood) {
    var nextPlaylistId = mood && mood.spotifyPlaylistId ? mood.spotifyPlaylistId : null;
    activeMoodLabel = mood ? mood.label.replace(/ — not yet curated$/, '') : '';

    if (spotifyController) {
      spotifyController.pause();
    }
    setPlaybackUI(false);
    activePlaylistId = nextPlaylistId;
    setPlayerAvailability(Boolean(activePlaylistId));

    if (!activePlaylistId) return;

    if (spotifyController) {
      spotifyController.loadUri('spotify:playlist:' + activePlaylistId);
      setPlayerAvailability(true);
    } else {
      createSpotifyController();
    }
  }

  function initPlaybackControl() {
    var button = document.getElementById('tt-playback-toggle');
    if (!button) return;

    button.addEventListener('click', function () {
      if (!spotifyController || !activePlaylistId) return;
      if (isPlaying) {
        spotifyController.pause();
      } else {
        spotifyController.play();
      }
    });
  }

  window.onSpotifyIframeApiReady = function (IFrameAPI) {
    spotifyIFrameAPI = IFrameAPI;
    createSpotifyController();
  };

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

  // Provisional swatch colors for the tape label on moods with no real
  // tape export (only "dreamy" has one — Tape-Light_Blue_1.png) — same
  // "provisional, not confirmed brand hex" status as the secondary
  // accents in css/tokens.css, used only until Sarah supplies real tape
  // exports or per-mood color values for the rest.
  var TAPE_COLORS = {
    yellow: '#f0c93a',
    red: '#c0392b',
    pink: '#f0b8d0',
    orange: '#e08a3c',
    'light-green': '#9fc37c',
    lavender: '#c7b3e0',
    'dark-blue': '#2d4a9e',
    black: '#3a3a3a',
    berry: '#7a1f3d',
    'dark-green': '#2e5339',
    purple: '#6a3b8f',
    peach: '#f2b79a',
    'forest-green': '#1d3f24',
    gold: '#c9a227',
    fuschia: '#c2185b',
    silver: '#b8b8b8',
    brown: '#6d4f4a'
  };

  function renderTurntable(moodId) {
    var mood = getMood(moodId);
    var tape = document.getElementById('tt-tape');
    var nameEl = document.getElementById('tt-mood-name');
    var blurbEl = document.getElementById('tt-blurb');
    var descEl = document.getElementById('tt-description');
    var picksList = document.getElementById('tt-picks-list');
    var recordImg = document.getElementById('tt-record-img');
    if (!mood || !tape || !nameEl) return;

    loadSpotifyMood(mood);

    nameEl.textContent = mood.curated ? mood.label : mood.label.replace(/ — not yet curated$/, '');

    if (recordImg && mood.vinyl) {
      recordImg.src = encodeURI(mood.vinyl);
    }

    if (mood.tape) {
      tape.style.backgroundImage = "url('" + encodeURI(mood.tape) + "')";
      tape.style.backgroundColor = '';
    } else {
      tape.style.backgroundImage = 'none';
      tape.style.backgroundColor = TAPE_COLORS[mood.id] || '';
    }

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
    initPlaybackControl();
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
