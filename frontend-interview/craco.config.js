const path = require("path");
const fs = require("fs");

const alias = {
  "@app": path.resolve(__dirname),
};
fs.readdirSync(__dirname)
  .filter(file => file.match(/quest\-\d+/))
  .map(file => ({ moduleName: file, path: path.resolve(__dirname, file) }))
  .filter(_module => fs.statSync(_module.path).isDirectory())
  .forEach(_module => (alias[`@${_module.moduleName}`] = _module.path));

module.exports = {
  devServer: {
    port: 5001,
  },
  webpack: {
    alias,
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
          include: /quest-1/,
          exclude: /(node_modules|bower_components|public)/,
          loader: "html-loader",
        },
      ];

      paths.appIndexJs = indexJsFile;
      paths.appSrc = path.resolve(__dirname);

      //console.log(webpackConfig);
      //console.log(paths);
      return webpackConfig;
    },
  },
};
