import 'dotenv/config'
import postgres from 'pg'

const dbConnection = new postgres.Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
})

export default dbConnection