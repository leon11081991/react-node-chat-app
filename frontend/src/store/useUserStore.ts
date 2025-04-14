import { User } from "../types/user.type"
import { create } from "zustand"
import axiosInstance from "../utils/api/axios-instance"
import toast from "react-hot-toast";

interface AuthUser {
  data: User | null;
  isLoading: boolean;
}

type UserStore = {
  authUser: AuthUser;
  setAuthUserDataAndLoading: (data: User | null, loadingState: boolean) => void;
  updateUserAvatar(imgUrl: string): Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  authUser: {
    data: null,
    isLoading: true,
  },
  setAuthUserDataAndLoading: (data, loadingState) => set((state) => ({
    authUser: {
      ...state.authUser,
      data,
      isLoading: loadingState
    }
  })),

  updateUserAvatar: async (imgUrl: string) => {
    console.log("updateUserAvatar");
    try {
      const res = await axiosInstance.put("/user/updateAvatar", {
        avatar: imgUrl
      })
      toast.success("更新大頭貼成功")
    } catch (error) {
      console.error("updateUserAvatar error", error);
      toast.error("更新大頭貼失敗")
    }
  }

}))