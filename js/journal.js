// Journal data + rendering layer (PROJECT-SPEC.md §8, BUILD-ROADMAP.md
// Phase 7). Combines the two independently-authored CMS content types
// (Essays, Monthly Favorites) into one reverse-chronological feed.
//
// Deliberately framework-free, dependency-free vanilla JS, exposed as a
// small UMD-style module so the exact same code can run in the browser
// (window.Journal) and under Node for automated validation
// (module.exports) without a build step.
//
// Note: markdown-to-HTML here is a new, minimal implementation — it does
// NOT reuse the legacy site's converter (see legacy/index.html
// mdToHtml), which skips HTML-escaping and uses a fragile lookahead
// regex for paragraph wrapping. This version escapes first, then only
// recognizes the small set of formatting Essays actually need.

(function (global) {
  'use strict';

  var HTML_ESCAPES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return HTML_ESCAPES[ch];
    });
  }

  // Minimal, safe markdown → HTML. Escapes raw HTML first, then applies
  // only: **bold**, *italic*, [links](https://...), #/##/### headings,
  // "> " blockquotes, and paragraph breaks on blank lines. No lists,
  // code spans, or images — matches "straightforward editorial
  // formatting" (PROJECT-SPEC.md §8); richer elements are an explicit
  // future enhancement, not solved here.
  function renderMarkdown(markdown) {
    if (!markdown) return '';

    var escaped = escapeHtml(markdown);

    var withInlineAndBlockMarks = escaped
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[(.+?)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');

    // Paragraphs: split on blank lines and wrap only the blocks that
    // aren't already a block-level tag (heading/blockquote). This
    // replaces the legacy converter's brittle negative-lookahead hack.
    var blockTagPattern = /^<(h1|h2|h3|blockquote)[ >]/;
    var paragraphs = withInlineAndBlockMarks
      .split(/\n\s*\n/)
      .map(function (block) {
        var trimmed = block.trim();
        if (!trimmed) return '';
        if (blockTagPattern.test(trimmed)) return trimmed;
        return '<p>' + trimmed.replace(/\n/g, '<br>') + '</p>';
      })
      .filter(Boolean);

    return paragraphs.join('\n');
  }

  function toDateObject(value) {
    var parsed = new Date(value);
    return isNaN(parsed.getTime()) ? new Date(0) : parsed;
  }

  // Normalizes a raw Essay CMS entry into the common shape the shared
  // Journal feed/card system needs, keeping type-specific data (body)
  // alongside it rather than discarding it.
  function normalizeEssay(raw) {
    return {
      type: 'essay',
      slug: raw.slug,
      title: raw.title,
      date: raw.date,
      dateObj: toDateObject(raw.date),
      excerpt: raw.excerpt || '',
      image: raw.featured_image || null,
      body: raw.body || ''
    };
  }

  // Normalizes a raw Monthly Favorites CMS entry the same way, keeping
  // its four structured sections intact under `sections` rather than
  // collapsing them into a single body.
  function normalizeMonthlyFavorite(raw) {
    return {
      type: 'monthly-fav',
      slug: raw.slug,
      title: raw.title,
      date: raw.date,
      dateObj: toDateObject(raw.date),
      excerpt: raw.excerpt || '',
      image: raw.featured_image || null,
      sections: {
        newReleases: raw.new_releases || [],
        favoriteSongs: raw.favorite_songs || [],
        favoriteDiscoveries: raw.favorite_discoveries || [],
        favoriteNeedledrops: raw.favorite_needledrops || []
      }
    };
  }

  function sortEntriesByDateDesc(entries) {
    return entries.slice().sort(function (a, b) {
      return b.dateObj - a.dateObj;
    });
  }

  // The featured/latest-post slot is always just the newest entry
  // across both content types — no manual "is featured" flag.
  function getFeaturedEntry(sortedEntries) {
    return sortedEntries.length ? sortedEntries[0] : null;
  }

  function mergeJournalData(essaysFile, monthlyFavoritesFile) {
    var essays = ((essaysFile && essaysFile.entries) || []).map(normalizeEssay);
    var monthlyFavorites = ((monthlyFavoritesFile && monthlyFavoritesFile.entries) || [])
      .map(normalizeMonthlyFavorite);
    return sortEntriesByDateDesc(essays.concat(monthlyFavorites));
  }

  // Browser-only orchestration: fetch both CMS-managed files and return
  // the merged, sorted, reverse-chronological Journal feed. Not used by
  // the Node-side validation harness, which reads the fixture files
  // directly and calls mergeJournalData() to exercise the same logic
  // without needing an HTTP server.
  function loadJournalEntries() {
    return Promise.all([
      fetch('/content/journal/essays.json').then(function (res) {
        return res.ok ? res.json() : { entries: [] };
      }),
      fetch('/content/journal/monthly-favorites.json').then(function (res) {
        return res.ok ? res.json() : { entries: [] };
      })
    ]).then(function (results) {
      return mergeJournalData(results[0], results[1]);
    });
  }

  // Single reusable card renderer for both content types — visual
  // treatment does not differ by type per the finalized Figma
  // references, only the category label does.
  function renderJournalCard(entry) {
    var categoryLabel = entry.type === 'essay' ? 'Essay' : 'Monthly Favs';
    var displayDate = entry.dateObj.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
    var imageHtml = entry.image
      ? '<img class="journal-card__image" src="' + escapeHtml(entry.image) + '" alt="">'
      : '';

    return (
      '<a class="journal-card" href="/journal/' + encodeURIComponent(entry.slug) + '">' +
      imageHtml +
      '<div class="journal-card__meta">' + categoryLabel + ' &middot; ' + displayDate + '</div>' +
      '<h3 class="journal-card__title">' + escapeHtml(entry.title) + '</h3>' +
      '<div class="journal-card__divider"></div>' +
      '<p class="journal-card__excerpt">' + escapeHtml(entry.excerpt) + '</p>' +
      '<span class="journal-card__link">Read</span>' +
      '</a>'
    );
  }

  // Larger single-entry treatment for the automatic featured/latest
  // slot (Journal Landing only), matching the "Featured Post" node
  // geometry from the authoritative Figma file. Kept separate from
  // renderJournalCard because its DOM shape genuinely differs (a
  // separate paper-backdrop layer, photo layer, and text body layer,
  // per the Figma layer structure) — not because the two content types
  // need different markup; both render through this same function.
  function renderFeaturedEntry(entry) {
    var categoryLabel = entry.type === 'essay' ? 'Essay' : 'Monthly Favs';
    var displayDate = entry.dateObj.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
    var imageHtml = entry.image
      ? '<div class="journal-featured__photo"><img src="' + escapeHtml(entry.image) + '" alt=""></div>'
      : '';

    return (
      '<div class="journal-featured__backdrop"></div>' +
      imageHtml +
      '<div class="journal-featured__body">' +
      '<div class="journal-featured__meta">' + categoryLabel + ' &middot; ' + displayDate + '</div>' +
      '<h2 class="journal-featured__title">' + escapeHtml(entry.title) + '</h2>' +
      '<div class="journal-featured__divider"></div>' +
      '<p class="journal-featured__excerpt">' + escapeHtml(entry.excerpt) + '</p>' +
      '<a class="journal-featured__link" href="/journal/' + encodeURIComponent(entry.slug) + '">Read</a>' +
      '</div>'
    );
  }

  var Journal = {
    escapeHtml: escapeHtml,
    renderMarkdown: renderMarkdown,
    normalizeEssay: normalizeEssay,
    normalizeMonthlyFavorite: normalizeMonthlyFavorite,
    sortEntriesByDateDesc: sortEntriesByDateDesc,
    getFeaturedEntry: getFeaturedEntry,
    mergeJournalData: mergeJournalData,
    loadJournalEntries: loadJournalEntries,
    renderJournalCard: renderJournalCard,
    renderFeaturedEntry: renderFeaturedEntry
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Journal;
  }
  if (global) {
    global.Journal = Journal;
  }
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
