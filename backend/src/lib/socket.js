import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'

const app = express() // 創建Express應用程式
const httpServer = createServer(app) // 創建HTTP伺服器
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
  },
})

// 上線使用者
const userSocketMap = new Map() // 使用者ID與socket id的映射

// 連接事件
io.on('connection', (socket) => {
  console.log('A user connected', socket.id)

  // 握手取得使用者ID
  const userId = socket.handshake.query.userId
  if (userId) userSocketMap.set(userId, socket.id)

  // 發送上線通知
  io.emit('getOnlineUsers', Array.from(userSocketMap.keys()))

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id)
    userSocketMap.delete(userId)
    // 發送下線通知
    io.emit('getOnlineUsers', Array.from(userSocketMap.keys()))
  })
})

// 取得接收者socket id
const getReceiverSocketId = (userId) => {
  return userSocketMap.get(userId)
}

export { app, httpServer, io, getReceiverSocketId }
