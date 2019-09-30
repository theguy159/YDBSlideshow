const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const WebpackUserscript = require("webpack-userscript");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist")
  },
  plugins: [
    new WebpackUserscript({
      pretty: true,
      metajs: true,
      headers: {
        version: `[version]-build.[buildNo]`,
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
        "run-at": "document-start",
        require:
          "https://github.com/stsyn/derpibooruscripts/raw/master/YouBooru/lib.js"
      }
    })
  ]
});
