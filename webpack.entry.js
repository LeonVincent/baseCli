const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const projectRoot = process.cwd()
const path = require('path')

function setMPA() {
  const entry = {}
  const htmlWebPackPlugins = []
  const entryFiles = glob.sync(path.join(projectRoot, '/src/*/index.*'))
  console.log(entryFiles)
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index]
    const match = entryFile.match(/src\/(.*)\/index\.*/)
    const pageName = match && match[1]
    entry[pageName] = entryFile
    return htmlWebPackPlugins.push(
      new HtmlWebpackPlugin({
        inlineSource: '.css$',
        template: path.join(projectRoot, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['vendors', pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        }
      })
    )
  })
  return {
    entry,
    htmlWebPackPlugins
  }
}
// const { entry, htmlWebPackPlugins } = setMPA()
module.exports = setMPA