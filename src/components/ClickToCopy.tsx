import { useCallback, useState } from "react";
import { cn } from "@/lib/utils/common";
import { useToast } from "@/context/toast/useToast";
import { CopyIcon } from "@/icon/CopyIcon";
import { Tooltip } from "@/components/Tooltip";

interface ClickToCopyProps {
  onCopied?: () => void;
  showIcon?: boolean;
  showToast?: boolean;
  toastMessage?: string;
  className?: string;
  stopPropagation?: boolean;
  children: string;
}

export function ClickToCopy({
  onCopied,
  showIcon = false,
  showToast = true,
  toastMessage = "Copied to clipboard!",
  className,
  stopPropagation = true,
  children,
}: ClickToCopyProps) {
  const { success, error } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const performCopy = useCallback(async () => {
    try {
      // Use modern Clipboard API if available
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(children);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textarea = document.createElement("textarea");
        textarea.value = children;
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
          const successful = document.execCommand("copy");
          if (!successful) {
            throw new Error("Copy command failed");
          }
        } catch (err) {
          document.body.removeChild(textarea);
          throw err;
        }

        document.body.removeChild(textarea);
      }

      // Success feedback
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);

      if (showToast) {
        success(toastMessage);
      }

      if (onCopied) {
        onCopied();
      }
    } catch (err) {
      console.error("Failed to copy text:", err);
      if (showToast) {
        error("Failed to copy to clipboard");
      }
    }
  }, [children, onCopied, showToast, toastMessage, success, error]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      performCopy();
    },
    [stopPropagation, performCopy]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (stopPropagation) {
          e.stopPropagation();
        }
        performCopy();
      }
    },
    [stopPropagation, performCopy]
  );

  const content = (
    <span
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "cursor-pointer transition-colors",
        isCopied && "text-[#677187]",
        className
      )}
      role="button"
      tabIndex={0}
    >
      {children}
      {showIcon && (
        <CopyIcon
          className={cn(
            "inline-block h-4 w-4 ml-1 transition-colors",
            isCopied ? "text-[#677187]" : "text-gray-400"
          )}
        />
      )}
    </span>
  );

  return showIcon ? (
    content
  ) : (
    <Tooltip position="top" tooltipsText="Click to copy">
      {content}
    </Tooltip>
  );
}
