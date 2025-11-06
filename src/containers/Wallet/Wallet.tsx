import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useEffect } from "react";

export function Wallet() {
  const { publish } = useEventEmitter();

  useEffect(() => {
    publish("title-change", { title: "Wallet" });
  }, []);

  return <div className="p-3 flex flex-col gap-4">Wallet</div>;
}
