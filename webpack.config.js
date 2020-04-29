const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const setMPA = require('./webpack.entry.js')
console.log(setMPA)
const { entry, htmlWebPackPlugins } = setMPA()
console.log('entry', entry)
console.log(htmlWebPackPlugins)
module.exports = {
  entry: entry,
  output: {
    filename: '[name]:[chunkhash:6].js',
    path: path.resolve(__dirname , './dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,// 750设计稿
              remPrecision: 8
            }
          },
          'less-loader'
        ]
      },
      {
        test: /.(png|jpg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new CleanWebpackPlugin()

  ].concat(htmlWebPackPlugins),
  devServer: {
    port: 9000
  },
  // devtool: 'source-map'
}
