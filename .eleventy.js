const Journal = require("./js/journal.js");

module.exports = function (eleventyConfig) {
  // Everything not converted to an Eleventy template this round ships
  // byte-identical, as plain static files (paired with .eleventyignore
  // so Eleventy never also tries to compile these as templates).
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("legacy");
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("listen.html");
  eleventyConfig.addPassthroughCopy("contact.html");
  // Listen mood config, fetched at runtime by js/listen.js.
  eleventyConfig.addPassthroughCopy("content/listen");
  // netlify/functions/ is NOT passthrough-copied: Netlify Functions
  // deploy from their configured source directory directly, independent
  // of the static publish dir, once netlify.toml declares
  // `functions = "netlify/functions"` (pending — see #7 in the
  // conversation record).

  // Legacy PRESERVE-only data (CLAUDE.md, legacy/README.md) — kept
  // served at its current root-absolute paths so legacy/index.html's
  // reference copy keeps working, unchanged.
  eleventyConfig.addPassthroughCopy("essays");
  eleventyConfig.addPassthroughCopy("settings");
  eleventyConfig.addPassthroughCopy("music-picks");

  // Matches journal.js's own renderJournalCard()/renderFeaturedEntry()
  // date formatting exactly, so Journal Landing cards and Journal Post
  // pages always agree ("September 2026").
  eleventyConfig.addFilter("journalDate", function (date) {
    var d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  });

  // Adapts an Eleventy journalEssay collection item (content/journal/
  // essays/*.md) into the shape journal.js's normalizeEssay() already
  // expects, so the exact same merge/sort/render logic that used to run
  // client-side against fetched JSON now runs once at build time.
  function essayToEntry(item) {
    return Journal.normalizeEssay({
      slug: item.data.slug,
      title: item.data.title,
      date: item.data.date,
      excerpt: item.data.excerpt,
      featured_image: item.data.featured_image,
      featured_image_whole: item.data.featured_image_whole
    });
  }

  // Monthly Favorites deliberately stays on its current single-JSON
  // shape this round (not a real Eleventy collection) — see the
  // decisions recorded in conversation. `monthlyFavoritesData` is
  // content/journal/monthly-favorites.json, exposed automatically as
  // journal.monthlyFavorites via dir.data below.
  eleventyConfig.addFilter("journalFeed", function (essayCollection, monthlyFavoritesData) {
    var essays = (essayCollection || []).map(essayToEntry);
    var monthlyFavs = ((monthlyFavoritesData && monthlyFavoritesData.entries) || [])
      .map(Journal.normalizeMonthlyFavorite);
    return Journal.sortEntriesByDateDesc(essays.concat(monthlyFavs));
  });

  eleventyConfig.addFilter("resolveFeatured", function (sortedEntries, featuredData) {
    return Journal.resolveFeaturedEntry(sortedEntries, (featuredData && featuredData.entries) || []);
  });

  // The rest of the feed for the 4 "recent" card slots — the sorted
  // feed minus whichever entry is showing in the Featured slot (not a
  // plain slice(1), since resolveFeatured's pick isn't guaranteed to be
  // the newest entry anymore).
  eleventyConfig.addFilter("journalRecent", function (sortedEntries, featured, limit) {
    return (sortedEntries || [])
      .filter(function (entry) {
        return !(featured && entry.type === featured.type && entry.slug === featured.slug);
      })
      .slice(0, limit);
  });

  // Which filter buttons the Journal Landing shows: one per content type
  // with at least one entry. js/journal-filters.js re-renders the slots
  // client-side from journalFeedJson below.
  eleventyConfig.addFilter("journalTypes", function (sortedEntries) {
    var types = [];
    (sortedEntries || []).forEach(function (entry) {
      if (types.indexOf(entry.type) === -1) types.push(entry.type);
    });
    return types;
  });

  // Card-level fields only (no bodies), escaped so the JSON is safe
  // inside a <script> element.
  eleventyConfig.addFilter("journalFeedJson", function (sortedEntries, featuredData) {
    var entries = (sortedEntries || []).map(function (entry) {
      return {
        type: entry.type,
        slug: entry.slug,
        title: entry.title,
        date: entry.dateObj.toISOString(),
        excerpt: entry.excerpt,
        image: entry.image,
        imageWhole: entry.imageWhole
      };
    });
    return JSON.stringify({
      entries: entries,
      featured: (featuredData && featuredData.entries) || []
    }).replace(/</g, "\\u003c");
  });

  eleventyConfig.addFilter("renderJournalCard", Journal.renderJournalCard);
  eleventyConfig.addFilter("renderFeaturedEntry", Journal.renderFeaturedEntry);

  // Loaded explicitly (not via dir.data) because Eleventy excludes its
  // configured data directory from normal template discovery — pointing
  // dir.data at content/ would silently stop content/journal/essays/*.md
  // from ever being picked up as pages. This keeps content/ as an
  // ordinary part of the input tree (so the essays collection works)
  // while still exposing the JSON files as global template data.
  eleventyConfig.addGlobalData("about", () => require("./content/about.json"));
  eleventyConfig.addGlobalData("journal", () => ({
    monthlyFavorites: require("./content/journal/monthly-favorites.json"),
    featured: require("./content/journal/featured.json")
  }));

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["html", "njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
