import { useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore"

import Nav from "./components/Nav"
import AppRoutes from "./routes/AppRoutes"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"

const App = () => {
  const { authUser, checkAuth } = useAuthStore()

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
    <>
      <Nav user={authUser.data}/>
      <AppRoutes user={authUser.data}/>
      <Toaster/>
    </>
  )
}

export default App