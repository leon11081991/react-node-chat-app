import express from 'express'

import { protectRoute } from '../middleware/auth.middleware.js'
import { updateAvatarController } from '../controllers/user.controller.js'

/** 處理 user 相關路由：更新使用者資料 */
const router = express.Router()

// 更新使用者大頭貼
router.put('/updateAvatar', protectRoute, updateAvatarController)

export default router
