import express from 'express'
import logger from 'morgan'

const port = process.env.PORT ?? 3000

const app = express()
app.use(logger('dev'))

app.get('/', (req, res) => {
  res.send('<h1>Chat</h1>')
})

app.listen(port, (req, res) => {
  console.log(`Server running on port http://localhost:${port}`)
})
