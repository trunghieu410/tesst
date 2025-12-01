import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEventEmitter, useEventListener } from "@/hooks/useEventEmitter";
import { cn } from "@/lib/utils/common";
import { UsersIcon } from "@/icon/UsersIcon";
import { BarChart3Icon } from "@/icon/BarChart3Icon";
import { TargetIcon } from "@/icon/TargetIcon";
import { CreditCardIcon } from "@/icon/CreditCardIcon";
import { WalletIcon } from "@/icon/WalletIcon";
import { SettingsIcon } from "@/icon/SettingsIcon";
import { BellIcon } from "@/icon/BellIcon";
import IconRight from "@/assets/IconRight.svg";
import IconRightLight from "@/assets/IconRightLight.svg";

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

export function MobileSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const { publish } = useEventEmitter();

  useEventListener("openSideBar", () => {
    setIsOpen(true);
  });

  useEventListener("closeSideBar", () => {
    setIsOpen(false);
  });

  const toggleSubmenu = (id: string) => {
    if (expandedMenu === id) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(id);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    publish("closeSideBar");
  };

  return (
    <div
      className={cn(
        "fixed inset-0 top-[68px] z-40 bg-white transition-transform duration-300 ease-in-out transform",
        isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"
      )}
    >
      <div className="flex flex-col h-full overflow-y-auto p-4">
        <div className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = item.path
              ? location.pathname === item.path ||
                location.pathname.startsWith(item.path + "/")
              : false;

            const hasSubmenu = item.hasSubmenu && item.submenuItems;
            const Icon = item.icon;
            const isExpanded = expandedMenu === item.id;

            // Check if any submenu item is active
            const isSubmenuItemActive =
              hasSubmenu &&
              item.submenuItems?.some(
                (subItem) =>
                  location.pathname === subItem.path ||
                  location.pathname.startsWith(subItem.path + "/")
              );
            
            // If submenu item is active, we might want to default expand it, 
            // but let's stick to user interaction for expansion or initial state if needed.
            // For now, manual expansion.

            if (hasSubmenu) {
              return (
                <div key={item.id} className="flex flex-col">
                  <button
                    onClick={() => toggleSubmenu(item.id)}
                    className={cn(
                      "h-12 px-3 py-2 rounded-lg flex items-center gap-3 transition-colors w-full",
                      isActive || isSubmenuItemActive
                        ? "bg-[#ff3131] text-white"
                        : "text-[#021337] hover:bg-[#f1caca]"
                    )}
                  >
                    <Icon
                      classes={cn(
                        "w-6 h-6 shrink-0",
                        isActive || isSubmenuItemActive ? "text-white" : "text-[#021337]"
                      )}
                    />
                    <span className="flex-1 font-medium text-base text-left">
                      {item.label}
                    </span>
                    <img
                      src={isActive || isSubmenuItemActive ? IconRightLight : IconRight}
                      alt="toggle"
                      className={cn(
                        "w-5 h-5 shrink-0 transition-transform duration-200",
                        isExpanded ? "rotate-90" : ""
                      )}
                    />
                  </button>
                  
                  {/* Submenu Items */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isExpanded ? "max-h-[200px] opacity-100 mt-1" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="flex flex-col gap-1 pl-4">
                      {item.submenuItems?.map((subItem) => {
                        const isSubItemActive =
                          location.pathname === subItem.path ||
                          location.pathname.startsWith(subItem.path + "/");

                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={handleLinkClick}
                            className={cn(
                              "flex items-center px-3 py-2.5 rounded-lg transition-colors",
                              isSubItemActive
                                ? "bg-[#edf2fd] text-[#021337]"
                                : "text-[#021337] hover:bg-[#edf2fd]"
                            )}
                          >
                            <span className="font-normal text-sm leading-5">
                              {subItem.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleLinkClick}
                className={cn(
                  "h-12 px-3 py-2 rounded-lg flex items-center gap-3 transition-colors",
                  isActive
                    ? "bg-[#ff3131] text-white"
                    : "text-[#021337] hover:bg-[#f1caca]"
                )}
              >
                <Icon
                  classes={cn(
                    "w-6 h-6 shrink-0",
                    isActive ? "text-white" : "text-[#021337]"
                  )}
                />
                <span className="flex-1 font-medium text-base">
                  {item.label}
                </span>
                <img
                  src={IconRightLight}
                  alt="arrow"
                  className="w-5 h-5 shrink-0"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
