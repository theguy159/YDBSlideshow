const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const version = JSON.stringify(require("./package.json").version);
const WebpackUserscript = require("webpack-userscript");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new WebpackUserscript({
      headers: {
        version: version,
        name: "YDBSlideshow",
        include: ["/http[s]*://(www.|)(trixie|derpi)booru.org/.*/"],
        exclude: [
          "/http[s]*://(www.|)(trixie|derpi)booru.org/adverts/.*/",
          "/http[s]*://(www.|)(trixie|derpi)booru.org/.*.json.*/"
        ],
        grant: ["GM_addStyle"],
        runAt: "document-end",
        require:
          "https://github.com/stsyn/derpibooruscripts/raw/master/YouBooru/lib.js",
        downloadURL:
          "https://github.com/theguy159/YDBSlideshow/raw/master/dist/YDBSlideshow.user.js",
        updateURL:
          "https://github.com/theguy159/YDBSlideshow/raw/master/dist/YDBSlideshow.meta.js"
      }
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
});
