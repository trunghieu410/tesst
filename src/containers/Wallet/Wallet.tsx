import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useEffect, useState } from "react";
import { RightSidePanel } from "@/components/features/RightSidePanel";
import { WalletDetails } from "./WalletDetails";
import { CurrencyDetails } from "./CurrencyDetails";
import { WalletUsers } from "./WalletUsers";
import { WalletCurrency } from "./WalletCurrency";
import { Tabs } from "@/components/ui/Tabs";

export function Wallet() {
  const { publish } = useEventEmitter();
  const [activeTab, setActiveTab] = useState<"users" | "currency">("users");

  useEffect(() => {
    publish("title-change", { title: "Ví" });
  }, [publish]);

  const handleUserSelect = (userId: number) => {
    publish("show-right-panel", userId.toString());
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Wallet Section */}
      <Tabs
        tabs={[
          { id: "users", label: "Người dùng" },
          { id: "currency", label: "Đơn vị tiền" },
        ]}
        defaultTab="users"
        onTabChange={(tabId) => setActiveTab(tabId as "users" | "currency")}
      >
        {() => (
          <div className="flex flex-col gap-4 border-t border-[#CFD6DE] p-3 w-full">
            {activeTab === "users" ? (
              <WalletUsers onUserSelect={handleUserSelect} />
            ) : (
              <WalletCurrency />
            )}
          </div>
        )}
      </Tabs>

      {/* Right-side Panel */}
      <RightSidePanel>
        <WalletDetails />
        <CurrencyDetails />
      </RightSidePanel>
    </div>
  );
}
