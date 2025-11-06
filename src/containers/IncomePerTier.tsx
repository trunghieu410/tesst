import { useEffect, useState } from "react";

import { useEventEmitter } from "@/hooks/useEventEmitter";
import { Tabs } from "@/components/Tabs";
import { Alert } from "@/components/Alert";
import { PercentageInput } from "@/components/PercentageInput";

const tabs = [
  {
    id: "settings",
    label: "Cài đặt",
  },
  {
    id: "history",
    label: "Lịch sử thao tác",
  },
];

export function IncomePerTier() {
  const { publish } = useEventEmitter();
  const [tier1Value, setTier1Value] = useState("5.00");
  const [tier2Value, setTier2Value] = useState("3.00");
  const [tier3Value, setTier3Value] = useState("1.50");

  useEffect(() => {
    publish("title-change", {
      title: "Thu nhập mỗi tầng | Cài đặt",
      backRoute: "/dashboard/settings",
    });
  }, [publish]);

  return (
    <div className="flex flex-col items-start w-full">
      {/* Tab Navigation */}
      <Tabs defaultTab={"settings"} tabs={tabs}>
        {(activeTab) => {
          return (
            <>
              {/* Settings Tab Content */}
              {activeTab === "settings" && (
                <>
                  <Alert>
                    <p className="leading-4 mb-0">
                      Vào mỗi cuối ngày, hệ thống sẽ dựa vào cấu hình này để
                      cộng thêm thu nhập từ đội nhóm cho F0.
                    </p>
                    <p className="leading-4 mb-0">Giả sử:</p>
                    <ul className="list-disc">
                      <li className="mb-0 ml-5">
                        <span className="leading-4">
                          B là F1 của A; B kiếm được 5$ trong hôm nay.
                        </span>
                      </li>
                      <li className="ml-5">
                        <span className="leading-4">
                          Giả sử mức thu nhập của tầng 1 đang cài đặt là 5% → A
                          sẽ nhận được thêm 0.25$ vào cuối ngày hôm nay.
                        </span>
                      </li>
                    </ul>
                  </Alert>
                  <div className="flex flex-col items-start w-full">
                    <PercentageInput
                      label="Thu nhập được hưởng của tầng 1"
                      description="Thu nhập F0 tính trên % thu nhập của F1"
                      value={tier1Value}
                      onChange={setTier1Value}
                    />
                    <PercentageInput
                      label="Thu nhập được hưởng của tầng 2"
                      description="Thu nhập F0 tính trên % thu nhập của F2"
                      value={tier2Value}
                      onChange={setTier2Value}
                    />
                    <PercentageInput
                      label="Thu nhập được hưởng của tầng 3"
                      description="Thu nhập F0 tính trên % thu nhập của F3"
                      value={tier3Value}
                      onChange={setTier3Value}
                    />
                  </div>
                </>
              )}

              {/* History Tab Content - Placeholder */}
              {activeTab === "history" && (
                <div className="flex flex-col items-center justify-center w-full py-8">
                  <p className="text-[#677187] text-sm">
                    Lịch sử thao tác - Placeholder content
                  </p>
                </div>
              )}
            </>
          );
        }}
      </Tabs>
    </div>
  );
}
