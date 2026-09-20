import express from 'express'
import movies from './movies/movies.json' with { type: 'json' }
import crypto from 'node:crypto'
import { validateMovie } from './schemas/movies.js'

const app = express()

app.disable('x-powered-by')
app.use(express.json())

app.get('/', (req, res) => {
  // red query params of format
  res.end('<h1>Movies Data</>')
})

app.get('/movies', (req, res) => {
  const { genre, duration } = req.query

  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some(
        (g) => g.toLocaleLowerCase() === genre.toLocaleLowerCase(),
      ),
    )
    return res.json(filteredMovies)
  }

  if (duration) {
    const filteresDuration = movies.filter(
      (movie) => movie.duration === Number(duration), // casting Number(string)
    )

    return res.json(filteresDuration)
  }

  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  // ----> path-to-regexp
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    return res.status(422).json({
      error: result.error.issues,
    })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  }
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})

// genre=terror : filtro or query string
