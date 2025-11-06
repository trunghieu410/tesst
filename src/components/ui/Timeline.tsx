import type { ReactNode, ComponentType } from "react";
import { cn } from "@/lib/utils/common";
import { ChevronRightIcon } from "@/icon/ChevronRightIcon";
import { Button } from "./Button";
import { OpenKingdomIcon } from "@/icon/OpenKingdomIcon";
import { LinkIcon } from "@/icon/LinkIcon";
import { LinkHrefIcon } from "@/icon/LinkHrefIcon";

export interface TimelineItem {
  timestamp: string;
  description: string | ReactNode;
  reason?: string | ReactNode;
  link?: string;
}

interface TimelineProps {
  title?: string;
  items: TimelineItem[];
  maxHeight?: string;
  className?: string;
  isDetailButton?: boolean;
  icon: ComponentType<{ className: string }>;
  counter?: number;
}

export function Timeline({
  title,
  items,
  maxHeight = "250px",
  className,
  icon,
  counter,
  isDetailButton = false,
}: TimelineProps) {
  const Icon = icon;
  return (
    <div className={cn("", className)}>
      {title && (
        <div className="flex items-center gap-2.5 mb-3">
          <div className="bg-[#ffd9cc] rounded p-1 flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
          <p className="font-medium text-sm leading-5 text-[#021337]">
            {title}
          </p>
          {isDetailButton && (
            <Button
              variant="outline"
              size="sm"
              rightIcon={
                <ChevronRightIcon className="w-4 h-4 text-[#021337]" />
              }
              className="h-8 px-3 py-2 text-[13px]"
            >
              Chi tiết
            </Button>
          )}
          {counter && (
            <div className="bg-[#e5240c] rounded-full px-2 py-0.5 flex items-center justify-center">
              <span className="text-[10px] font-medium text-white">2</span>
            </div>
          )}
        </div>
      )}
      <div className="pl-[9px]" style={{ maxHeight, overflow: "auto" }}>
        {items.map((item, i) => {
          const isReasonAvailable =
            item.reason && typeof item.reason === "string";
          const height = isReasonAvailable ? "h-[48px]" : "h-[29px]";

          return (
            <div key={i} className="flex gap-[25px] items-center">
              <div className="flex flex-col items-center">
                {/* Top connector: show only if not first item */}
                <div className="w-0.5 h-5 bg-[#cfd6de]" />

                <div className="w-2 h-2 bg-black rounded-full" />

                {/* Bottom connector: if not last, height = 45px (5px + 20px mb + 20px gap), else 25px */}
                <div
                  className={cn(
                    "w-0.5",
                    i !== items.length - 1 ? `${height}` : "h-[35px]",
                    "bg-[#cfd6de]"
                  )}
                />
              </div>
              <div className="flex-1">
                <p className="text-xs mb-[5px] leading-4 text-[#677187]">
                  {item.timestamp}
                </p>
                <div className="mb-[5px] flex gap-2.5">
                  <p className="text-sm leading-5 text-[#021337]">
                    {item.description}
                  </p>
                  {item.link && (
                    <LinkHrefIcon className="w-5 h-5 text-[#021337]" />
                  )}
                </div>

                {item.reason && (
                  <p className="text-xs leading-4 text-[#021337]">
                    {item.reason}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
