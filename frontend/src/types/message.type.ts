export interface Message {
  _id: string
  senderId: string
  receiver: string
  text: string
  image: string
  createdAt: string
}

export type MessageData =
  | { text: string; image?: string }
  | { text?: string; image: string }