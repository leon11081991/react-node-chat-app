import { User } from "../types/user.type"
import { JSX } from "react";
import { Navigate } from "react-router-dom"

interface GuestRouteGuardProps {
  user: User| null;
  children: JSX.Element;
}

const GuestRouteGuard = ({user, children}:GuestRouteGuardProps) => {
  return (
    <>
      {!user ? children : <Navigate to="/" />}
    </>
  )
}
export default GuestRouteGuard