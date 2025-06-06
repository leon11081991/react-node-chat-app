import type { Socket } from "socket.io-client";
import type { LoginData, SignupData } from "../types/user.type";
import { create } from "zustand";
import { useUserStore } from "./useUserStore.ts";
import axiosInstance from "../utils/api/axios-instance.ts";
import toast from "react-hot-toast";
import errorHandler from "../utils/api/error-handler.ts";
import { io } from "socket.io-client";

interface LoadingMap {
  [key: string]: boolean;
}

type AuthStore = {
  loadingMap: LoadingMap;
  onlineContacts: string[],
  socket: Socket | null,
  checkAuth: () => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  loadingMap: {},
  onlineContacts: [],
  socket: null,

  checkAuth: async () => {
    console.log("checkAuth");

    useUserStore.getState().setAuthUserDataAndLoading(null, true)

    try {
      const res = await axiosInstance.get('/auth/checkAuth')
      useUserStore.getState().setAuthUserDataAndLoading(res.data, false)

      get().connectSocket()
    } catch (error) {
      set((state) => ({
        loadingMap: {
          ...state.loadingMap,
          checkAuth: false
        }
      }))

      useUserStore.getState().setAuthUserDataAndLoading(null, false)
      console.error("Error checking authentication:", error);
    }
  },
  signup: async (data) => {
    set((state) => ({
      loadingMap: {
        ...state.loadingMap,
        signup: true
      }
    }))

    try {
      const res = await axiosInstance.post('/auth/signup', data);

      set((state) => ({
        loadingMap: {
          ...state.loadingMap,
          signup: false
        }
      }))

      useUserStore.getState().setAuthUserDataAndLoading(res.data, false)
      toast.success("註冊成功！")

      get().connectSocket()
    } catch (error) {
      set((state) => ({
        loadingMap: {
          ...state.loadingMap,
          signup: false
        }
      }))
      toast.error(errorHandler(error))
      console.error("Error during signup:", error);
    }
  },
  login: async (data) => {
    set((state) => ({
      loadingMap: {
        ...state.loadingMap,
        login: true
      }
    }))
    try {
      const res = await axiosInstance.post('/auth/login', data);

      set((state) => ({
        loadingMap: {
          ...state.loadingMap,
          login: false
        }
      }))

      useUserStore.getState().setAuthUserDataAndLoading(res.data, false)
      toast.success("登入成功！")

      get().connectSocket()
    } catch (error) {
      set((state) => ({
        loadingMap: {
          ...state.loadingMap,
          login: false
        }
      }))

      toast.error(errorHandler(error))
      console.error("Error during login:", error);
    }
  },
  logout: async () => {
    set((state) => ({
      loadingMap: {
        ...state.loadingMap,
        logout: true
      }
    }))
    try {
      await axiosInstance.post('/auth/logout');
      set((state) => ({
        loadingMap: {
          ...state.loadingMap,
          logout: false
        }
      }))

      useUserStore.getState().setAuthUserDataAndLoading(null, false)
      toast.success("登出成功！")

      get().disconnectSocket()
    } catch (error) {
      set((state) => ({
        loadingMap: {
          ...state.loadingMap,
          logout: false
        }
      }))

      toast.error(errorHandler(error))
      console.error("Error during logout:", error);
    }
  },
  connectSocket: () => {
    const { authUser } = useUserStore.getState()
    if (!authUser || get().socket?.connected) return

    const SOCKET_URL = import.meta.env.VITE_MODE === 'dev' ? import.meta.env.VITE_SOCKET_URL : '/'

    const socket = io(SOCKET_URL, {
      query: {
        userId: authUser.data?._id
      }
    })
    socket.connect()

    socket.on('connect', () => {
      console.log('Connected to Socket.io server!');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    set({ socket: socket });

    // 取得上線使用者
    socket.on('getOnlineUsers', (userIds) => {
      set({ onlineContacts: userIds })
    })
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect()
  }
}))