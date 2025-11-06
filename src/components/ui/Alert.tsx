import type { ReactNode } from "react";
import { InfoIcon } from "@/icon/InfoIcon";

interface AlertProps {
  children: ReactNode;
  className?: string;
}

export function Alert({ children, className }: AlertProps) {
  return (
    <div className={`bg-[#e6e9ed] flex gap-3 items-start px-3 py-2 w-full ${className || ""}`}>
      <div className="flex-shrink-0 w-5 h-5 mt-0.5">
        <InfoIcon className="w-5 h-5 text-[#021337]" />
      </div>
      <div className="flex-1 text-sm leading-4 text-[#021337]">
        {children}
      </div>
    </div>
  );
}
