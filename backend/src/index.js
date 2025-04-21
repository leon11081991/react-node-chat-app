import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, httpServer } from './lib/socket.js'
import { connectDB } from './lib/db.js'
import AuthRoutes from './routes/auth.route.js'
import UserRoutes from './routes/user.route.js'
import MessageRoutes from './routes/message.route.js'

dotenv.config()
// const app = express()
const PORT = process.env.PORT

app.use(express.json({ limit: '10mb' }))
app.use(express.json()) // 解析JSON請求體
app.use(cookieParser()) // 解析cookie
app.use(
  cors({
    origin: 'http://localhost:5173', // 允許的來源
    credentials: true, // 允許攜帶cookie
  }),
)

app.use('/api/auth', AuthRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/message', MessageRoutes)

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  connectDB()
})
