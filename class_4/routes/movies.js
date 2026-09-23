import { Router } from 'express'
import movies from '../movies/movies.json' with { type: 'json' }
import crypto from 'node:crypto'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
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

moviesRouter.get('/:id', (res, req) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

moviesRouter.post('/', (req, res) => {
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

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.status(204).json({ message: 'Movie deleted' })
})

moviesRouter.patch('/:id', (req, res) => {
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
