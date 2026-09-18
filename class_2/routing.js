import http from 'node:http'
import marvelJson from './marvel/marvel.json' with { type: 'json' }

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      //
      switch (url) {
        case '/':
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>Welcome to pipecoding</h1>')
        case '/marvel/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(marvelJson))
        default:
          res.statusCode = 404 // Not Found
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(`
  <h1>404</h1>
  <img src="https://midu.dev/images/this-is-fine-404.gif" />
`)
      }

    case 'POST':
      //
      switch (url) {
        case '/marvel':
          let body = ''

        //
      }
  }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log(`Server listening on port http://localhost:1234`)
})
