import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  onUnauthenticated?: () => void;
}

export function ProtectedRoute({
  children,
  onUnauthenticated,
}: ProtectedRouteProps) {
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token && onUnauthenticated) {
      onUnauthenticated();
    }
  }, [token, onUnauthenticated]);

  if (!token) {
    return (
      <Navigate to="/" state={{ from: location, openLogin: true }} replace />
    );
  }

  return <>{children}</>;
}
