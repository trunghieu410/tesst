import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useEffect, useState } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { RightSidePanel } from "@/components/features/RightSidePanel";
import { WalletDetails } from "./WalletDetails";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { Tabs } from "@/components/ui/Tabs";
import { ChevronRightIcon } from "@/icon/ChevronRightIcon";

interface WalletUser {
  id: number;
  name: string;
  email: string;
  totalAssets: string;
  available: string;
  locked: string;
  status: "pending" | "activated" | "deleted" | "locked";
}

export function Wallet() {
  const { publish } = useEventEmitter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1000);

  useEffect(() => {
    publish("title-change", { title: "Ví" });
  }, [publish]);

  // Sample wallet data
  const walletUsers: WalletUser[] = [
    {
      id: 1,
      name: "Phan Công Kiều",
      email: "kieu.phan@gmail.com",
      totalAssets: "12.32932832",
      available: "0.00840590",
      locked: "0.000000",
      status: "pending",
    },
    {
      id: 2,
      name: "Tuấn Phan",
      email: "tuanphan@gmail.com",
      totalAssets: "723.73829182",
      available: "0.00840590",
      locked: "0.000000",
      status: "activated",
    },
    {
      id: 3,
      name: "Tuấn Phan",
      email: "tuanphan@gmail.com",
      totalAssets: "832.73828291",
      available: "0.00840590",
      locked: "0.000000",
      status: "deleted",
    },
    {
      id: 4,
      name: "Trung Nguyễn",
      email: "trung@gmail.com",
      totalAssets: "1,324.85938271",
      available: "0.00840590",
      locked: "0.000000",
      status: "locked",
    },
  ];

  // Calculate totals
  const totals = walletUsers.reduce(
    (acc, user) => {
      const totalAssets = parseFloat(user.totalAssets.replace(/,/g, "")) || 0;
      const available = parseFloat(user.available) || 0;
      const locked = parseFloat(user.locked) || 0;
      return {
        totalAssets: acc.totalAssets + totalAssets,
        available: acc.available + available,
        locked: acc.locked + locked,
      };
    },
    { totalAssets: 0, available: 0, locked: 0 }
  );

  const statusOptions = [
    { value: "", label: "Trạng thái tài khoản" },
    { value: "pending", label: "Chờ kích hoạt" },
    { value: "activated", label: "Kích hoạt" },
    { value: "deleted", label: "Đã xoá" },
    { value: "locked", label: "Tạm khoá" },
  ];

  const getStatusBadge = (status: WalletUser["status"]) => {
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

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 8,
    });
  };

  const handleWalletClick = (walletId: number) => {
    publish("show-right-panel", walletId.toString()); // Mở panel
  };

  return (
    <div className="flex flex-col gap-4">
      {/*Wallet-section*/}
      <Tabs
        tabs={[
          { id: "users", label: "Người dùng" },
          { id: "currency", label: "Đơn vị tiền" },
        ]}
        defaultTab="users"
      >
        {() => (
          <div className="flex flex-col gap-4 border-t border-[#CFD6DE] p-3 w-full">
            {/* Search and Filter Section */}
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2.5 items-center">
                <div className="w-[250px]">
                  <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Tên, email người dùng"
                  />
                </div>
                <div className="w-auto">
                  <Select
                    value={statusFilter}
                    onChange={setStatusFilter}
                    placeholder="Trạng thái tài khoản"
                    options={statusOptions}
                  />
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="border border-[#cfd6de] rounded-md overflow-hidden">
              <Table horizontalScrollWithStickyColumns>
                <TableHead>
                  <TableRow className="bg-white">
                    <TableHeaderCell
                      align="left"
                      className="w-[250px] shrink-0"
                      data-sticky="left-1"
                    >
                      Ví người dùng
                    </TableHeaderCell>
                    <TableHeaderCell
                      align="right"
                      className="w-[200px] shrink-0"
                    >
                      Tổng tài sản quy đổi USDT
                    </TableHeaderCell>
                    <TableHeaderCell
                      align="right"
                      className="w-[150px] shrink-0"
                    >
                      Khả dụng
                    </TableHeaderCell>
                    <TableHeaderCell
                      align="right"
                      className="w-[150px] shrink-0"
                    >
                      Đang khoá
                    </TableHeaderCell>
                    <TableHeaderCell
                      align="left"
                      className="w-[140px] shrink-0"
                      data-sticky="right"
                    >
                      Trạng thái tài khoản
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Summary Row */}
                  <TableRow className="bg-[#f0f2f4]">
                    <TableCell
                      align="left"
                      className="bg-[#f0f2f4] font-semibold text-xs leading-4"
                      data-sticky="left-1"
                    >
                      12
                    </TableCell>
                    <TableCell
                      align="right"
                      className="bg-[#f0f2f4] font-semibold text-xs leading-4"
                    >
                      {formatNumber(totals.totalAssets)}
                    </TableCell>
                    <TableCell
                      align="right"
                      className="bg-[#f0f2f4] font-semibold text-xs leading-4"
                    >
                      {formatNumber(totals.available)}
                    </TableCell>
                    <TableCell
                      align="right"
                      className="bg-[#f0f2f4] font-semibold text-xs leading-4"
                    >
                      {formatNumber(totals.locked)}
                    </TableCell>
                    <TableCell
                      align="left"
                      className="bg-[#f0f2f4] font-semibold text-xs leading-4"
                      data-sticky="right"
                    >
                      --
                    </TableCell>
                  </TableRow>

                  {/* Data Rows */}
                  {walletUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      onClick={() => handleWalletClick(user.id)}
                    >
                      <TableCell align="left" data-sticky="left-1">
                        <div className="flex flex-col gap-0">
                          <div className="text-sm leading-5 text-[#021337] font-normal">
                            {user.name}
                          </div>
                          <div className="text-[10px] leading-3.5 text-[#021337] font-normal">
                            {user.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="right" className="text-sm leading-5">
                        {user.totalAssets}
                      </TableCell>
                      <TableCell align="right" className="text-sm leading-5">
                        <div className="flex items-center justify-end gap-2.5">
                          <span>{user.available}</span>
                          <ChevronRightIcon className="w-5 h-5 text-[#677187]" />
                        </div>
                      </TableCell>
                      <TableCell align="right" className="text-sm leading-5">
                        <div className="flex items-center justify-end gap-2.5">
                          <span>{user.locked}</span>
                          <ChevronRightIcon className="w-5 h-5 text-[#677187]" />
                        </div>
                      </TableCell>
                      <TableCell align="left" data-sticky="right">
                        {getStatusBadge(user.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-end gap-2 p-2 border-t border-[#cfd6de]">
                <Pagination
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={setRowsPerPage}
                />
              </div>
            </div>
          </div>
        )}
      </Tabs>

      {/* Right-side-panel */}
      <RightSidePanel>
        <WalletDetails />
      </RightSidePanel>
    </div>
  );
}
