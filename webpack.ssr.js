const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const setMPA = require('./webpack.entry.js')
const src1 = './src/*/index-server.js'
const { entry, htmlWebPackPlugins } = setMPA({
  src1: './src/*/index-server.tsx',
  src2: /src\/(.*)\/index-server\.tsx/
})
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry: entry,
  output: {
    filename: '[name]-server.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd'
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

// const glob = require('glob')
// const path = require('path')
// const webpack = require('webpack')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

// const setMPA = () => {
//   const entry = {}
//   const htmlWebpackPlugins = []
//   const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.tsx'))

//   Object.keys(entryFiles).map((index) => {
//     const entryFile = entryFiles[index]
//     // '/Users/cpselvis/my-project/src/index/index.js'

//     const match = entryFile.match(/src\/(.*)\/index-server\.tsx/)
//     const pageName = match && match[1]

//     if (pageName) {
//       entry[pageName] = entryFile
//       htmlWebpackPlugins.push(
//         new HtmlWebpackPlugin({
//           inlineSource: '.css$',
//           template: path.join(__dirname, `src/${pageName}/index.html`),
//           filename: `${pageName}.html`,
//           chunks: ['vendors', pageName],
//           inject: true,
//           minify: {
//             html5: true,
//             collapseWhitespace: true,
//             preserveLineBreaks: false,
//             minifyCSS: true,
//             minifyJS: true,
//             removeComments: false
//           }
//         })
//       )
//     }
//   })

//   return {
//     entry,
//     htmlWebpackPlugins
//   }
// }

// const { entry, htmlWebpackPlugins } = setMPA()

// module.exports = {
//   entry: entry,
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: '[name]-server.js',
//     libraryTarget: 'umd'
//   },
//   mode: 'none',
//   module: {
//     rules: [
//       {
//         test: /.js$/,
//         use: [
//           'babel-loader'
//           // 'eslint-loader'
//         ]
//       },
//       {
//         test: /.css$/,
//         use: [MiniCssExtractPlugin.loader, 'css-loader']
//       },
//       {
//         test: /.less$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           'css-loader',
//           'less-loader',
//           {
//             loader: 'postcss-loader',
//             options: {
//               plugins: () => [
//                 require('autoprefixer')({
//                   browsers: ['last 2 version', '>1%', 'ios 7']
//                 })
//               ]
//             }
//           },
//           {
//             loader: 'px2rem-loader',
//             options: {
//               remUnit: 75,
//               remPrecision: 8
//             }
//           }
//         ]
//       },
//       {
//         test: /.(png|jpg|gif|jpeg)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name]_[hash:8].[ext]'
//             }
//           }
//         ]
//       },
//       {
//         test: /.(woff|woff2|eot|ttf|otf)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name]_[hash:8][ext]'
//             }
//           }
//         ]
//       },
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader'
//       }
//     ]
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: '[name]_[contenthash:8].css'
//     }),
//     new OptimizeCSSAssetsPlugin({
//       assetNameRegExp: /\.css$/g,
//       cssProcessor: require('cssnano')
//     }),
//     new CleanWebpackPlugin(),
//     // new HtmlWebpackExternalsPlugin({
//     //     externals: [
//     //       {
//     //         module: 'react',
//     //         entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
//     //         global: 'React',
//     //       },
//     //       {
//     //         module: 'react-dom',
//     //         entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
//     //         global: 'ReactDOM',
//     //       },
//     //     ]
//     // }),
//     new FriendlyErrorsWebpackPlugin(),
//     function () {
//       this.hooks.done.tap('done', (stats) => {
//         if (
//           stats.compilation.errors &&
//           stats.compilation.errors.length &&
//           process.argv.indexOf('--watch') == -1
//         ) {
//           console.log('build error')
//           process.exit(1)
//         }
//       })
//     }
//   ].concat(htmlWebpackPlugins),
//   // optimization: {
//   //     splitChunks: {
//   //         minSize: 0,
//   //         cacheGroups: {
//   //             commons: {
//   //                 name: 'commons',
//   //                 chunks: 'all',
//   //                 minChunks: 2
//   //             }
//   //         }
//   //     }
//   // }
//   stats: 'errors-only'
// }
