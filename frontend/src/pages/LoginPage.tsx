import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Link } from "react-router-dom"
import { EyeClosedIcon, EyeIcon, Loader2Icon } from "lucide-react"
import toast from "react-hot-toast"

const LoginPage = () => {
  const [ showPassword, setShowPassword ] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { loadingMap,login } = useAuthStore()

  const validateForm = () => {
    if(!formData.email.trim()) return toast.error("請輸入 email")
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("請輸入有效的 email")
    if(!formData.password.trim()) return toast.error("請輸入密碼")
    return true
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("handleLogin");
    const isValid = validateForm()
    if(!isValid) return
    login(formData)
  }

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login</h1>
          <p className="py-6">立刻登入，開始使用ChatChat！</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">

            <form onSubmit={handleLoginSubmit}>
              <fieldset className="fieldset">
                <label className="label flex flex-col items-start">
                  <span className="label-text">Email</span>
                  <input 
                    type="email" 
                    className="input w-full" 
                    placeholder="xxx@youremail.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </label>

                <label className="label flex flex-col items-start">
                  <span className="label-text">密碼</span>
                  <div className="relative w-full">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="input w-full" 
                      placeholder="********" 
                      value={formData.password} 
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeClosedIcon/> : <EyeIcon/>}
                    </div>
                  </div>
                </label>
                
                {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                
                <div className="divider">OR</div>
                <div className="text-center">
                  <p>還沒有帳號?
                    <Link to="/signup" className="text-primary font-semibold"> 註冊</Link>
                  </p>
                </div>
                <button type="submit" className="btn btn-neutral mt-4" disabled={loadingMap.login}>
                  {loadingMap.login ? (
                    <Loader2Icon className="animate-spin"  aria-label="登入中..."/>
                  ) : (
                    <span>登入</span>
                  )}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginPage