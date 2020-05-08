if (typeof window === 'undefined') {
  global.window = {}
}
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server')
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8')
const server = (port) => {
  const app = express()
  app.use(express.static('dist'))
  app.get('/search', (req, res) => {
    const html = renderMarkuo(renderToString(SSR))
    res.status(200).send(html)
  })
  app.listen(port, () => {
    console.log('Server is running')
  })
}
const dataObj = require('./data.json')

server(process.env.PORT || 3001)
const renderMarkuo = (str) => {
  const data = JSON.stringify(dataObj)
  // return `<!DOCTYPE html>
  // <html lang="en">
  
  // <head>
  //   <meta charset="UTF-8">
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //   <title>Document</title>
  // </head>
  
  // <body>
  //   <div id="root1">${str}</div>
  // </body>
  
  // </html>`
  return template.replace('<!--HTML_PLACEHOLDER-->', str)
            .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>${data}</script>`)
}
