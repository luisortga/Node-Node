import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(cookieParser())
dotenv.config()

app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, process.env.SECRET_JWT_KEY)
    req.session.user = data
  } catch {
    console.log()
  }

  next()
})

app.get('/', (req, res) => {
  const { user } = req.session
  res.render('index', user)
})

// end points
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_JWT_KEY,
      {
        expiresIn: '1h',
      },
    )
    res
      .cookie('access_token', token, {
        httpOnly: true, // la cookie solo se puede acceder en el servidor
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // la cookie solo se puede acceder en el mismo dominio
        maxAge: 1000 * 60 * 60, // la cookie tiene un tiempo de validez de 1 hora
      })
      .send({ user, token })
  } catch (err) {
    res.status(401).send(err.message)
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const id = await UserRepository.create({ username, password })
    res.send(201).json({ id })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('access_token').json({ message: 'logout successful' })
})

app.get('/protected', (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Access not authorized')
  res.render('protected', user)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

// puedes hacer que las cookies funcionen en tu dominio : cookies mas seguras que en local storage
