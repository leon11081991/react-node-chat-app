import mongoose from 'mongoose'

// 定義UserSchema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    gender: {
      type: Number,
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
)

// 定義User模型
const User = mongoose.model('User', userSchema)

export default User
