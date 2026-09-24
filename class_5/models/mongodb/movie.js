import 'dotenv/config'
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
const uri = process.env.MONGODB_URI

// Es buena práctica verificar que la variable existe para evitar errores difíciles de rastrear
if (!uri) {
  throw new Error('Falta la variable de entorno MONGODB_URI en el archivo .env')
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function connect() {
  try {
    await client.connect()
    const database = client.db('database')
    return database.collection('movies')
  } catch (error) {
    console.error('Error conectando a la base de datos:', error.message)
    // Agrega esta línea para evitar el error "Cannot read properties of undefined"
    throw new Error('No se pudo establecer conexión con la base de datos')
  }
}

export class MovieModel {
  static async getAll({ genre }) {
    const db = await connect()

    if (genre) {
      return db
        .find({
          genre: {
            $elemMatch: {
              $regex: genre,
              $options: 'i',
            },
          },
        })
        .toArray()
    }

    return db.find({}).toArray()
  }

  static async getById({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    return db.findOne({ _id: objectId })
  }

  static async create({ input }) {
    const db = await connect()

    const { insertedId } = await db.insertOne(input)

    return {
      id: insertedId,
      ...input,
    }
  }

  static async delete({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })
    return deletedCount > 0
  }

  static async update({ id, input }) {
    const db = await connect()
    const objectId = new ObjectId(id)

    const { ok, value } = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnNewDocument: true },
    )

    if (!ok) return false

    return value
  }
}
