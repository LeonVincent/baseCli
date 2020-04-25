const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle:[chunkhash:6].js',
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
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
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
    })
  ],
  devServer: {
    port: 9000
  },
  devtool: 'source-map'
}
