import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Hello Node js!</h1>')
})

// end points
app.post('/login', (req, res) => {
  res.json({ user: 'ortega' })
})

app.post('/register', (req, res) => {
  const { username, password } = req.body
  console.log(req.body)

  try {
    const id = UserRepository.create({ username, password })
    res.send({ id })
  } catch (err) {
    res.status(400).send({ err })
  }
})

app.post('/logout', (req, res) => {})

app.get('/protected', (req, res) => {})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
