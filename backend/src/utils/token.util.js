import JWT from 'jsonwebtoken'

// 產生token
export const generateToken = ({ userId, res }) => {
  // 產生token
  const token = JWT.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRES_IN}d`,
  })

  // 設定cookie
  res.cookie('jwt', token, {
    httpOnly: true, // 預防XXS攻擊
    maxAge: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000, // 轉換為毫秒
    sameSite: 'strict', // 跨域請求允許
    secure: process.env.NODE_ENV !== 'dev', // 僅在正式環境以HTTPS下傳送cookie
  })

  return token
}
