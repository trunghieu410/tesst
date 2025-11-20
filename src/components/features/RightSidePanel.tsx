import { useState, type ReactNode, useRef } from "react";
import { useEventListener } from "@/hooks/useEventEmitter";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils/common";

interface RightSidePanelProps {
  children: ReactNode;
  className?: string;
}

export function RightSidePanel({ children, className }: RightSidePanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEventListener("show-right-panel", () => {
    setIsOpen(true);
  });

  useEventListener("hide-right-panel", () => {
    setIsOpen(false);
  });

  useClickOutside(
    () => {
      setIsOpen(false);
    },
    {
      enabled: isOpen,
    }
  );

  const customStyle = {
    boxShadow:
      "0 0 40px rgba(128, 128, 128, 0.5), -20px 0 40px rgba(128, 128, 128, 0.6)",
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        className={cn(
          `fixed top-0 left-0 h-screen w-full bg-[#f3f4f5] p-[5px] overflow-hidden
          transform transition-all duration-300 ease-in-out z-40 rounded-none
          md:right-0 md:left-auto md:w-auto md:rounded-l-3xl md:border-l-0 md:border-gray-600`,
          isOpen ? "translate-x-0" : "translate-x-full",
          className
        )}
        style={isOpen ? customStyle : {}}
      >
        {children}
      </div>
    </>
  );
}
