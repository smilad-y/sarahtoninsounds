// Playlist player: Spotify / Apple Music toggle for a page's own
// playlist embed (Crash Course pages, Monthly Favs posts). Only loaded
// when the page has both links; handles every [data-cc-player] on the
// page (Monthly Favs posts carry one per desktop and mobile layout).
// Spotify shows by default; Apple Music's iframe is built when chosen and
// removed when leaving it, and the Spotify iframe is reloaded when
// hidden, since neither embed can be paused from here otherwise.
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('[data-cc-player]'), setUp);

  function setUp(player) {
    var toggle = player.querySelector('.cc-player__source');
    var buttons = player.querySelectorAll('.cc-player__source-btn');
    var spotify = player.querySelector('.cc-player__embed[data-source="spotify"]');
    var apple = player.querySelector('.cc-player__embed[data-source="apple"]');
    if (!toggle || !spotify || !apple) return;

    var spotifyFrame = spotify.querySelector('iframe');
    var spotifySrc = spotifyFrame.getAttribute('src');

    function showApple() {
      var frame = document.createElement('iframe');
      frame.src = apple.dataset.embedSrc;
      frame.title = apple.dataset.embedTitle;
      frame.height = '450';
      frame.allow = 'autoplay *; encrypted-media *; fullscreen *; clipboard-write';
      frame.setAttribute('sandbox', 'allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation');
      apple.appendChild(frame);
      apple.hidden = false;
      spotify.hidden = true;
      spotifyFrame.src = spotifySrc;   // reload = stop
    }

    function showSpotify() {
      apple.innerHTML = '';
      apple.hidden = true;
      spotify.hidden = false;
    }

    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener('click', function () {
        if (btn.getAttribute('aria-pressed') === 'true') return;
        if (btn.dataset.source === 'apple') showApple();
        else showSpotify();
        Array.prototype.forEach.call(buttons, function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
      });
    });

    toggle.hidden = false;
  }
})();
