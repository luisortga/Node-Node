import express from 'express'
import movies from './movies/movies.json' with { type: 'json' }

const app = express()
app.disable('x-powered-by')

app.get('/', (req, res) => {
  // red query params of format
  res.end('<h1>Movies Data</>')
})

app.get('/movies', (req, res) => {
  res.json(movies)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
