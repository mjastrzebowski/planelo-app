var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    path.normalize('es6-shim/es6-shim.min'),
    'reflect-metadata',
    path.normalize('zone.js/dist/zone'),
    path.resolve('app/app')
  ],
  output: {
    path: path.resolve('www/build/js'),
    filename: 'app.bundle.js',
    pathinfo: false // show module paths in the bundle, handy for debugging
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'awesome-typescript',
        query: {
          doTypeCheck: false,
          useWebpackText: true
        },
        include: path.resolve('app'),
        exclude: /(node_modules)/
      }
    ],
    noParse: [
      /es6-shim/,
      /reflect-metadata/,
      /zone\.js(\/|\\)dist(\/|\\)zone-microtask/
    ]
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     sourceMap: false,
  //     mangle: true,
  //     compress: {
  //       dead_code: true, // eslint-disable-line camelcase
  //       screw_ie8: true, // eslint-disable-line camelcase
  //       unused: true,
  //       warnings: false
  //     }
  //   })
  // ],
  resolve: {
    alias: {
      'rx$': require.resolve('rxjs')
    },
    extensions: ['', '.js']
  }
};