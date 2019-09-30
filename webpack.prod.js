const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const version = JSON.stringify(require("./package.json").version);
const WebpackUserscript = require("webpack-userscript");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new WebpackUserscript({
      headers: {
        version: version,
        name: "YDBSlideshow",
        match: [
          "*://derpibooru.org/*",
          "*://trixiebooru.org/*",
          "*://www.derpibooru.org/*",
          "*://www.trixiebooru.org/*",
          "*://*.o53xo.orzgs6djmvrg633souxg64th.*.*/*",
          "*://*.orzgs6djmvrg633souxg64th.*.*/*",
          "*://*.o53xo.mrsxe4djmjxw64tvfzxxezy.*.*/*",
          "*://*.mrsxe4djmjxw64tvfzxxezy.*.*/*"
        ],
        exclude: [
          "*://trixiebooru.org/*.json",
          "*://derpibooru.org/*.json",
          "*://www.trixiebooru.org/*.json",
          "*://www.derpibooru.org/*.json",
          "*://*.o53xo.orzgs6djmvrg633souxg64th.*.json",
          "*://*.orzgs6djmvrg633souxg64th.*.json",
          "*://*.o53xo.mrsxe4djmjxw64tvfzxxezy.*.json",
          "*://*.mrsxe4djmjxw64tvfzxxezy.*.json"
        ],
        grant: ["GM_addStyle"],
        require:
          "https://github.com/stsyn/derpibooruscripts/raw/master/YouBooru/lib.js",
        downloadURL:
          "https://github.com/theguy159/YDBSlideshow/raw/master/dist/YDBSlideshow.user.js",
        updateURL:
          "https://github.com/theguy159/YDBSlideshow/raw/master/dist/YDBSlideshow.meta.js"
      }
    })
  ]
});
