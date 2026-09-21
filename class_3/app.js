import express from 'express'
import cors from 'cors'
import movies from './movies/movies.json' with { type: 'json' }
import crypto from 'node:crypto'
import { validateMovie, validatePartialMovie } from './schemas/movies.js'

const app = express()

app.use(express.json())
app.use(cors())

app.disable('x-powered-by')
app.get('/', (req, res) => {
  // red query params of format
  res.end('<h1>Movies Data</>')
})

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:3000',
]

app.get('/movies', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
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

// delete
app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.status(204).json({ message: 'Movie deleted' })
})

// path
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(404).json({ error: JSON.parse(result.error.issues) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }

  res.send(202)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})

// genre=terror : filtro or query string
