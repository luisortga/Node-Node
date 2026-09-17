import http from 'node:http'
import fs from 'node:fs'

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200 // Ok
    res.end('<h1>Welcome pipecoding</h1>')
  } else if (req.url === '/contact') {
    res.statusCode = 200 // Ok
    res.end('<h1>luisOrtga</h1>')
  } else if (req.url === '/studio.png') {
    fs.readFile('./logo.png', (err, data) => {
      // espacio reservado buffer : 010010001
      if (err) {
        res.statusCode = 500
        res.end('<h1>Decode image error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404 // Not Found
    res.setHeader('Content-Type', 'text/html; charset=utf-8') // Asegura que el navegador renderice HTML
    res.end(`
  <h1>404</h1>
  <img src="https://midu.dev/images/this-is-fine-404.gif" />
`)
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
