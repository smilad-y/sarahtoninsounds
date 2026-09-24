// Every Crash Course entry in this folder (one Markdown file each,
// created from the CMS). The URL comes from the file name, which Decap
// sets from the title when the entry is created. An entry with Live off
// gets no page at all.
module.exports = {
  eleventyComputed: {
    permalink: function (data) {
      return data.live === true ? "/listen/crash-courses/" + data.page.fileSlug + "/" : false;
    }
  }
};
