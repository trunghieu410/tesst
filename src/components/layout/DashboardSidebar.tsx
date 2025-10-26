import { Users, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

export function DashboardSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      title: "Users",
      icon: Users,
      href: "/dashboard/users",
    },
    {
      title: "Campaigns",
      icon: LayoutDashboard,
      href: "/dashboard/campaigns",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="font-semibold text-lg">AdminChain</div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="p-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname.startsWith(item.href)}
              >
                <Link to={item.href}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-accent">
              <Avatar className="size-8">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">
                  admin@example.com
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Settings className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} variant="destructive">
              <LogOut className="mr-2 size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
