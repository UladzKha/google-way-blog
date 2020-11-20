import { MongoClient } from 'mongodb'

let uri = process.env.MONGODB_URI || "mongodb+srv://uladzik:C2KfbVayWbd9roCt@cluster0.p91jq.mongodb.net/uladz?retryWrites=true&w=majority"
let dbName = process.env.MONGODB_DB || "uladz"


let cachedClient = null
let cachedDb = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}
