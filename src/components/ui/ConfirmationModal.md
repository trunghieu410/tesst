# ConfirmationModal Component

A reusable confirmation modal component built with React, TypeScript, and Tailwind CSS. The modal uses React Portal to render on top of the entire application stack and provides a consistent confirmation experience throughout the application.

## Features

- ✅ **React Portal**: Renders outside of parent DOM hierarchy
- ✅ **Fully Customizable**: All text and labels can be customized via props
- ✅ **TypeScript Support**: Fully typed with comprehensive interface
- ✅ **Accessibility**: Proper ARIA attributes and keyboard support (ESC to close)
- ✅ **Loading State**: Built-in loading state for async operations
- ✅ **Tailwind CSS**: Beautiful, responsive design with Tailwind
- ✅ **Auto-reset**: Textarea value resets when modal closes
- ✅ **Body Scroll Lock**: Prevents background scrolling when modal is open
- ✅ **Backdrop Click**: Close modal by clicking outside

## Installation

The component is located at:
```
src/components/ui/ConfirmationModal.tsx
```

## Basic Usage

```tsx
import { useState } from "react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = (reason: string) => {
    console.log("User confirmed with reason:", reason);
    // Perform your action here
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        Delete Account
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Tạm khóa tài khoản?"
        description="Publisher sau khi bị khoá sẽ không thể đăng nhập và thực hiện các hoạt động trên hệ thống."
        warningMessage="Vui lòng cung cấp lý do tạm khóa để đảm bảo tính minh bạch trong quản lý."
      />
    </>
  );
}
```

## Advanced Usage with Loading State

```tsx
import { useState } from "react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async (reason: string) => {
    setIsLoading(true);
    
    try {
      // Call your API
      await fetch("/api/suspend-account", {
        method: "POST",
        body: JSON.stringify({ reason }),
      });
      
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to suspend account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        Suspend Account
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        title="Tạm khóa tài khoản?"
        description="Publisher sau khi bị khoá sẽ không thể đăng nhập."
        warningMessage="Vui lòng cung cấp lý do tạm khóa."
      />
    </>
  );
}
```

## Full Example with All Props

```tsx
<ConfirmationModal
  isOpen={true}
  onClose={() => console.log("Close")}
  onConfirm={(reason) => console.log("Confirm:", reason)}
  title="Xóa tài khoản vĩnh viễn?"
  description="Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan sẽ bị xóa."
  label="Lý do xóa tài khoản"
  placeholder="Nhập lý do xóa..."
  warningMessage="Cảnh báo: Đây là hành động không thể hoàn tác!"
  confirmText="Xác nhận xóa"
  cancelText="Hủy"
  isLoading={false}
/>
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **required** | Controls whether the modal is visible |
| `onClose` | `() => void` | **required** | Callback when modal is closed (via cancel button or backdrop click) |
| `onConfirm` | `(reason: string) => void` | **required** | Callback when confirm is clicked, receives the reason string |
| `title` | `string` | **required** | Title of the modal |
| `description` | `string` | `undefined` | Description text below the title |
| `label` | `string` | `"Lý do tạm khóa"` | Label for the textarea input |
| `warningMessage` | `string` | `undefined` | Warning message displayed below the textarea in red |
| `confirmText` | `string` | `"Xác nhận"` | Text for the confirm button |
| `cancelText` | `string` | `"Đóng"` | Text for the cancel button |
| `isLoading` | `boolean` | `false` | Whether the confirm action is processing (disables buttons and textarea) |
| `placeholder` | `string` | `"Nội dung ..."` | Placeholder text for the textarea |

## Use Cases

### 1. Account Suspension
```tsx
<ConfirmationModal
  isOpen={showSuspendModal}
  onClose={() => setShowSuspendModal(false)}
  onConfirm={handleSuspend}
  title="Tạm khóa tài khoản?"
  description="Publisher sau khi bị khoá sẽ không thể đăng nhập."
  warningMessage="Vui lòng cung cấp lý do tạm khóa."
/>
```

### 2. Delete Confirmation
```tsx
<ConfirmationModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={handleDelete}
  title="Xóa nội dung này?"
  description="Nội dung sẽ bị xóa vĩnh viễn và không thể khôi phục."
  label="Lý do xóa"
  confirmText="Xóa"
  cancelText="Hủy"
/>
```

### 3. Role Change
```tsx
<ConfirmationModal
  isOpen={showRoleChangeModal}
  onClose={() => setShowRoleChangeModal(false)}
  onConfirm={handleRoleChange}
  title="Thay đổi vai trò người dùng?"
  description="Vai trò mới sẽ áp dụng ngay lập tức."
  label="Ghi chú"
  placeholder="Ghi chú về thay đổi..."
  confirmText="Áp dụng"
/>
```

### 4. Rejection with Reason
```tsx
<ConfirmationModal
  isOpen={showRejectModal}
  onClose={() => setShowRejectModal(false)}
  onConfirm={handleReject}
  title="Từ chối yêu cầu?"
  description="Người dùng sẽ nhận được thông báo từ chối."
  label="Lý do từ chối"
  warningMessage="Vui lòng cung cấp lý do cụ thể để người dùng có thể hiểu và cải thiện."
  confirmText="Từ chối"
/>
```

## Styling Customization

The modal uses Tailwind CSS classes. If you need to customize the appearance, you can:

1. **Modify the component directly**: Edit the Tailwind classes in `ConfirmationModal.tsx`
2. **Use Tailwind's configuration**: Customize colors in your `tailwind.config.js`
3. **Override with CSS**: Add custom CSS classes (though not recommended)

### Key Style Classes

- **Backdrop**: `bg-black/50` (50% opacity black)
- **Modal Container**: `bg-white rounded-xl shadow-xl max-w-md p-6`
- **Title**: `text-xl font-bold text-gray-900`
- **Description**: `text-gray-600 text-sm`
- **Warning**: `text-red-500 text-sm`
- **Buttons**: Custom styled with your existing Button component

## Accessibility

The modal includes proper accessibility features:

- **ARIA Attributes**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- **Keyboard Support**: ESC key closes the modal
- **Focus Management**: Buttons and textarea are focusable
- **Label Association**: Textarea is properly labeled with `htmlFor` and `id`

## Testing

A comprehensive test suite is available at `src/components/ui/ConfirmationModal.test.tsx`.

Run tests with:
```bash
npm test ConfirmationModal.test.tsx
# or
yarn test ConfirmationModal.test.tsx
```

## Browser Compatibility

The component uses `createPortal` from React, which is supported in all modern browsers. The modal works with:

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Best Practices

1. **Always provide a title**: Make it clear what action the user is confirming
2. **Use descriptive descriptions**: Help users understand the consequences
3. **Show loading states**: Use `isLoading` for async operations
4. **Meaningful reasons**: Encourage users to provide specific reasons
5. **Warning messages**: Use for critical or irreversible actions

## Integration Example

See `src/components/features/PublisherActionsDropdown.tsx` for a real-world integration example where the modal is used for account suspension confirmation.

## License

This component is part of the OpenKingdom Admin project.
