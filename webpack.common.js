const path = require("path");
const webpack = require("webpack");
const version = JSON.stringify(require("./package.json").version);
const WebpackUserscript = require("webpack-userscript");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["to-string-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    ]
  },
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "YDBSlideshow.user.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: version
    })
  ]
};
