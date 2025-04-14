import { SunIcon, MoonIcon } from "lucide-react"

interface ThemeControllerProps {
  theme: string
  toggleTheme: () => void
}
const ThemeController = ({theme, toggleTheme}:ThemeControllerProps) => {
  return (
    <label className="swap swap-rotate">
    {/* this hidden checkbox controls the state */}
    <input type="checkbox" className="theme-controller" checked={theme === 'dark'} onChange={toggleTheme}/>

    {/* sun icon */}
    <SunIcon className={`swap-off fill-current`}/>

    {/* moon icon */}
    <MoonIcon className="swap-on fill-current"/>
  </label>
  )
}
export default ThemeController