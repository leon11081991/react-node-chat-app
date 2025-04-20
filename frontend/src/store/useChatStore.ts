import { create } from "zustand"
import axiosInstance from "../utils/api/axios-instance"
import { toast } from "react-hot-toast"
import errorHandler from "../utils/api/error-handler"
import { data } from "react-router-dom"

interface Message {
  _id: string
  senderId: string
  receiver: string
  text: string
  image: string
  createdAt: string
}

interface ChatStore {
  messages: {
    data: Message[]
    isLoading: boolean
  },
  contactUsers: {
    data: any[]
    isLoading: boolean
  },
  selectedUser: any
  getContactUsers: () => Promise<void>
  getMessages: (userId: string) => Promise<void>
  sendMessage: (messageData: any) => Promise<void>
  setSelectedUser: (user: any) => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: {
    data: [],
    isLoading: false
  },
  contactUsers: {
    data: [],
    isLoading: false
  },
  selectedUser: null,

  getContactUsers: async () => {
    set((state) => ({
      contactUsers: {
        ...state.contactUsers,
        isLoading: true
      }
    }))
    try {
      const res = await axiosInstance.get('/message/contacts')
      set((state) => ({
        contactUsers: {
          ...state.contactUsers,
          data: res.data,
          isLoading: false
        }
      }))
    } catch (error) {
      set((state) => ({
        contactUsers: {
          ...state.contactUsers,
          isLoading: false
        }
      }))
      toast.error(errorHandler(error))
      console.error("Error during getContactUsers:", error);
    }
  },
  getMessages: async (userId) => {
    set((state) => ({
      messages: {
        ...state.messages,
        isLoading: true
      }
    }))
    try {
      const res = await axiosInstance.get(`/message/${userId}`)
      set((state) => ({
        messages: {
          ...state.messages,
          data: res.data,
          isLoading: false
        }
      }))
    } catch (error) {
      set((state) => ({
        messages: {
          ...state.messages,
          isLoading: false
        }
      }))
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get()
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
      set((state) => ({
        messages: {
          ...state.messages,
          data: [...state.messages.data, res.data]
        }
      }))
    } catch (error) {
      toast.error(errorHandler(error))
      console.error("Error during sendMessage:", error);
    }
  },
  setSelectedUser: (user) => set((state) => ({
    selectedUser: user
  }))
}))