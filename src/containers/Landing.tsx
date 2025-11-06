import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginModal } from "@/components/auth/LoginModal";

export function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    // Auto-open login modal if redirected from protected route
    if (location.state?.openLogin) {
      setLoginOpen(true);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen">
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
}
