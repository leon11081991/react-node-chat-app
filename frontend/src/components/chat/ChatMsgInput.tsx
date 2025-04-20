import { useState, useRef } from "react"
import { useChatStore } from "../../store/useChatStore"
import { XIcon, SendIcon, ImageIcon } from "lucide-react"
import toast from "react-hot-toast"

const ChatMsgInput = () => {
  const [text, setText] = useState("")
  const [imgPreview, setImgPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const sendMessage = useChatStore((state) => state.sendMessage)

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64 = reader.result as string
        setImgPreview(base64)
      }
      reader.onerror = () => {
        toast.error("讀取檔案失敗")
      }
    }
  }
  const removeImg = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setImgPreview(null)
  }
  const handleSendMessage = async(e: React.FormEvent) => {
    e.preventDefault()
    if(!text.trim() && !imgPreview) return
    try {
      await sendMessage({ text: text.trim(), image: imgPreview })

      setText("")
      setImgPreview(null)
    } catch (error) {
      console.error('handleSendMessage fail',error)
    }
  }

  return (
    <div className="p-4 w-full">
      {imgPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imgPreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImg}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <XIcon className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="輸入訊息"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImgChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                      ${imgPreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imgPreview}
        >
          <SendIcon size={20} />
        </button>
      </form>
    </div>
  );
}
export default ChatMsgInput