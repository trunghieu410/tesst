import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useEffect } from "react";

export function ReportsCampaigns() {
  const { publish } = useEventEmitter();

  useEffect(() => {
    publish("title-change", { title: "Chiến dịch" });
  }, [publish]);

  return (
    <div className="p-3 flex flex-col gap-4">
      <div className="bg-white rounded-md p-8 text-center">
        <p className="text-[#677187] text-lg">
          Campaign reports coming soon...
        </p>
      </div>
    </div>
  );
}
