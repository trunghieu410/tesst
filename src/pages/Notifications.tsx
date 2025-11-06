import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useEffect } from "react";

export function Notifications() {
  const { publish } = useEventEmitter();

  useEffect(() => {
    publish("title-change", { title: "Thông báo" });
  }, []);

  return <div className="p-3 flex flex-col gap-4">Thông báo</div>;
}
