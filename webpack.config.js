const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config.json')
const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    "./src/app/vendor.js",
    "./src/app/index.js"
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new webpack.ProvidePlugin({
        // inject ES5 modules as global vars
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Tether: 'tether'
    }),
    new HtmlWebpackPlugin({ template: "./src/public/index.html" }),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(config.API_URL[environment])
    }),
    new UglifyJsPlugin({ uglifyOptions: 
      { mangle: false }
    }),
  ],
  devServer: {
    contentBase:  path.join(__dirname, 'src/public'),
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.html$/,
        use: "raw-loader"
      },
    ]
  }
};