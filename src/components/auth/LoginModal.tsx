import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AtSign,
  RefreshCw,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import okLogo from "@/assets/ok-logo.svg";

const emailSchema = z.object({
  email: z.string().email("Địa chỉ email không hợp lệ"),
});

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [step, setStep] = React.useState<"email" | "otp">("email");
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = React.useState(0);
  const { requestOtp, verifyOtp, isRequestingOtp, isVerifyingOtp } = useAuth();
  const otpInputs = React.useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
  });

  /**
   * Reset all modal state to initial values
   */
  const resetModalState = React.useCallback(() => {
    setStep("email");
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
    setCountdown(0);
    resetForm();
  }, [resetForm]);

  // Countdown timer
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Reset modal state when closed
  React.useEffect(() => {
    if (!open) {
      resetModalState();
    }
  }, [open, resetModalState]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const onEmailSubmit = (data: { email: string }) => {
    setEmail(data.email);
    requestOtp(data.email, {
      onSuccess: () => {
        setStep("otp");
        setCountdown(60);
      },
    });
  };

  /**
   * Xử lý khi thay đổi giá trị trong ô OTP
   */
  const handleOtpChange = (index: number, value: string) => {
    // Chỉ cho phép nhập 1 chữ số
    if (!/^[0-9]$/.test(value) && value !== "") {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Tự động chuyển focus sang ô tiếp theo nếu đã nhập
    if (value !== "" && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  /**
   * Xử lý khi bấm phím (Backspace) trong ô OTP
   */
  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      // Nếu ô hiện tại rỗng, lùi focus về ô trước đó
      if (otp[index] === "" && index > 0) {
        otpInputs.current[index - 1]?.focus();
      } else {
        // Nếu ô hiện tại có chữ, chỉ xóa chữ, không lùi focus
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  /**
   * Xử lý khi paste mã OTP vào ô input
   */
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Kiểm tra xem dữ liệu paste có phải là 6 chữ số không
    if (/^[0-9]{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      // Focus vào ô cuối cùng sau khi paste
      otpInputs.current[5]?.focus();
    }
  };

  const onOtpSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      verifyOtp(
        { email, otp: otpValue },
        {
          onSuccess: () => {
            onOpenChange(false); // Reset will happen automatically via useEffect
          },
        }
      );
    }
  };

  const handleResendOtp = () => {
    requestOtp(email, {
      onSuccess: () => {
        setCountdown(60);
        setOtp(["", "", "", "", "", ""]);
      },
    });
  };

  const handleChangeEmail = () => {
    setStep("email");
    setOtp(["", "", "", "", "", ""]);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-linear-to-br from-rose-500/20 via-orange-500/20 to-black/50 backdrop-blur-sm"
        // onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <div className="p-1 rounded-lg bg-white">
              <img src={okLogo} alt="OK Logo" className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {step === "email" ? "Đăng nhập tài khoản" : "Xác nhận tài khoản"}
              </h2>
              <p className="text-gray-600 text-base mt-1">
                {step === "email"
                  ? "Nhập email để nhận mã đăng nhập"
                  : <p>Chúng tôi đã gửi mã xác nhận đến <span className="text-[#7A4DFF]">{email}</span></p>}
              </p>
            </div>
          </div>
         
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "email" ? (
            <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-6">
              <div className="space-y-2">
                {/* <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  Email
                </label> */}
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <AtSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isRequestingOtp}
                style={{ background: 'linear-gradient(87deg, rgb(255, 59, 52) -0.68%, rgb(255, 132, 69) 144.62%)' }}
                className="w-full py-2.5 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 hover:brightness-110"
              >
                {isRequestingOtp ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Đang gửi OTP...
                  </>
                ) : (
                  <>
                    {/* <Send className="w-4 h-4" /> */}
                    Đăng nhập bằng email
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 text-center">
                  Nhập mã xác nhận
                </label>
                <div className="flex justify-center gap-2 py-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        otpInputs.current[index] = el;
                      }}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      onPaste={handleOtpPaste}
                      className="w-12 h-14 text-center text-xl font-bold bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ))}
                </div>
               
              </div>

              {/* {countdown > 0 ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-center text-sm text-gray-700 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Code expires in{" "}
                    <span className="font-mono font-bold text-blue-600">
                      {countdown}s
                    </span>
                  </p>
                </div>
              ) : ( */}
                <button
                  onClick={handleResendOtp}
                  disabled={isRequestingOtp}
                  className="w-full cursor-pointer py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isRequestingOtp ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Đang gửi lại OTP...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      Gửi lại mã xác nhận
                    </>
                  )}
                </button>

              <button
                onClick={onOtpSubmit}
                disabled={otp.join("").length !== 6 || isVerifyingOtp}
                style={{ background: 'linear-gradient(87deg, rgb(255, 59, 52) -0.68%, rgb(255, 132, 69) 144.62%)' }}
                className="w-full py-2.5 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isVerifyingOtp ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Đang xác minh...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Xác nhận & Đăng nhập
                  </>
                )}
              </button>

              <button
                onClick={handleChangeEmail}
                className="w-full cursor-pointer py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Sử dụng email khác
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
