import express from 'express'

import { protectRoute } from '../middleware/auth.middleware.js'
import {
  getContactsController,
  getMessagesController,
  sendMessageController,
} from '../controllers/message.controller.js'

/** 處理 message 相關路由： */
const router = express.Router()

/** 設定路由 */
// 取得聯絡人
router.get('/contacts', protectRoute, getContactsController)
// 接收訊息
router.get('/:contactId', protectRoute, getMessagesController)
// 傳送訊息
router.post('/send/:contactId', protectRoute, sendMessageController)

export default router
