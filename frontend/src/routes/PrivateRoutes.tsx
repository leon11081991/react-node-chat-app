import { User } from "../types/user.type"
import { JSX } from "react";
import { Navigate } from "react-router-dom"

interface PrivateRoutesProps {
  user: User| null;
  children: JSX.Element;
}

const PrivateRoutes = ({user, children}:PrivateRoutesProps) => {
  return (
    <>
      {user ? children : <Navigate to="/login" />}
    </>
  )
}
export default PrivateRoutes