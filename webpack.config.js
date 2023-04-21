const path = require("path");

module.exports = {
  entry: "./index.ts",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "@nikita_isay/binance_api_client",
    libraryTarget: "umd",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  optimization: {
    minimize: false,
  },
  externals: {
    ws: "ws",
    crypto: "crypto",
    axios: "axios",
    dotenv: "dotenv"
  },
  performance: {
    hints: false,
  },
  devtool: "source-map",
  stats: "minimal",
  ignoreWarnings: [
    {
      module: /node_modules\/ws/,
      message: /Critical dependency/,
    },
  ],
  watchOptions: {
    ignored: ["node_modules", "__tests__"],
  },
};
