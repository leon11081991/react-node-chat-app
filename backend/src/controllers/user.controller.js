import cloudinary from '../lib/cloudinary.js'

export const updateProfileController = async (req, res) => {
  try {
    const { avatar } = req.body
    const userId = req.user._id

    if (!avatar) {
      return res.status(400).json({ message: 'Avatar is required', errorCode: 400 })
    }

    // 上傳使用者圖像
    const uploadResult = await cloudinary.uploader.upload(avatar)
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { avatar: uploadResult.secure_url },
      { new: true },
    )

    return res.status(200).json(updateUser)
  } catch (error) {
    console.error('Error in updateProfile controller:', error.message)
    return res.status(500).json({ message: 'Internal server error', errorCode: 500 })
  }
}
