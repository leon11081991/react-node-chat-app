import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'
import { generateToken } from '../utils/token.util.js'

export const checkAuthController = (req, res) => {
  try {
    console.log(req)
    return res.status(200).json(req.user)
  } catch (error) {
    console.error('Error in checkAuth controller:', error.message)
    return res.status(500).json({ message: 'Internal server error', errorCode: 500 })
  }
}

export const signupController = async (req, res) => {
  const { username, email, password, gender } = req.body
  try {
    // TODO: 檢查username, email, password 是否為空或是錯誤

    // 檢查密碼是否符合規定
    if (password.length < 8) {
      return res.status(400).json({ message: '密碼長度不足', errorCode: 1 })
    }

    // 檢查使用者是否已存在
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: '使用者已存在', errorCode: 2 })
    }

    // 將密碼進行雜湊處理
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // 建立新使用者
    const newUser = await User.create({
      username,
      email,
      gender,
      password: hashedPassword,
    })
    if (!newUser) {
      return res.status(400).json({ message: '註冊失敗: 使用者資料有誤', errorCode: 3 })
    }

    // 產生JWT token
    generateToken({ userId: newUser._id, res })

    // 註冊成功，回傳使用者資料
    return res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      gender: newUser.gender,
      avatar: newUser.avatar,
    })
  } catch (error) {
    console.error('Error in signup controller:', error.message)
    return res.status(500).json({ message: 'Internal server error', errorCode: 500 })
  }
}

export const loginController = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: '使用者不存在', errorCode: 1 })
    }

    // 檢查密碼是否正確
    const isPasswordMatched = await bcrypt.compare(password, user.password)
    if (!isPasswordMatched) {
      return res.status(400).json({ message: '密碼錯誤', errorCode: 2 })
    }

    // 產生JWT token
    generateToken({ userId: user._id, res })

    // 登入成功，回傳使用者資料
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      gender: user.gender,
      avatar: user.avatar,
    })
  } catch (error) {
    console.error('Error in login controller:', error.message)
    return res.status(500).json({ message: 'Internal server error', errorCode: 500 })
  }
}

export const logoutController = (req, res) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0,
    })
    return res.status(200).json({ message: '登出成功' })
  } catch (error) {
    console.error('Error in logout controller:', error.message)
    return res.status(500).json({ message: 'Internal server error', errorCode: 500 })
  }
}
