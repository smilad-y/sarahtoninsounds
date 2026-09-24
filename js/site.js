// Shared site JavaScript.
// Currently handles one thing: making sure the Home hero video respects
// prefers-reduced-motion (PROJECT-SPEC.md §13). No-ops on any page that
// doesn't have a .hero-video element, so it's safe to load everywhere.

(function () {
  var heroVideo = document.querySelector('.hero-video');
  if (!heroVideo) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyMotionPreference(mql) {
    if (mql.matches) {
      heroVideo.removeAttribute('autoplay');
      heroVideo.loop = false;
      heroVideo.pause();
    } else {
      heroVideo.loop = true;
      var playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {});
      }
    }
  }

  applyMotionPreference(reduceMotion);

  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', applyMotionPreference);
  }
})();

// Home V2 mobile menu trigger (inside the pink cloud). No-ops on any page
// without a .hv2-menu-btn element.
(function () {
  var btn = document.querySelector('.hv2-menu-btn');
  var menu = document.getElementById('hv2-mobile-nav');
  if (!btn || !menu) return;

  var label = btn.querySelector('.hv2-menu-btn__label');

  function openMenu() {
    menu.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    if (label) label.textContent = 'Close';
  }

  function closeMenu() {
    menu.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    if (label) label.textContent = 'Menu';
  }

  btn.addEventListener('click', function () {
    if (btn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      btn.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (btn.getAttribute('aria-expanded') === 'true' &&
        !menu.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });
})();

// About desktop scaling: the 1440px composition is zoomed to fit the
// viewport between 1224px (85%) and 1440px (css/about.css,
// .ab3-page). about.html sets the first value inline in <head> so there
// is no unscaled first paint; this keeps it current on resize. No-ops on
// any page without .ab3-page.
(function () {
  if (!document.querySelector('.ab3-page')) return;

  function fitAbout() {
    var zoom = Math.min(document.documentElement.clientWidth / 1440, 1);
    document.documentElement.style.setProperty('--ab3-zoom', zoom);
  }

  fitAbout();
  window.addEventListener('resize', fitAbout);
})();

// Logo links: fit the focus ring / click area (.logo-home-link::after) to
// the torn-paper card inside the logo image. data-card-inset holds the
// card's left/top/right/bottom margins as fractions of the image; the
// image is object-fit: cover, so the crop is worked out from the link
// box before converting to % insets.
(function () {
  var links = document.querySelectorAll('.logo-home-link[data-card-inset]');
  if (!links.length) return;

  function fit(link) {
    var img = link.querySelector('img');
    var w = link.offsetWidth;
    var h = link.offsetHeight;
    if (!img || !img.naturalWidth || !w || !h) return;
    var f = link.getAttribute('data-card-inset').split(' ').map(Number);
    var W = img.naturalWidth;
    var H = img.naturalHeight;
    var s = Math.max(w / W, h / H);
    var x0 = (w - W * s) / 2;
    var y0 = (h - H * s) / 2;
    var inset = [
      (y0 + f[1] * H * s) / h,
      (w - x0 - (1 - f[2]) * W * s) / w,
      (h - y0 - (1 - f[3]) * H * s) / h,
      (x0 + f[0] * W * s) / w
    ].map(function (v) { return (Math.max(0, v) * 100).toFixed(2) + '%'; });
    link.style.setProperty('--logo-card-inset', inset.join(' '));
  }

  function fitAll() {
    Array.prototype.forEach.call(links, fit);
  }

  Array.prototype.forEach.call(links, function (link) {
    var img = link.querySelector('img');
    if (img && !img.complete) img.addEventListener('load', function () { fit(link); });
  });

  var timer = null;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(fitAll, 150);
  });
  fitAll();
})();
