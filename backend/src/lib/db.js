import mongoose from 'mongoose'

// 連接DB
export const connectDB = async () => {
  try {
    // 與指定的MongoDB建立連接
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    console.log(`MongoDB連接成功: ${conn.connection.host}`)
  } catch (error) {
    console.error('MongoDB連接失敗:', error)
  }
}
