import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import {
  checkAuthController,
  signupController,
  loginController,
  logoutController,
} from '../controllers/auth.controller.js'

/** 處理 auth 相關路由：註冊、登入、登出 */
const router = express.Router()

/** 設定路由 */

// 檢查使用者是否登入
router.get('/checkAuth', protectRoute, checkAuthController)
// 註冊
router.post('/signup', signupController)
// 登入
router.post('/login', loginController)
// 登出
router.post('/logout', logoutController)

export default router
