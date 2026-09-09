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
