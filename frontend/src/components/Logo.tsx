import { MessageSquareIcon } from "lucide-react"

const LOGO_NAME = "ChatChat"

const Logo = () => {
  return (
    <div className="relative p-2 flex flex-col items-end text-xs font-bold group">
      <MessageSquareIcon className="absolute inset-y-0 -right-4 p-1 size-6 transition group-hover:animate-bounce"/>
      <span>{LOGO_NAME}</span>
    </div>
  )
}
export default Logo