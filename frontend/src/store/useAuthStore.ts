import { create } from "zustand";
import { useUserStore } from "./useUserStore.ts";
import axiosInstance from "../utils/api/axios-instance.ts";
import toast from "react-hot-toast";
import errorHandler from "../utils/api/error-handler.ts";

// todo: 將interface移到型別資料夾

interface LoadingMap {
  [key: string]: boolean;
}

type AuthStore = {
  loadingMap: LoadingMap;
  onlineContacts: any[]
  checkAuth: () => Promise<void>;
  signup: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  loadingMap: {},
  onlineContacts: [],

  checkAuth: async () => {
    console.log("checkAuth");

    useUserStore.getState().setAuthUserDataAndLoading(null, true)

    try {
      const res = await axiosInstance.get('/auth/checkAuth')
      console.log("checkAuth res", res);
      useUserStore.getState().setAuthUserDataAndLoading(res.data, false)
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
  }
}))