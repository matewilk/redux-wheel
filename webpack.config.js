'use strict';

let path = require('path');

let config = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './app/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-es2015-destructuring', 'transform-object-rest-spread']
        }
      },
      {
        test: /\.(png|woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules'
      }
    ]
  },
  devServer: {
    contentBase: './public',
    proxy: {
      '*': 'http://localhost:3000'
    }
  }
};

module.exports = config;
