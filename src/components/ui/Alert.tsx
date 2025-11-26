import type { ReactNode } from "react";
import { InfoIcon } from "@/icon/InfoIcon";
import { tv } from "tailwind-variants";

const alert = tv({
  slots: {
    base: "bg-[#e6e9ed] flex gap-3 items-start px-3 py-2 w-full",
    iconWrapper: "flex-shrink-0 w-5 h-5 mt-0.5",
    icon: "w-5 h-5 text-[#021337]",
    content: "flex-1 text-sm leading-4 text-[#021337]",
  },
});

interface AlertProps {
  children: ReactNode;
  className?: string;
}

export function Alert({ children, className }: AlertProps) {
  const { base, iconWrapper, icon, content } = alert();

  return (
    <div className={base({ className })}>
      <div className={iconWrapper()}>
        <InfoIcon className={icon()} />
      </div>
      <div className={content()}>
        {children}
      </div>
    </div>
  );
}

