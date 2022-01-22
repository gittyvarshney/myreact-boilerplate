
 const path = require('path');
 const webpack = require('webpack');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const CircularDependencyPlugin = require('circular-dependency-plugin');

 module.exports = require('./webpack.base.babel')({
    mode: 'development',
  
    entry: [
      'webpack-hot-middleware/client?reload=true',
      path.join(process.cwd(), 'src/app.js'), 
    ],
  
    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },
  
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  
    // Add development plugins
    plugins: [
      new webpack.HotModuleReplacementPlugin(), 
      new HtmlWebpackPlugin({
        inject: true, 
        template: 'src/index.html',
      }),
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/, 
        failOnError: false, 
      }),
    ],
  
    devtool: 'eval-source-map',
  
    performance: {
      hints: false,
    },
  });