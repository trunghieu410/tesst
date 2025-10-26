"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5" />,
        info: <InfoIcon className="size-5" />,
        warning: <TriangleAlertIcon className="size-5" />,
        error: <OctagonXIcon className="size-5" />,
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-2xl",
          description: "group-[.toast]:text-gray-600",
          actionButton: "group-[.toast]:bg-blue-600 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-900",
          success:
            "group-[.toast]:bg-green-50 group-[.toast]:text-green-900 group-[.toast]:border-green-300",
          error:
            "group-[.toast]:bg-red-50 group-[.toast]:text-red-900 group-[.toast]:border-red-300",
          warning:
            "group-[.toast]:bg-amber-50 group-[.toast]:text-amber-900 group-[.toast]:border-amber-300",
          info: "group-[.toast]:bg-blue-50 group-[.toast]:text-blue-900 group-[.toast]:border-blue-300",
        },
      }}
      style={
        {
          "--normal-bg": "hsl(0 0% 100%)",
          "--normal-text": "hsl(222.2 47.4% 11.2%)",
          "--normal-border": "hsl(214.3 31.8% 91.4%)",
          "--border-radius": "0.5rem",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
