import { cn } from "@/lib/utils/common";
import { useState } from "react";
import { Button } from "./Button";

interface TabItem {
  id: string;
  label: string;
  isActive?: boolean;
  iconBadge?: () => React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab: string;
  className?: string;
  children: (activeTab: string) => React.ReactNode;
  onTabChange?: (tabId: string) => void;
}

export function Tabs({
  tabs,
  defaultTab,
  className,
  children,
  onTabChange,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className={cn(className, "flex flex-col items-start w-full")}>
      <div className="flex px-4 w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          // const IconBadge = tab.iconBadge;
          return (
            <Button
              key={tab.id}
              variant="tab"
              isActive={isActive}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
              {tab.iconBadge && tab.iconBadge()}
            </Button>
          );
        })}
      </div>
      {children(activeTab)}
    </div>
  );
}
