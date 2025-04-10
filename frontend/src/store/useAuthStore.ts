import { User } from "../types/user.type"
import { create } from "zustand";
import axiosInstance from "../utils/api/axios-instance.ts";
import toast from "react-hot-toast";
import errorHandler from "../utils/api/error-handler.ts";

// todo: 將interface移到型別資料夾
interface AuthUser {
  data: User | null;
  isLoading: boolean;
}

interface LoadingMap {
  [key: string]: boolean;
}

interface AuthStore {
  authUser: AuthUser;
  loadingMap: LoadingMap;
  checkAuth: () => Promise<void>;
  signup: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: {
    data: null,
    isLoading: true,
  },
  loadingMap: {},

  checkAuth: async () => {
    console.log("checkAuth");
    set((state) => ({
      authUser: {
        ...state.authUser,
        isLoading: true
      }
    }))
    try {
      const res = await axiosInstance.get('/auth/checkAuth');

      set({
        authUser: {
          data: res.data,
          isLoading: false
        }
      })
    } catch (error) {
      set((state) => ({
        loadingMap: {
          ...state.loadingMap,
          checkAuth: false
        },
        authUser: {
          data: null,
          isLoading: false
        }
      }))
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
        },
        authUser: {
          ...state.authUser,
          data: res.data
        }
      }))

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
        },
        authUser: {
          ...state.authUser,
          data: res.data
        }
      }))
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
        },
        authUser: {
          ...state.authUser,
          data: null
        }
      }))
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