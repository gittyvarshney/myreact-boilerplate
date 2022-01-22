
 const path = require('path');
 const webpack = require('webpack');
 
 module.exports = options => ({
   mode: options.mode,
   entry: options.entry,
   output: Object.assign(
     {
       // Compile into build/
       path: path.resolve(process.cwd(), 'build'),
       publicPath: '/',
     },
     options.output,
   ), // Merge with env dependent settings
   optimization: options.optimization,
   module: {
       rules: [
           {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader'
              }
           },
           {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(eot|otf|ttf|woff|woff2)$/,
            type: 'asset/resource',
          },
          {
            test: /\.svg$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10*1024
              }
            }
          },
          {
            test: /\.(jpg|png|gif)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10*1024
              }
            },
            use: {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4,
                },
                webp:{
                  quality: 75
                }
              }
            }
          },
          {
            test: /\.html$/,
            use: 'html-loader',
          },
          {
            test: /\.(mp4|webm)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10*1024
              }
            }
          }
       ]
   },
   plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ]),
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },

  devtool: options.devtool,
  performance: options.performance || {},
})