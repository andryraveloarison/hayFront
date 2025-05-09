
import { Navigate } from "react-router-dom";
import { useAuth } from "../domain/context/AuthContext";
import { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
