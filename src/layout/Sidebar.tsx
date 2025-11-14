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
import useClickOutside from "@/hooks/useClickOutside";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  hasSubmenu?: boolean;
  submenuItems?: { label: string; path: string }[];
}

const menuItems: MenuItem[] = [
  {
    id: "reports",
    label: "Báo cáo",
    icon: BarChart3Icon,
    path: "/dashboard/reports",
    hasSubmenu: true,
    submenuItems: [
      { label: "Publishers", path: "/dashboard/reports/publishers" },
      { label: "Chiến dịch", path: "/dashboard/reports/campaigns" },
    ],
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
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const submenuRef = useClickOutside<HTMLDivElement>(() => {
    setOpenSubmenu(null);
  });

  // Update collapsed state when screen size changes, unless user has manually overridden
  React.useEffect(() => {
    if (!userOverride) {
      setIsCollapsed(isMobile);
    }
  }, [isMobile, userOverride]);

  // Auto-open submenu if on a reports submenu page
  // React.useEffect(() => {
  //   const reportsItem = menuItems.find((item) => item.id === "reports");
  //   if (reportsItem?.hasSubmenu) {
  //     const isOnReportsSubmenu = reportsItem.submenuItems?.some(
  //       (subItem) =>
  //         location.pathname === subItem.path ||
  //         location.pathname.startsWith(subItem.path + "/")
  //     );
  //     if (isOnReportsSubmenu) {
  //       setOpenSubmenu("reports");
  //     } else {
  //       setOpenSubmenu(null);
  //     }
  //   }
  // }, [location.pathname]);

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

          const isSubmenuOpen = openSubmenu === item.id;
          const hasSubmenu = item.hasSubmenu && item.submenuItems;
          const Icon = item.icon;

          // Check if any submenu item is active
          const isSubmenuItemActive =
            hasSubmenu &&
            item.submenuItems?.some(
              (subItem) =>
                location.pathname === subItem.path ||
                location.pathname.startsWith(subItem.path + "/")
            );

          return (
            <div
              key={item.id}
              className="relative"
              ref={hasSubmenu ? submenuRef : undefined}
              // onMouseEnter={() =>
              //   hasSubmenu && !isCollapsed && setOpenSubmenu(item.id)
              // }
              // onMouseLeave={() => hasSubmenu && setOpenSubmenu(null)}
            >
              {hasSubmenu ? (
                <button
                  onClick={() => {
                    setOpenSubmenu(item.id);
                  }}
                  className={`h-10 px-3 py-1.5 rounded flex items-center gap-2.5 transition-colors cursor-pointer w-full ${
                    isActive || isSubmenuItemActive
                      ? "bg-[#ff3131] text-white"
                      : "text-[#021337] hover:bg-[#f1caca]"
                  }`}
                >
                  <Icon
                    classes={`w-5 h-5 shrink-0 ${
                      isActive || isSubmenuItemActive
                        ? "color-white"
                        : "color-[#021337]"
                    }`}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 font-medium text-sm leading-[18px] text-left">
                        {item.label}
                      </span>
                      <img
                        src={isSubmenuItemActive ? IconRightLight : IconRight}
                        alt="open"
                        className="w-4 h-4 shrink-0"
                      />
                    </>
                  )}
                </button>
              ) : (
                <Link
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
              )}

              {/* Submenu - positioned to the right */}
              {hasSubmenu && isSubmenuOpen && (
                <div className="absolute left-full top-0 ml-1 bg-white border-[0.5px] border-[#cfd6de] rounded-md overflow-hidden z-50 min-w-[200px] shadow-lg">
                  {item.submenuItems?.map((subItem) => {
                    const isSubItemActive =
                      location.pathname === subItem.path ||
                      location.pathname.startsWith(subItem.path + "/");

                    return (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        onClick={() => {
                          setOpenSubmenu(null);
                        }}
                        className={`relative flex items-center px-3 py-2.5 transition-colors ${
                          isSubItemActive
                            ? "bg-[#edf2fd]"
                            : "hover:bg-[#edf2fd]"
                        }`}
                      >
                        <span
                          className={`flex-1 font-normal text-sm leading-5 ${
                            isSubItemActive
                              ? "text-[#021337]"
                              : "text-[#021337]"
                          }`}
                        >
                          {subItem.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
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
