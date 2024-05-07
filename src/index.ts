import dotenv from 'dotenv'
import express, { Application } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import deviceRouter from '@/routes/deviceRoute'

dotenv.config()
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME
const PORT = process.env.PORT

const app: Application = express()

app.use(express.json())
app.use(cors())

mongoose
  .connect(`mongodb+srv://bpthien21:zcAUQCmVMqSNqqYp@ac17.apw1jfi.mongodb.net/?retryWrites=true&w=majority&appName=AC17`)
  .then(() => console.log('Connected to AC Automatic DB!'))
  .catch(() => 'Failed to connect to DB')

app.use('/api/devices', deviceRouter)

app.listen(PORT, () => {
  console.log('SERVER IS UP ON PORT:', PORT)
})
