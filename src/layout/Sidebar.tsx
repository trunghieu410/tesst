import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import okLogo from "../assets/ok-logo.svg";
import IconRight from "../assets/IconRight.svg";
import IconRightLight from "../assets/IconRightLight.svg";
import ToCloseMenu from "../assets/ToCloseMenu.svg";
import { UsersIcon } from "../icon/UsersIcon";
import { BarChart3Icon } from "../icon/BarChart3Icon";
import { TargetIcon } from "../icon/TargetIcon";
import { CreditCardIcon } from "../icon/CreditCardIcon";
import { WalletIcon } from "../icon/WalletIcon";
import { SettingsIcon } from "../icon/SettingsIcon";
import { useEventListener } from "../hooks/useEventEmitter";
import { BellIcon } from "@/icon/BellIcon";
import { useIsMobile } from "../hooks/use-mobile";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    id: "reports",
    label: "Báo cáo",
    icon: BarChart3Icon,
    path: "/dashboard/reports",
  },
  {
    id: "publishers",
    label: "Publishers",
    icon: UsersIcon,
    path: "/dashboard/publishers",
  },
  {
    id: "campaigns",
    label: "Chiến dịch",
    icon: TargetIcon,
    path: "/dashboard/campaigns",
  },
  {
    id: "transactions",
    label: "Giao dịch",
    icon: CreditCardIcon,
    path: "/dashboard/transactions",
  },
  {
    id: "notifications",
    label: "Thông báo",
    icon: BellIcon,
    path: "/dashboard/notifications",
  },
  { id: "wallet", label: "Ví", icon: WalletIcon, path: "/dashboard/wallet" },
  {
    id: "settings",
    label: "Cài đặt",
    icon: SettingsIcon,
    path: "/dashboard/settings",
  },
];

export function Sidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [userOverride, setUserOverride] = useState(false);

  // Update collapsed state when screen size changes, unless user has manually overridden
  React.useEffect(() => {
    console.log(
      "Sidebar effect - isMobile:",
      isMobile,
      "userOverride:",
      userOverride
    );
    if (!userOverride) {
      setIsCollapsed(isMobile);
    }
  }, [isMobile, userOverride]);

  useEventListener("closeSideBar", () => {
    setIsCollapsed(true);
    setUserOverride(true);
  });

  useEventListener("openSideBar", () => {
    setIsCollapsed(false);
    setUserOverride(true);
  });

  return (
    <div
      className={`bg-[#edf2fd] border-r border-[#d0d5dd] flex flex-col transition-all duration-200 ${
        isCollapsed ? "w-[70px]" : "w-[242px]"
      }`}
    >
      {/* Logo */}
      <div className="h-[68px] flex items-center gap-2.5 px-4">
        <img src={okLogo} alt="OK Logo" className="w-10 h-10 shrink-0" />
        {!isCollapsed && (
          <div className="flex flex-col gap-0.5">
            <p className="font-bold text-xl leading-7 text-[#021337]">
              OpenKingdom
            </p>
            <p className="font-bold text-xs leading-4 text-[#677187]">ADMIN</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1 flex flex-col gap-1 p-3">
        {menuItems.map((item) => {
          const isActive = item.path
            ? location.pathname === item.path ||
              location.pathname.startsWith(item.path + "/")
            : false;

          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`h-10 px-3 py-1.5 rounded flex items-center gap-2.5 transition-colors ${
                isActive
                  ? "bg-[#ff3131] text-white"
                  : "text-[#021337] hover:bg-[#f1caca]"
              }`}
            >
              <Icon
                classes={`w-5 h-5 shrink-0 ${
                  isActive ? "color-white" : "color-[#021337]"
                }`}
              />
              {!isCollapsed && (
                <>
                  <span className="flex-1 font-medium text-sm leading-[18px]">
                    {item.label}
                  </span>
                  {isActive ? (
                    <img
                      src={IconRightLight}
                      alt="open"
                      className="w-4 h-4 shrink-0"
                    />
                  ) : (
                    <img
                      src={IconRight}
                      alt="open"
                      className="w-4 h-4 shrink-0"
                    />
                  )}
                </>
              )}
            </Link>
          );
        })}
      </div>

      {/* Collapse Button */}
      <div className="p-3 pb-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-10 px-3 py-1.5 rounded flex items-center gap-2.5 text-[#021337] hover:bg-[#f1caca] transition-colors w-full cursor-pointer"
        >
          <img
            src={ToCloseMenu}
            alt="closeopen"
            className={`w-5 h-5 shrink-0 transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
          {!isCollapsed && (
            <span className="ml-2.5 font-medium text-sm leading-[18px]">
              Đóng menu
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
