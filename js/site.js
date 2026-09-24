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
// viewport between the mobile breakpoint and 1440px (css/about.css,
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
