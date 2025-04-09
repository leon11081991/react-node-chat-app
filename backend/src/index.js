import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js'
import AuthRoutes from './routes/auth.route.js'
import UserRoutes from './routes/user.route.js'
import MessageRoutes from './routes/message.route.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json()) // 解析JSON請求體
app.use(cookieParser()) // 解析cookie

app.use('/api/auth', AuthRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/message', MessageRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  connectDB()
})
