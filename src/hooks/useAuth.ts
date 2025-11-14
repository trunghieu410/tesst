import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { useToast } from "@/context/toast/useToast";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const { success, error } = useToast();

  const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
  };

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const requestOtpMutation = useMutation({
    mutationFn: (email: string) => authApi.requestOtp(email),
    onError: () => {
      error("Failed to send OTP. Please try again.");
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authApi.verifyOtp(email, otp),
    onSuccess: (data) => {
      login(data.accessToken);
      success("Login successful");
      navigate("/dashboard");
    },
    onError: () => {
      error("Invalid OTP — please try again.");
    },
  });

  return {
    isAuthenticated,
    login,
    logout,
    requestOtp: requestOtpMutation.mutate,
    verifyOtp: verifyOtpMutation.mutate,
    isRequestingOtp: requestOtpMutation.isPending,
    isVerifyingOtp: verifyOtpMutation.isPending,
  };
}
