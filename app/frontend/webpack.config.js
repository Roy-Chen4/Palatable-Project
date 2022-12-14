/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `bundle.js`,
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: ['style-loader', "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        // NODE_ENV: JSON.stringify("release"),
      },
    }),
  ],
};