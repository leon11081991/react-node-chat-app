import { useEffect, useRef } from "react"
import MessageSkeleton from "./skeleton/MessageSkeleton"
import ChatHeader from "./chat/ChatHeader"
import ChatMsgInput from "./chat/ChatMsgInput"
import { useUserStore } from "../store/useUserStore"
import { useChatStore } from "../store/useChatStore"
import { DEFAULT_AVATAR } from "../constant"
import CommonUtil from "../utils/CommonUtil"

const ChatContainer = () => {
  const messageContentRef = useRef<HTMLDivElement>(null)
  const authUser = useUserStore((state) => state.authUser)
  const selectedUser = useChatStore((state) => state.selectedUser)
  const messages = useChatStore((state) => state.messages)
  const getMessages = useChatStore((state) => state.getMessages)
  const subscribeToMessages = useChatStore((state) => state.subscribeToMessages)
  const unsubscribeFromMessages = useChatStore((state) => state.unsubscribeFromMessages)

  useEffect(() => {
    if (!selectedUser) return
    getMessages(selectedUser._id)
    // 訂閱新訊息
    subscribeToMessages()

    return () => {
      // 取消訂閱新訊息
      unsubscribeFromMessages()
    }
  },[selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages])

  useEffect(() => {
    // 收到新訊息 滾動到最下方
    if (messageContentRef.current) {
      messageContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages])

  if(messages.isLoading)return <div>Loading</div>

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>

      {
        messages.isLoading ? 
          <MessageSkeleton/> : 
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.data.map((message) => (
              <div
                ref={messageContentRef}
                key={message._id}
                className={`chat ${message.senderId === authUser.data?._id ? "chat-end" : "chat-start"}`}
              >
                <div className=" chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser.data?._id
                          ? authUser.data.avatar || DEFAULT_AVATAR
                          : selectedUser?.avatar || DEFAULT_AVATAR
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {CommonUtil.formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            ))}
          </div>
      }
      
      <ChatMsgInput/>
    </div>
  )
}
export default ChatContainer