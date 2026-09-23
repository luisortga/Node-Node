import express from 'express'
import helmet from 'helmet'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'
import morgan from 'morgan'

const app = express()
app.use(express.json())

app.use(helmet())
app.use(corsMiddleware())
app.disable('x-powered-by')
app.use(morgan('dev'))

app.get('/', (req, res) => {
  // red query params of format
  res.end('Movies Data')
})

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.use((req, res) => {
  res.status(404).send(`
    404
    Not Found try later
  `)
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
