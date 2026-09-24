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
  // Favicon and iOS home-screen icon live at the root, where browsers
  // look for them by default (sources: assets/images/brand/).
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  // Listen mood config, fetched at runtime by js/listen.js. Only this
  // file: content/listen/crash-courses/ holds Markdown entries (drafts
  // included) that must never be published as raw files.
  eleventyConfig.addPassthroughCopy("content/listen/moods.json");
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

  // ── Crash Courses (content/listen/crash-courses/*.md) ──
  // Only entries with Live on reach the site: this collection feeds the
  // Listen shelf, the index, and "More crash courses", and the folder's
  // data file gives every other entry no page at all.
  function courseOrder(item) {
    var n = Number(item.data.order);
    return item.data.order === undefined || item.data.order === "" || isNaN(n) ? Infinity : n;
  }

  eleventyConfig.addCollection("crashCourseLive", function (api) {
    return api.getFilteredByTag("crashCourse")
      .filter(function (item) { return item.data.live === true; })
      .sort(function (a, b) {
        return (courseOrder(a) - courseOrder(b)) ||
          String(a.data.title).localeCompare(String(b.data.title));
      });
  });

  eleventyConfig.addFilter("head", function (list, n) {
    return (list || []).slice(0, n);
  });

  eleventyConfig.addFilter("otherCrashCourses", function (list, url, n) {
    return (list || []).filter(function (item) { return item.url !== url; }).slice(0, n);
  });

  // Same URL rules as js/listen.js's spotifyUri() / appleEmbedSrc(), so
  // a link that works for a mood works here too.
  eleventyConfig.addFilter("spotifyEmbedUrl", function (url) {
    var match = typeof url === "string" && url.match(/playlist[/:]([A-Za-z0-9]+)/);
    return match ? "https://open.spotify.com/embed/playlist/" + match[1] : null;
  });

  eleventyConfig.addFilter("appleEmbedUrl", function (url) {
    if (typeof url !== "string" || !/^https:\/\/(embed\.)?music\.apple\.com\//.test(url.trim())) return null;
    return url.trim().replace("https://music.apple.com/", "https://embed.music.apple.com/");
  });

  // Uploaded card art goes through Netlify's Image CDN, which resizes it
  // and serves WebP/AVIF to browsers that take them. Only on Netlify
  // builds (NETLIFY=true): a local build has no /.netlify/images
  // endpoint, so it keeps the original file.
  var useImageCdn = process.env.NETLIFY === "true";

  function cdnUrl(src, width) {
    return "/.netlify/images?url=" + encodeURIComponent(src) + "&w=" + width;
  }

  eleventyConfig.addFilter("imageSrc", function (src, width) {
    return useImageCdn && /^\/[^/]/.test(src || "") ? cdnUrl(src, width) : src;
  });

  eleventyConfig.addFilter("imageSrcset", function (src, widths) {
    if (!useImageCdn || !/^\/[^/]/.test(src || "")) return "";
    return widths.map(function (w) { return cdnUrl(src, w) + " " + w + "w"; }).join(", ");
  });

  eleventyConfig.addFilter("renderJournalCard", Journal.renderJournalCard);
  eleventyConfig.addFilter("renderFeaturedEntry", Journal.renderFeaturedEntry);

  // Loaded explicitly (not via dir.data) because Eleventy excludes its
  // configured data directory from normal template discovery — pointing
  // dir.data at content/ would silently stop content/journal/essays/*.md
  // from ever being picked up as pages. This keeps content/ as an
  // ordinary part of the input tree (so the essays collection works)
  // while still exposing the JSON files as global template data.
  // Build year for the site footer's copyright line.
  eleventyConfig.addGlobalData("buildYear", () => new Date().getFullYear());
  eleventyConfig.addGlobalData("home", () => require("./content/home.json"));
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
