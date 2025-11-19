import { Badge } from "@/components/ui/Badge";

// Shared types
export interface WalletUser {
  id: number;
  name: string;
  email: string;
  totalAssets: string;
  available: string;
  locked: string;
  status: "pending" | "activated" | "deleted" | "locked";
}

export interface CurrencyAsset {
  id: number;
  name: string;
  ticker: string;
  icon: string;
  totalAssets: string;
  available: string;
  locked: string;
  usdtValue: string;
  status: "active" | "inactive";
}

// Shared formatting utilities
export const formatNumber = (num: number) => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  });
};

// Status badge utilities
export const getWalletStatusBadge = (status: WalletUser["status"]) => {
  switch (status) {
    case "pending":
      return <Badge variant="warning">Chờ kích hoạt</Badge>;
    case "activated":
      return <Badge variant="success">Kích hoạt</Badge>;
    case "deleted":
      return <Badge variant="error">Đã xoá</Badge>;
    case "locked":
      return <Badge variant="pending">Tạm khoá</Badge>;
    default:
      return null;
  }
};

export const getCurrencyStatusBadge = (status: CurrencyAsset["status"]) => {
  switch (status) {
    case "active":
      return <Badge variant="success">Hoạt động</Badge>;
    case "inactive":
      return <Badge variant="error">Không hoạt động</Badge>;
    default:
      return null;
  }
};

// Crypto icon utility
export const getCryptoIcon = (icon: string) => {
  const colors: Record<string, string> = {
    usdt: "bg-[#26A17B]",
    roi: "bg-[#5B4FE9]",
    okt: "bg-[#1C315C]",
  };
  return (
    <div
      className={`w-8 h-8 rounded-full ${
        colors[icon] || "bg-gray-400"
      } flex items-center justify-center text-white text-xs font-semibold`}
    >
      {icon.substring(0, 2).toUpperCase()}
    </div>
  );
};

// Transaction status badge
export const getTransactionStatusBadge = (
  status: "approved" | "pending" | "rejected" | "warning"
) => {
  switch (status) {
    case "approved":
      return <Badge variant="success">Đã duyệt</Badge>;
    case "pending":
      return <Badge variant="pending">Đang duyệt</Badge>;
    case "warning":
      return <Badge variant="warning">Chờ duyệt</Badge>;
    case "rejected":
      return <Badge variant="danger">Từ chối</Badge>;
    default:
      return null;
  }
};
