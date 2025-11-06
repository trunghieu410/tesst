import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useEffect } from "react";

export function Reports() {
  const { publish } = useEventEmitter();

  useEffect(() => {
    publish("title-change", { title: "Reports" });
  }, []);

  return <div className="p-3 flex flex-col gap-4">Reports</div>;
}
