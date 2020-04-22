const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')


module.exports = {
  publicRuntimeConfig: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },

  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(localEnv)
    )
    return config;
  }
};
