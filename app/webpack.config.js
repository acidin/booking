var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var Autoprefixer = require('less-plugin-autoprefix')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    client: 'webpack-hot-middleware/client',
    index: './app/index',
    login: './app/login'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      filename: "common.js",
      name: "common"
    }),
    new ExtractTextPlugin("[name].css")
  ],
    lessLoader: {
        lessPlugins: [
            new Autoprefixer({
                browsers: ['last 2 versions', "ie >= 10"]
            })
        ]
    },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css?$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
        {
            test: /\.less/, loader: 'style-loader!css-loader!postcss-loader!less-loader', exclude: /node_modules/
        },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")
      }
    ]
  }
}
