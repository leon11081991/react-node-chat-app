import { useState } from "react"
import { Edit2Icon } from "lucide-react"
import { useUserStore } from "../store/useUserStore"
import toast from "react-hot-toast"
import { DEFAULT_AVATAR } from "../constant"

const ProfilePage = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null)
  const authUser = useUserStore((state) => state.authUser)
  const updateUserAvatar = useUserStore((state) => state.updateUserAvatar)
  const { data: user } = authUser

  const handleImageUpload = async(e: React.ChangeEvent<HTMLInputElement>)=>{
    console.log("handleImageUpdate");
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Img = reader.result as string
      console.log("base64Img",base64Img);
      await updateUserAvatar(base64Img)
      setSelectedImg(base64Img)
    }
    reader.onerror = () => {
      toast.error("讀取檔案失敗")
    }
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title">更新使用者資料</h2>

          {/* 大頭貼 */}
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img className="object-cover" src={selectedImg || user?.avatar ||DEFAULT_AVATAR} alt="大頭貼" />
                </div>
              </div>

              {/* 編輯按鈕 */}
              <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer">
                <Edit2Icon className="size-4"/>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  />
              </label>
            </div>
          </div>

          {/* 使用者名稱 */}
          <div className="flex flex-col">
            <div>使用者名稱</div>
            <div className="p-2 rounded-sm bg-base-200">
              <p className="">{user?.username}</p>
            </div>
          </div>

          {/* 信箱 */}
          <div className="flex flex-col">
            <div>email</div>
            <div className="p-2 rounded-sm bg-base-200">
              <p className="">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="card-body">
          <h2 className="card-title">帳號資訊</h2>
          {/* 帳號建立日期 */}
          <div className="flex flex-col">
            <div>帳號建立日期</div>
            <div className="p-2 rounded-sm bg-base-200">
              <p className="">2024-01-01</p>
            </div>
          </div>
          {/* 帳號狀態 */}
          <div className="flex flex-col">
            <div>帳號狀態</div>
            <div className="p-2 rounded-sm bg-base-200">
              <p className="">啟用</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage