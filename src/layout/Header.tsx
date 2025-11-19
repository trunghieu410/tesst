import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ProfilePicture } from "@/components/ui/ProfilePicture";
import { Button } from "@/components/ui/Button";
import { useEventListener } from "@/hooks/useEventEmitter";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils/common";
import useClickOutside from "@/hooks/useClickOutside";

interface HeaderProps {
  defaultTitle?: string;
}

export function Header({ defaultTitle = "Publisher" }: HeaderProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [title, setTitle] = useState(defaultTitle);
  const [backRoute, setBackRoute] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(
    () => setIsDropdownOpen(false),
    { enabled: isDropdownOpen }
  );

  useEventListener(
    "title-change",
    (data: { title: string; backRoute?: string | null }) => {
      setTitle(data.title);
      setBackRoute(data.backRoute || null);
    }
  );

  // Outside click is handled by useClickOutside

  const handleBack = () => {
    if (backRoute) {
      navigate(backRoute);
    }
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  const handleAccount = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="h-[68px] border-b border-[#d0d5dd] bg-white flex items-center justify-between px-4 py-4.5">
      {/* Title */}
      <div className="flex items-center gap-2.5">
        {backRoute && (
          <button
            onClick={handleBack}
            className="w-8 h-8 flex items-center justify-center border border-[#cfd6de] rounded hover:bg-gray-50 cursor-pointer"
          >
            ←
          </button>
        )}
        <h1 className="font-semibold text-xl leading-7 text-[#021337]">
          {title}
        </h1>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-6 cursor-pointer">
        <div className="relative " ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
          >
            <ProfilePicture name="Katie Pena" size="medium" />
            <div className="flex flex-col gap-0.5">
              <p className="font-medium text-sm leading-5 text-[#021337]">
                Katie Pena
              </p>
              <div className="flex items-center gap-1">
                <p className="font-normal text-xs leading-4 text-[#677187]">
                  Hồ sơ
                </p>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 text-[#677187] transition-transform",
                    isDropdownOpen && "rotate-180"
                  )}
                />
              </div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAccount}
                className="w-full justify-start rounded-none hover:bg-[#f1caca]"
              >
                Tài khoản
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="w-full justify-start rounded-none hover:bg-[#f1caca]"
              >
                Đăng xuất
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
