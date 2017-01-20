'use strict';

let path = require('path');

module.exports = {
  entry: [
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
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/
      }
    ]
  }
};
