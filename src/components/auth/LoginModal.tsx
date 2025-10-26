import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/useAuth";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [step, setStep] = React.useState<"email" | "otp">("email");
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [countdown, setCountdown] = React.useState(0);
  const { requestOtp, verifyOtp, isRequestingOtp, isVerifyingOtp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
  });

  // Countdown timer
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onEmailSubmit = (data: { email: string }) => {
    setEmail(data.email);
    requestOtp(data.email, {
      onSuccess: () => {
        setStep("otp");
        setCountdown(60);
      },
    });
  };

  const onOtpSubmit = () => {
    if (otp.length === 6) {
      verifyOtp(
        { email, otp },
        {
          onSuccess: () => {
            onOpenChange(false);
            setStep("email");
            setOtp("");
            setEmail("");
          },
        }
      );
    }
  };

  const handleResendOtp = () => {
    requestOtp(email, {
      onSuccess: () => {
        setCountdown(60);
        setOtp("");
      },
    });
  };

  const handleChangeEmail = () => {
    setStep("email");
    setOtp("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {step === "email" ? "Welcome Back" : "Verify Your Identity"}
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-base">
            {step === "email"
              ? "Enter your email address to receive a verification code"
              : `We've sent a 6-digit code to ${email}`}
          </DialogDescription>
        </DialogHeader>

        {step === "email" ? (
          <form
            onSubmit={handleSubmit(onEmailSubmit)}
            className="space-y-6 pt-2"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register("email")}
                aria-invalid={!!errors.email}
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 h-11"
              />
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <span>⚠</span> {errors.email.message as string}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium shadow-lg shadow-blue-500/20"
              disabled={isRequestingOtp}
            >
              {isRequestingOtp ? "Sending..." : "Send Verification Code"}
            </Button>
          </form>
        ) : (
          <div className="space-y-6 pt-2">
            <div className="space-y-3">
              <Label className="text-gray-700 font-medium text-center block">
                Enter Verification Code
              </Label>
              <div className="flex justify-center py-2">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  className="gap-2"
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot
                      index={0}
                      className="w-12 h-14 text-xl font-bold bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-12 h-14 text-xl font-bold bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-12 h-14 text-xl font-bold bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    <InputOTPSlot
                      index={3}
                      className="w-12 h-14 text-xl font-bold bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    <InputOTPSlot
                      index={4}
                      className="w-12 h-14 text-xl font-bold bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    <InputOTPSlot
                      index={5}
                      className="w-12 h-14 text-xl font-bold bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Use 123456 as the OTP for demo purposes
              </p>
            </div>

            {countdown > 0 ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-center text-sm text-gray-700">
                  Code expires in{" "}
                  <span className="font-mono font-bold text-blue-600">
                    {countdown}s
                  </span>
                </p>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={handleResendOtp}
                disabled={isRequestingOtp}
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                {isRequestingOtp ? "Resending..." : "Resend Code"}
              </Button>
            )}

            <Button
              onClick={onOtpSubmit}
              className="w-full h-11 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium shadow-lg shadow-blue-500/20"
              disabled={otp.length !== 6 || isVerifyingOtp}
            >
              {isVerifyingOtp ? "Verifying..." : "Verify & Login"}
            </Button>

            <Button
              variant="ghost"
              onClick={handleChangeEmail}
              className="w-full text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              Use a different email
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
