import { MovieModel } from '../models/mongodb/movie.js'
// import { MovieModel } from '../models/local/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById(req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static async create(req, res) {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(422).json({
        error: result.error.issues,
      })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  static async delete(req, res) {
    const { id } = req.params

    const result = await MovieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.status(204).json({ message: 'Movie deleted' })
  }

  static async update(req, res) {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(422).json({
        error: result.error.issues,
      })
    }

    const { id } = req.params

    const updatedMovie = await MovieModel.update({ id, input: result.data })

    return res.json(updatedMovie)
  }
}
