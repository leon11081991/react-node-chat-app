import { User } from "../types/user.type"
import { Link } from "react-router-dom"
import Logo from "../components/Logo"
import ThemeController from "../components/ThemeController"
import { useAuthStore } from "../store/useAuthStore"
import { LogOutIcon, SquareUserIcon } from "lucide-react"
import { useThemeContext } from "../contexts/themeContext"

interface NavProps {
  user: User | null
}

const Nav = ({user}: NavProps) => {
  const { logout } = useAuthStore()
  const {theme, toggleTheme} = useThemeContext()

  return (
    <header>
      <div className="flex items-center gap-4 p-4 bg-gray-800 text-white">
        <Link to={"/"} className="mr-auto">
          <Logo/>
        </Link>

        <ThemeController theme={theme} toggleTheme={toggleTheme}/>

        {user && <Link to={"/profile"} className="btn btn-square btn-ghost border-none shadow-sm hover:bg-primary">
          <SquareUserIcon/>
        </Link>}

        <div className="btn btn-square btn-ghost border-none shadow-sm hover:bg-secondary">
          <LogOutIcon onClick={logout}/>
        </div>
      </div>
    </header>
  )
}
export default Nav