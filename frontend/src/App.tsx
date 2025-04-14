import { useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore"
import { useUserStore } from "./store/useUserStore"
import { ThemeProvider } from "./contexts/themeContext"

import Nav from "./components/Nav"
import AppRoutes from "./routes/AppRoutes"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"


const App = () => {
  console.log("App render");
  const authUser = useUserStore((state)=>state.authUser)
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(()=>{
    console.log("App useEffect");
    checkAuth()
  },[ checkAuth ]) 

  if (authUser.isLoading && !authUser.data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    )
  }

  return (
    <ThemeProvider>
      <Nav user={authUser.data}/>
      <AppRoutes user={authUser.data}/>
      <Toaster/>
    </ThemeProvider>
  )
}

export default App