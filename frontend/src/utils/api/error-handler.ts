import axios from "axios"

const errorHandler = (error: unknown) => {
  let errorMessage = "發生錯誤，請稍後再試"

  if (error instanceof Error) {
    errorMessage = error.message
  }
  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || errorMessage
  }
  return errorMessage
}

export default errorHandler