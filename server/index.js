if (typeof window === 'undefined') {
  global.window = {}
}
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server')

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

server(process.env.PORT || 3001)
const renderMarkuo = (str) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  
  <body>
    <div id="root1">${str}</div>
  </body>
  
  </html>`
}
