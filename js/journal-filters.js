// Journal Landing filters: All / Essays / Monthly Favs (PROJECT-SPEC.md §8).
// The page is fully rendered at build time; this only re-fills the
// Featured slot and the four Recent slots (desktop and mobile) from the
// card data Eleventy embeds in #journal-data, using the same
// window.Journal renderers and Featured rules as the build.

(function () {
  'use strict';

  var Journal = window.Journal;
  var dataEl = document.getElementById('journal-data');
  var bars = document.querySelectorAll('[data-journal-filters]');
  if (!Journal || !dataEl || !bars.length) return;

  var data = JSON.parse(dataEl.textContent);
  var entries = data.entries.map(function (entry) {
    entry.dateObj = new Date(entry.date);
    return entry;
  });
  var emptyMessage = '<p class="journal-empty">New essays and Monthly Favorites are on the way.</p>';

  var targets = [
    {
      featured: document.getElementById('journal-featured'),
      recent: document.getElementById('journal-recent'),
      slotPrefix: 'journal-card-'
    },
    {
      featured: document.getElementById('journal-mobile-featured'),
      recent: document.getElementById('journal-mobile-recent'),
      slotPrefix: 'journal-mobile-card-'
    }
  ];

  function render(filter) {
    var visible = filter === 'all'
      ? entries
      : entries.filter(function (entry) { return entry.type === filter; });
    var featured = Journal.resolveFeaturedEntry(visible, data.featured);
    var recent = visible.filter(function (entry) { return entry !== featured; }).slice(0, 4);

    targets.forEach(function (target) {
      if (target.featured) {
        target.featured.innerHTML = featured ? Journal.renderFeaturedEntry(featured) : emptyMessage;
      }
      if (target.recent) target.recent.hidden = !recent.length;
      for (var i = 0; i < 4; i++) {
        var slot = document.getElementById(target.slotPrefix + (i + 1));
        if (!slot) continue;
        slot.hidden = !recent[i];
        slot.innerHTML = recent[i] ? Journal.renderJournalCard(recent[i]) : '';
      }
    });

    // Desktop and mobile bars stay in sync.
    Array.prototype.forEach.call(document.querySelectorAll('.journal-filter'), function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-filter') === filter));
    });
  }

  Array.prototype.forEach.call(bars, function (bar) {
    bar.hidden = false;
    bar.addEventListener('click', function (event) {
      var button = event.target.closest('.journal-filter');
      if (!button || button.getAttribute('aria-pressed') === 'true') return;
      render(button.getAttribute('data-filter'));
    });
  });
})();
