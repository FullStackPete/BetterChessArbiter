import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ReactNode } from "react";

type RequireAuthType = {
  requiredRole: string;
  children: ReactNode;
};

function RequireAuth({ requiredRole, children }: RequireAuthType) {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/unauthorized" />;
  }

  // Check if user has required role
  if (!auth.role || auth.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default RequireAuth;
