import axios from "axios";

// 建立axios實例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 設定API的基礎URL
  withCredentials: true, // 設定跨域請求時是否攜帶憑證
  timeout: 10000, // 設定請求超時時間
})

export default axiosInstance