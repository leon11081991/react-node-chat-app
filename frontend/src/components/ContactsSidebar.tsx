import { useState, useEffect } from "react"
import ContactsSidebarSkeleton from "./ContactsSidebarSkeleton"
import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"
import { DEFAULT_AVATAR } from "../constant"

const ContactsSidebar = () => { 
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const selectedUser = useChatStore((state) => state.selectedUser)
  const contactUsers = useChatStore((state) => state.contactUsers)
  const onlineContacts = useAuthStore((state) => state.onlineContacts)
  const getContactUsers = useChatStore((state) => state.getContactUsers)
  const setSelectedUser = useChatStore((state) => state.setSelectedUser)

  useEffect(()=>{
    getContactUsers()
  }, [getContactUsers])

  const filteredContacts = showOnlineOnly
    ? contactUsers.data.filter((user) => onlineContacts.includes(user._id))
    : contactUsers.data;

  if(contactUsers.isLoading)return <ContactsSidebarSkeleton/>

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          {/* <Users className="size-6" /> */}
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineContacts.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredContacts.map((contact) => (
          <button
            key={contact._id}
            onClick={() => setSelectedUser(contact)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === contact._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={contact.avatar || DEFAULT_AVATAR}
                alt={contact.username}
                className="size-12 object-cover rounded-full"
              />
              {onlineContacts.includes(contact._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{contact.username}</div>
              <div className="text-sm text-zinc-400">
                {onlineContacts.includes(contact._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredContacts.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
}
export default ContactsSidebar