/** @type {import('webpack').Configuration} */

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "App.tsx"),
  mode: "development",
  target: "web",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css)/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(glsl)/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: ["raw-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|otf)$/i,
        include: path.resolve(__dirname, "src"),
        type: "asset/resource",
        dependency: { not: ["url"] },
      },
    ],
  },
  resolve: {
    extensions: [".css", ".js", ".jsx", ".tsx", ".ts", ".cjs"],
    alias: {
      "tailwindcss/resolveConfig": "tailwindcss/resolveConfig.js",
      "~": path.resolve(__dirname),
    },
  },
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    filename: "bundle.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "index.html"), to: "index.html" },
        { from: path.resolve(__dirname, "src", "static/"), to: "static/" },
      ],
    }),
  ],
  resolve: {
    extensions: [".css", ".js", ".jsx", ".tsx", ".ts", ".cjs"],
    alias: {
      "tailwindcss/resolveConfig": "tailwindcss/resolveConfig.js",
      "~": path.resolve(__dirname),
    },
  },
  devServer: {
    static: path.resolve(__dirname, "../dist/client"),
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
};
