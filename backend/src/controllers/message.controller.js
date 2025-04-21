import cloudinary from '../lib/cloudinary.js'
import User from '../models/user.model.js'
import Message from '../models/message.model.js'
import { io, getReceiverSocketId } from '../lib/socket.js'

export const getContactsController = async (req, res) => {
  try {
    const loggedUserId = req.user._id
    const contacts = await User.find({ _id: { $ne: loggedUserId } }).select('-password')

    return res.status(200).json(contacts)
  } catch (error) {
    console.error('Error in getContacts controller:', error.message)
    return res.status(500).json({ message: 'Internal Server Error', errorCode: 500 })
  }
}

export const getMessagesController = async (req, res) => {
  try {
    const { contactId: userToChatId } = req.params
    const userId = req.user._id

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: userId },
      ],
    })

    return res.status(200).json(messages)
  } catch (error) {
    console.error('Error in getMessages controller:', error.message)
    return res.status(500).json({ message: 'Internal Server Error', errorCode: 500 })
  }
}

export const sendMessageController = async (req, res) => {
  try {
    const { text, image } = req.body
    const { contactId: receiverId } = req.params
    const senderId = req.user._id
    let imageUrl = null

    if (image) {
      const uploadResult = await cloudinary.uploader.upload(image)
      imageUrl = uploadResult.secure_url
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    })

    // 取得接收者socket id
    const receiverSocketId = getReceiverSocketId(receiverId)
    console.log('receiverSocketId', receiverSocketId)
    if (receiverSocketId) {
      // 如果接收者有上線
      io.to(receiverSocketId).emit('newMessage', newMessage) // 向接收者廣播新訊息
    }

    return res.status(201).json(newMessage)
  } catch (error) {
    console.error('Error in sendMessage controller:', error.message)
    return res.status(500).json({ message: 'Internal Server Error', errorCode: 500 })
  }
}
