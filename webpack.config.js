const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const setMPA = require('./webpack.entry.js')
const { entry, htmlWebPackPlugins } = setMPA()
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry: entry,
  output: {
    filename: '[name]:[hash:6].js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
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
              plugins: [require('autoprefixer')]
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 750设计稿
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
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function () {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors) {
          console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
          // process.exit(66)
        } else {
          console.log('doneeeeeeeeeeeeeeeeeeeeeeee')
          // process.exit(0)
        }
      })
    },
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry:
            'https://unpkg.com/browse/react@16.13.1/umd/react.production.min.js',
          global: 'React'
        },
        {
          module: 'react-dom',
          entry:
            'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
          global: 'ReactDOM'
        }
      ]
    })
  ].concat(htmlWebPackPlugins),
  devServer: {
    port: 9000,
    stats: 'errors-only'
  },
  resolve: {
    modules: [path.resolve('node_modules')],
    extensions: ['.js', '.jsx', '.tsx', '.css', '.json', '.ts']
  },
  devtool: 'cheap-module-eval-source-map',
  // optimization: {
  //   splitChunks: {
  //     // minSize: 30000,
  //     // maxSize: 0,
  //     cacheGroups: {
  //       commons: {
  //         test: /(react|react-dom)/,
  //         name: 'hahaReact',
  //         chunks: 'all'
  //       }
  //     }

  //   }
  // }

  optimization: {
    minimizer: [
      // new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      minSize: 0,
      maxSize: 0,
      cacheGroups: {
        commons: {
          name: 'commonsLeon',
          chunks: 'all',
          minChunks: 1
        }
      }
    }
  }
}
