import { Pagination } from "@/components/ui/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/Table";
import { useState } from "react";

// Mock blacklist data
const mockData = [
  {
    id: 1,
    name: "Phan Công Kiều",
    email: "kieu.phan@gmail.com",
    action: "Cập nhật Ảnh cover chính",
    actionDate: "10.13.2025 - 14:52",
  },
  {
    id: 2,
    name: "Tuấn Phan",
    email: "tuanphan@gmail.com",
    action: "Cập nhật Quốc gia áp dụng Việt Nam → Toàn cầu",
    actionDate: "10.13.2025 - 14:52",
  },
  {
    id: 3,
    name: "Trung Nguyễn",
    email: "trung@gmail.com",
    action: "Cập nhật Trạng thái Nháp → Sắp ra mắt",
    actionDate: "10.13.2025 - 14:52",
  },
  {
    id: 4,
    name: "Hậu Hoàng",
    email: "queen@gmail.com",
    action: "Tạo chiến dịch",
    actionDate: "10.13.2025 - 14:52",
  },
];

export function CampaignHistoryTab() {
  const [blacklistPage, setBlacklistPage] = useState(1);
  const [blacklistRowsPerPage, setBlacklistRowsPerPage] = useState(1000);

  return (
    <div className="p-3 flex flex-col gap-4">
      {/* Table */}
      <div className="border border-[#b5bcc4] rounded-md overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell align="center" className="w-[70px]">
                #
              </TableHeaderCell>
              <TableHeaderCell className="flex-1">
                Người thao tác
              </TableHeaderCell>
              <TableHeaderCell className="flex-1">Thao tác</TableHeaderCell>
              <TableHeaderCell className="w-[150px]">
                Thời gian thao tác
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell align="center">
                  <div className="flex items-center justify-center">
                    {index + 1}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{user.name}</div>
                  <div className="text-[10px] text-[#021337]">{user.email}</div>
                </TableCell>
                <TableCell>{user.action}</TableCell>
                <TableCell>{user.actionDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Footer */}
        <div className="border-t border-[#cfd6de] bg-white px-2 py-2 flex items-center justify-between">
          <span className="font-normal text-sm leading-5 text-[#021337]">
            3,323 kết quả
          </span>
          <Pagination
            currentPage={blacklistPage}
            totalPages={10}
            onPageChange={setBlacklistPage}
            rowsPerPage={blacklistRowsPerPage}
            onRowsPerPageChange={setBlacklistRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
