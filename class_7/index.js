import express from 'express'
import { PORT } from './config.js'

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
})

app.post('/logout', (req, res) => {})

app.get('/protected', (req, res) => {})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
