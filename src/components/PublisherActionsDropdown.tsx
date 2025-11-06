import { useState } from "react";
import { Button } from "@/components/Button";
import { MoreVertical } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";

interface PublisherActionsDropdownProps {
  onSelect: (action: string) => void;
}

export function PublisherActionsDropdown({
  onSelect,
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
    onSelect(action);
  };

  const actions = [
    { value: "activate", label: "Kích hoạt" },
    { value: "suspend", label: "Tạm khoá", hasIcon: true },
    { value: "disable_2fa", label: "Tắt 2FA" },
  ];

  return (
    <div ref={dropdownRef} className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        className="h-8 w-8 p-0 bg-white border-[#cfd6de] hover:bg-[#f1caca]"
      >
        <MoreVertical className="w-4 h-4 text-[#677187]" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border-[#cfd6de] border box-border flex flex-col items-start px-0 py-2 rounded-md shadow-lg z-50">
          {/*actions-menu*/}
          {actions.map((action) => (
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
