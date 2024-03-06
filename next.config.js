const withLess = require('@zeit/next-less');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const lessToJS = require('less-vars-to-js');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
var fs = require('fs');
const path = require('path');
require('dotenv').config();
const Dotenv = require('dotenv-webpack');

const variables = './variables.scss';
const antVars = fs.readFileSync(variables, 'utf8');
const sass = antVars.replace(/\$/gi, '@');
const sassVars = lessToJS(sass);

const nextConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true,
    importLoaders: true,
    modifyVars: sassVars,
    strictMath: false,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true,
        }),
        new FilterWarningsPlugin({
          // ignore ANTD chunk styles [mini-css-extract-plugin] warning
          exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
        }),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }

    config.resolve.alias['utils'] = path.join(__dirname, 'utils');
    config.resolve.alias['store'] = path.join(__dirname, 'redux');
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['containers'] = path.join(__dirname, 'containers');
    config.resolve.alias['assets'] = path.join(__dirname, 'assets');
    return config;
  },
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    ENVIRONMENT: process.env.ENVIRONMENT,
    AUTH: process.env.AUTH,
    DEV_MODE: process.env.DEV_MODE,
  },
};

module.exports = withPlugins(
  [withSass, withImages, withLess, withCss],
  nextConfig
);
