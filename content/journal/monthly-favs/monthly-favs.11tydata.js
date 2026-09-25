// Every Monthly Favs post in this folder (one Markdown file each,
// front matter only, created from the CMS). Title and URL come from
// Month and Year: "October Favs" at /journal/october-2026/. A post
// missing either gets no page and stays out of the Journal feed.
var MONTHS = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

function isComplete(data) {
  return MONTHS.indexOf(data.month) !== -1 && /^\d{4}$/.test(String(data.year));
}

module.exports = {
  tags: "monthlyFav",
  layout: "layouts/monthly-favs.njk",
  category: "Monthly Favs",
  eleventyComputed: {
    // Share image: the Card image, else the favorite song's art.
    featured_image: function (data) {
      var song = (data.highlights && data.highlights.favorite_song) || {};
      return data.card_image || song.art || null;
    },
    title: function (data) {
      return isComplete(data) ? data.month + " Favs" : data.title;
    },
    mfSlug: function (data) {
      return isComplete(data) ? data.month.toLowerCase() + "-" + data.year : null;
    },
    permalink: function (data) {
      return isComplete(data) ? "/journal/" + data.month.toLowerCase() + "-" + data.year + "/" : false;
    }
  }
};
