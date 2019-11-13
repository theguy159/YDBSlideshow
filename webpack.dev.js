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
        include: ["/http[s]*://(www.|)(trixie|derpi)booru.org/.*/"],
        exclude: [
          "/http[s]*://(www.|)(trixie|derpi)booru.org/adverts/.*/",
          "/http[s]*://(www.|)(trixie|derpi)booru.org/.*.json.*/"
        ],
        grant: ["GM_addStyle"],
        runAt: "document-end",
        require:
          "https://github.com/stsyn/derpibooruscripts/raw/master/YouBooru/lib.js"
      }
    })
  ]
});
