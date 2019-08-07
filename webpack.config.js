const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output:{
    path: path.join(__dirname,'dist'),
    filename: 'index.js'
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use:{
          loader: 'html-loader',
          options:{
            minimize: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader,'css-loader']
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins:[
    new htmlWebpackPlugin({
      template:'./src/index.html',
      filename: './index.html'
    }),
    new miniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}