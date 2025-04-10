import { User } from "../types/user.type"
import { Routes, Route } from "react-router-dom"

import PrivateRoutes from "../routes/PrivateRoutes"
import GuestRouteGuard from "../routes/GuestRouteGuard"
import HomePage from "../pages/HomePage"
import SignupPage from "../pages/SignupPage"
import LoginPage from "../pages/LoginPage"
import ProfilePage from "../pages/ProfilePage"
import SettingPage from "../pages/SettingPage"

interface AppRoutesProps {
  user: User | null
}

const AppRoutes = ({user}:AppRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoutes user={user}>
          <HomePage/>
        </PrivateRoutes>}
      />  

      <Route path="/signup" element={
        <GuestRouteGuard user={user}>
          <SignupPage/>
        </GuestRouteGuard>} 
      />

      <Route path="/login" element={
        <GuestRouteGuard user={user}>
          <LoginPage/>
        </GuestRouteGuard>}
      />

      <Route path="/setting" element={
        <PrivateRoutes user={user}>
          <SettingPage/>
        </PrivateRoutes>}
      />
      
      <Route path="/profile" element={
        <PrivateRoutes user={user}>
          <ProfilePage/>
        </PrivateRoutes>}
      />
    </Routes>
  )
}
export default AppRoutes