import { useState } from "react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { Button } from "@/components/ui/Button";

/**
 * Demo component showcasing different use cases of ConfirmationModal
 * This file demonstrates various ways to use the confirmation modal
 */
export function ConfirmationModalDemo() {
  const [modalType, setModalType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setModalType(null);
    setIsLoading(false);
  };

  const handleConfirm = async (reason: string) => {
    console.log(`Action: ${modalType}, Reason: ${reason}`);
    
    // Simulate API call
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    handleClose();
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Confirmation Modal Examples</h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Account Suspension Example */}
        <Button
          variant="danger"
          onClick={() => setModalType("suspend")}
        >
          Suspend Account
        </Button>

        {/* Delete Example */}
        <Button
          variant="danger"
          onClick={() => setModalType("delete")}
        >
          Delete Content
        </Button>

        {/* Reject Example */}
        <Button
          variant="secondary"
          onClick={() => setModalType("reject")}
        >
          Reject Request
        </Button>

        {/* Role Change Example */}
        <Button
          variant="primary"
          onClick={() => setModalType("role-change")}
        >
          Change Role
        </Button>

        {/* Deactivate Example */}
        <Button
          variant="secondary"
          onClick={() => setModalType("deactivate")}
        >
          Deactivate Feature
        </Button>

        {/* Ban User Example */}
        <Button
          variant="danger"
          onClick={() => setModalType("ban")}
        >
          Ban User
        </Button>
      </div>

      {/* Account Suspension Modal */}
      <ConfirmationModal
        isOpen={modalType === "suspend"}
        onClose={handleClose}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        title="Tạm khóa tài khoản?"
        description="Publisher sau khi bị khoá sẽ không thể đăng nhập và thực hiện các hoạt động trên hệ thống."
        warningMessage="Vui lòng cung cấp lý do tạm khóa để đảm bảo tính minh bạch trong quản lý."
      />

      {/* Delete Content Modal */}
      <ConfirmationModal
        isOpen={modalType === "delete"}
        onClose={handleClose}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        title="Xóa nội dung này?"
        description="Nội dung sẽ bị xóa vĩnh viễn và không thể khôi phục."
        label="Lý do xóa"
        warningMessage="Cảnh báo: Hành động này không thể hoàn tác!"
        confirmText="Xóa"
        cancelText="Hủy"
      />

      {/* Reject Request Modal */}
      <ConfirmationModal
        isOpen={modalType === "reject"}
        onClose={handleClose}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        title="Từ chối yêu cầu?"
        description="Người dùng sẽ nhận được thông báo từ chối."
        label="Lý do từ chối"
        placeholder="Nhập lý do từ chối..."
        warningMessage="Vui lòng cung cấp lý do cụ thể để người dùng có thể hiểu và cải thiện."
        confirmText="Từ chối"
        cancelText="Để sau"
      />

      {/* Role Change Modal */}
      <ConfirmationModal
        isOpen={modalType === "role-change"}
        onClose={handleClose}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        title="Thay đổi vai trò người dùng?"
        description="Vai trò mới sẽ áp dụng ngay lập tức và ảnh hưởng đến quyền truy cập của người dùng."
        label="Ghi chú thay đổi"
        placeholder="Ghi chú về thay đổi vai trò..."
        confirmText="Áp dụng"
        cancelText="Hủy"
      />

      {/* Deactivate Feature Modal */}
      <ConfirmationModal
        isOpen={modalType === "deactivate"}
        onClose={handleClose}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        title="Tắt tính năng?"
        description="Tính năng này sẽ không khả dụng cho người dùng."
        label="Lý do tắt"
        placeholder="Nhập lý do..."
        confirmText="Tắt tính năng"
      />

      {/* Ban User Modal */}
      <ConfirmationModal
        isOpen={modalType === "ban"}
        onClose={handleClose}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        title="Cấm người dùng vĩnh viễn?"
        description="Người dùng sẽ bị cấm vĩnh viễn và không thể đăng nhập trở lại. Đây là hành động nghiêm trọng."
        label="Lý do cấm"
        placeholder="Nhập lý do chi tiết..."
        warningMessage="Cảnh báo: Hành động này rất nghiêm trọng và nên được xem xét kỹ lưỡng!"
        confirmText="Xác nhận cấm"
        cancelText="Hủy"
      />
    </div>
  );
}
