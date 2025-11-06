import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useEffect } from "react";

export function Transactions() {
  const { publish } = useEventEmitter();

  useEffect(() => {
    publish("title-change", { title: "Transactions" });
  }, []);

  return <div className="p-3 flex flex-col gap-4">Transactions</div>;
}
