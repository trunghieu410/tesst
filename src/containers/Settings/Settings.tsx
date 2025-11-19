import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SettingsCard } from "@/components/ui/SettingsCard";
import { SiteMapIcon } from "@/icon/SiteMapIcon";
import { UserGroupIcon } from "@/icon/UserGroupIcon";
import { RoleDirectionIcon } from "@/icon/RoleDirectionIcon";
import { SiteBrandingIcon } from "@/icon/SiteBrandingIcon";

const settingsCards = [
  {
    title: "Thu nhập mỗi tầng",
    description: "Cài đặt mức chiết khấu thu nhập cho mỗi tầng",
    icon: <SiteMapIcon className="w-8 h-8 text-[#021337]" />,
    path: "/dashboard/settings/income-per-tier",
  },
  {
    title: "Tài khoản quản trị",
    description: "Quản lý tài khoản và quyền truy cập của quản trị viên",
    icon: <UserGroupIcon className="w-8 h-8 text-[#021337]" />,
    path: "/dashboard/settings/account-management",
  },
  {
    title: "Quyền, vai trò",
    description: "Cấu hình quyền hạn và vai trò trong hệ thống",
    icon: <RoleDirectionIcon className="w-8 h-8 text-[#021337]" />,
    path: "/dashboard/settings/role-management",
  },
  {
    title: "Branding site",
    description: "Tùy chỉnh giao diện và thương hiệu của trang web",
    icon: <SiteBrandingIcon className="w-8 h-8 text-[#021337]" />,
    path: "/dashboard/settings/branding-site",
  },
];

export function Settings() {
  const navigate = useNavigate();
  const { publish } = useEventEmitter();

  useEffect(() => {
    publish("title-change", { title: "Settings" });
  }, []);

  return (
    <div className="p-3 flex flex-row gap-4 flex-wrap">
      {settingsCards.map((card) => (
        <SettingsCard
          key={card.title}
          title={card.title}
          description={card.description}
          icon={card.icon}
          onClick={() => navigate(card.path)}
        />
      ))}
    </div>
  );
}
