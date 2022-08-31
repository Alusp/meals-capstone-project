const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyCSS = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[contenthash][ext][query]',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new MinifyCSS(),
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        minify: {
          removeAttributionQuotes: true,
          collapseWhitespaces: true,
          removeComments: true,
        }
      })
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), 
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
});