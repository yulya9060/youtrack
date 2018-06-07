const rewireSass = require('react-app-rewire-sass');
const rewirePreact = require('react-app-rewire-preact');
const {injectBabelPlugin} = require('react-app-rewired');
const { compose } = require('react-app-rewired');
const rewireMobX = require('react-app-rewire-mobx');
const path = require("path");
const fs = require("fs");
const rewireBabelLoader = require("react-app-rewire-babel-loader");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
/* config-overrides.js */

module.exports = compose(
    rewireSass,
    rewirePreact,
    injectBabelPlugin,
    rewireBabelLoader,
    rewireMobX,
  
  );

module.exports = function override(config, env) {


    const rewires = compose(
        rewireSass,
        rewirePreact,
        injectBabelPlugin,
        rewireBabelLoader,
        rewireMobX,
        
      );

      config = injectBabelPlugin('emotion/babel',config)

      // use the Preact rewire
      if (env === "production") {
        console.log("⚡ Production build with Preact");
        config = rewirePreact(config, env);
      }

      config = rewireBabelLoader.include(
        config,
        resolveApp("node_modules/isemail")
      );

      config = rewireBabelLoader.exclude(
        config,
        /(node_modules|bower_components)/
      );
      return rewires(config, env);
}