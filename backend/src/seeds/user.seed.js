import { config } from 'dotenv'
config()

const seedUsers = [
  {
    username: 'admin',
    email: 'admin@gmail.com',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    username: 'user',
    email: 'user@gmail.com',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    username: 'user2',
    email: 'user2@gmail.com',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    username: 'user3',
    email: 'user3@gmail.com',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    username: 'user4',
    email: 'user4@gmail.com',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    username: 'user5',
    email: 'user5@gmail.com',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
]

import { connectDB } from '../lib/db.js'
import User from '../models/user.model.js'

const seedDataBase = async () => {
  try {
    await connectDB()

    await User.insertMany(seedUsers)
    console.log('Users seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

seedDataBase()
