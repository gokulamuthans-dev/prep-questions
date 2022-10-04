const path = require("path");

module.exports = {
  devServer: {
    port: 5001,
  },
  webpack: {
    alias: {
      "@app": path.resolve(__dirname),
      "@quest-1": path.resolve(__dirname, "quest-1"),
    },
    configure: (webpackConfig, { env, paths }) => {
      const indexJsFile = path.resolve(__dirname, "index.js");

      webpackConfig.entry = indexJsFile;
      webpackConfig.module.rules = [
        ...(webpackConfig.module.rules ?? []),
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: { presets: ["@babel/env", "@babel/preset-react"] },
        },
        {
          test: /\.html$/,
          exclude: /(node_modules|bower_components|public)/,
          loader: "html-loader",
        },
      ];

      paths.appIndexJs = indexJsFile;
      paths.appSrc = path.resolve(__dirname);

      //console.log(webpackConfig);
      return webpackConfig;
    },
  },
};
