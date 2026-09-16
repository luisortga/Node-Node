import http from 'node:http'
import { findAvailablePort } from './free-ports.js'

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log(`request received`)
  res.end('Hello World')
})

findAvailablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
})
