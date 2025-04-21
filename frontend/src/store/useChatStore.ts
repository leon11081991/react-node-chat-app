import type { Message, MessageData } from "../types/message.type"
import type { User } from "../types/user.type"
import { create } from "zustand"
import axiosInstance from "../utils/api/axios-instance"
import { toast } from "react-hot-toast"
import errorHandler from "../utils/api/error-handler"
import { useAuthStore } from "./useAuthStore"

interface ChatStore {
  messages: {
    data: Message[]
    isLoading: boolean
  },
  contactUsers: {
    data: User[]
    isLoading: boolean
  },
  selectedUser: User | null
  getContactUsers: () => Promise<void>
  getMessages: (userId: string) => Promise<void>
  sendMessage: (messageData: MessageData) => Promise<void>
  subscribeToMessages: () => void
  unsubscribeFromMessages: () => void
  setSelectedUser: (user: User | null) => void
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
      toast.error(errorHandler(error))
      set((state) => ({
        messages: {
          ...state.messages,
          isLoading: false
        }
      }))
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser } = get()
    try {
      if (!selectedUser) return
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
  subscribeToMessages: () => {
    const { selectedUser } = get()
    if (!selectedUser) return

    const socket = useAuthStore.getState().socket
    if (!socket) return

    socket.on('newMessage', (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return // 如果訊息不是發給當前選擇的用戶，則忽略
      set((state) => ({
        messages: {
          ...state.messages,
          data: [...state.messages.data, newMessage]
        }
      }))
    })
  },
  unsubscribeFromMessages: () => {
    // 登出或切換聊天對象時取消訂閱
    const socket = useAuthStore.getState().socket
    if (!socket) return
    socket.off('newMessage')
  },
  setSelectedUser: (user) => set({
    selectedUser: user
  })
}))