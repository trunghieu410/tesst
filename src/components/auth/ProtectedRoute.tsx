import { useEffect, useState } from "react";
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
  const [isChecking, setIsChecking] = useState(true);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token && onUnauthenticated) {
      onUnauthenticated();
    }
    // Set checking to false after initial token verification
    setIsChecking(false);
  }, [token, onUnauthenticated]);

  // Show loading indicator while checking token
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!token) {
    return (
      <Navigate to="/" state={{ from: location, openLogin: true }} replace />
    );
  }

  return <>{children}</>;
}
