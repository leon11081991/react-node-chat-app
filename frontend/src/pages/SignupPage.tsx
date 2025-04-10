import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { EyeIcon, EyeClosedIcon, Loader2Icon } from "lucide-react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

interface FormData {
  username: string
  email: string
  password: string
  gender: number | null
}

const SignupPage = () => {
  const [ showPassword, setShowPassword ] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    gender: null
  })
  const { loadingMap, signup } = useAuthStore()

  const validateForm = () => {
    if(!formData.username.trim()) return toast.error("請輸入使用者名稱")
    if(!formData.email.trim()) return toast.error("請輸入 email")
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("請輸入有效的 email")
    if(!formData.password.trim()) return toast.error("請輸入密碼")
    return true
  }
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValid = validateForm()
    if(!isValid) return
    signup(formData)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2>註冊</h2>
          <p>免費加入！</p>
        </div>

        <form onSubmit={handleSignupSubmit}>
          <div className="form-control flex flex-col gap-4">
            {/* username */}
            <label className="label w-full flex flex-col items-start">
              <span className="label-text">使用者名稱</span>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="你的名字"
                  className="input input-bordered w-full pl-4"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </label>
            {/* email */}
            <label className="label w-full  flex flex-col items-start">
              <span className="label-text">email</span>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="xxx@youremail.com"
                  className="input input-bordered w-full pl-4"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </label>
            {/* password */}
            <label className="label w-full  flex flex-col items-start">
              <span className="label-text">密碼</span>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="input input-bordered w-full pl-4"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <span
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeClosedIcon/> : <EyeIcon/>}
                </span>
              </div>
            </label>
          </div>

          <button type="submit" disabled={loadingMap?.signup} aria-busy={loadingMap?.signup} className="btn btn-primary w-full mt-10">
            {loadingMap?.signup ? (
              <Loader2Icon className="animate-spin"  aria-label="註冊中..."/>
            ) : (
              "註冊"
            )}
          </button>
        </form>

        <div className="divider">OR</div>
        <div className="text-center">
          <p>已經有帳號?
            <Link to="/login" className="text-primary font-semibold"> 登入</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage