const webpack = require('webpack')

const ENTRY_DIR = __dirname + '/client/src';
const OUTPUT_DIR = __dirname + '/public';

const config = {
  entry: ENTRY_DIR + '/index.jsx',
  module: {
    rules:
    [{
      test: /\.jsx?/,
      include: ENTRY_DIR,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    }]
  },
  output: {
    path: OUTPUT_DIR,
    filename: 'bundle.js'
  }
}

module.exports = config;