import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
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
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false), {
    enabled: isOpen,
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (action: string) => {
    setIsOpen(false);
    
    // Show confirmation modal for critical actions
    if (action === "activate") {
      setPendingAction(action);
      setShowModal(true);
    } else {
      onAction(action);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPendingAction(null);
  };

  const handleModalConfirm = (reason: string) => {
    if (pendingAction) {
      // You can pass the reason to your backend here
      console.log("Action:", pendingAction, "Reason:", reason);
      onAction(pendingAction);
    }
    handleModalClose();
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

      <ConfirmationModal
        isOpen={showModal}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        title="Tạm khóa tài khoản?"
        description="Publisher sau khi bị khoá sẽ không thể đăng nhập và thực hiện các hoạt động trên hệ thống."
        warningMessage="Vui lòng cung cấp lý do tạm khóa để đảm bảo tính minh bạch trong quản lý."
      />
    </div>
  );
}
