import crypto from 'node:crypto'

import DBLocal from 'db-local'
import bcrypt from 'bcrypt'

import { SALT_ROUNDS } from './config.js'
import { loadESLint } from 'eslint'
import { SocketAddress } from 'node:net'
const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
})
export class UserRepository {
  static async create({ username, password }) {
    // 1. validacion de username (use zod)
    Validation.username(username)
    Validation.password(password)

    // 2. asegurar que el username no existe
    const user = User.findOne({ username })
    if (user) throw new Error('username already exists')

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password: hashedPassword,
    }).save()

    return id
  }

  static login({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (!user) throw new Error('username does not exist')

    const isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) throw new Error('password is invalid')

    return user
  }
}

class Validation {
  static username(username) {
    if (typeof username !== 'string')
      throw new Error('username must be a string')
    if (username.length < 3)
      throw new Error('username must be at last 3 characters long')
  }

  static password(password) {
    if (typeof password !== 'string')
      throw new Error('password must be a string')
    if (password.length < 6)
      throw new Error('password must be at last 6 characters long')
  }
}
