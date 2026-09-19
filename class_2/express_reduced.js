import marvelJson from './marvel/marvel.json' with { type: 'json' }
import express from 'express'
const app = express()

const PORT = process.env.PORT ?? 1234
app.disable('x-powered-by')

app.use(express.json())

/*
// use === middleware
app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // only request of POST and header Content-Type : application/json

  let body = ''

  ...
  })
})
*/

app.get('/', (req, res) => {
  res.status(200).send('<h1>web pipecoding</h1>')
})

app.get('/marvel/ditto', (req, res) => {
  res.json(marvelJson)
})

app.post('/marvel', (req, res) => {
  res.status(201).json(req.body)
})

// last rout : use : * all method
app.use((req, res) => {
  res.status(404).send(`
  <h1>404</h1>
  <img src="https://midu.dev/images/this-is-fine-404.gif" />
`)
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
