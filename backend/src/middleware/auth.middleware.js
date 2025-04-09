import JWT from 'jsonwebtoken'
import User from '../models/user.model.js'

// 驗證token
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    // 沒有token
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token', errorCode: 401 })
    }

    // decode token
    const decoded = JWT.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token', errorCode: 401 })
    }

    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found', errorCode: 404 })
    }

    // 將使用者資料存入請求物件中
    req.user = user

    next()
  } catch (error) {
    console.error('Error in protectRoute:', error)
    return res.status(500).json({ message: 'Internal server error', errorCode: 500 })
  }
}
