import { useState } from "react";
import { Button } from "@/components/ui/Button";
// import { MoreVertical } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";
import { EllipsisIcon } from "@/icon/EllipsisIcon";

interface PublisherActionsDropdownProps {
  accountState: string;
  onAction: (action: string) => void;
}

const ACTIONS = [
  { value: "activate", label: "Kích hoạt" },
  { value: "suspend", label: "Tạm khoá", hasIcon: true },
  { value: "disable_2fa", label: "Tắt 2FA" },
] as const;

export function PublisherActionsDropdown({
  onAction,
  accountState,
}: PublisherActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false), {
    enabled: isOpen,
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (action: string) => {
    setIsOpen(false);
    onAction(action);
  };

  const validActions = ACTIONS.filter((s) => s.value !== accountState);

  return (
    <div ref={dropdownRef} className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        className="h-8 w-8 p-0 bg-white border-[#cfd6de] hover:bg-[#f1caca]"
      >
        <EllipsisIcon className="w-8 h-8 text-[#677187]" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border-[#cfd6de] border box-border flex flex-col items-start px-0 py-2 rounded-md shadow-lg z-50">
          {/*actions-menu*/}
          {validActions.map((action) => (
            <Button
              key={action.value}
              variant="ghost"
              size="sm"
              onClick={() => handleSelect(action.value)}
              className="w-full justify-start rounded-none px-4 py-2 text-left hover:bg-[#f1caca] text-[#021337]"
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
