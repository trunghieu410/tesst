import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/Table";
import { InfoIcon } from "@/icon/InfoIcon";
import { useState } from "react";

// Mock blacklist data
const mockBlacklistData = [
  {
    id: 1,
    name: "Phan Công Kiều",
    email: "kieu.phan@gmail.com",
    status: "active",
    country: "Vietnam",
    countryCode: "VN",
    reason: "Cheating",
    addedDate: "10.13.2025 - 14:52",
    addedBy: "Hà Kiêu",
    addedByEmail: "hakieu@ok.co",
  },
  {
    id: 2,
    name: "Tuấn Phan",
    email: "tuanphan@gmail.com",
    status: "active",
    country: "Thailand",
    countryCode: "TH",
    reason: "Cheating, cảnh cáo nhiều lần",
    addedDate: "10.13.2025 - 13:50",
    addedBy: "Quan Trung",
    addedByEmail: "trung@ok.co",
  },
  {
    id: 3,
    name: "Trung Nguyễn",
    email: "trung@gmail.com",
    status: "deleted",
    country: "Indonesia",
    countryCode: "ID",
    reason: "Cheating",
    addedDate: "10.12.2025 - 13:50",
    addedBy: "Quan Trung",
    addedByEmail: "trung@ok.co",
  },
  {
    id: 4,
    name: "Hậu Hoàng",
    email: "queen@gmail.com",
    status: "suspended",
    country: "Malaysia",
    countryCode: "MY",
    reason: "Cheating",
    addedDate: "10.11.2025 - 13:50",
    addedBy: "Admin",
    addedByEmail: "admin@ok.co",
  },
];

export function CampaignWhitelistTab() {
  const [blacklistSearch, setBlacklistSearch] = useState("");
  const [blacklistPage, setBlacklistPage] = useState(1);
  const [blacklistRowsPerPage, setBlacklistRowsPerPage] = useState(1000);
  const [selectedBlacklistUsers, setSelectedBlacklistUsers] = useState<
    number[]
  >([]);
  const [blacklistAction, setBlacklistAction] = useState("");

  return (
    <div className="p-3 flex flex-col gap-4">
      {/* Alert */}
      <div className="bg-[#e6e9ed] rounded-md px-3 py-2 flex items-center gap-3">
        <InfoIcon className="w-5 h-5 text-[#021337]" />
        <p className="font-normal text-[13px] leading-4 text-[#021337]">
          Thêm người dùng nội bộ vào whitelist để khi chiến dịch ở trạng thái
          “Đã lên lịch” thì những người dùng này có thể thấy và test trước khi
          chiến dịch đến thời điểm triển khai. này.
        </p>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between gap-2.5">
        <SearchInput
          value={blacklistSearch}
          onChange={setBlacklistSearch}
          placeholder="Tên, email người dùng"
          className="w-[250px]"
        />

        <div className="flex items-center gap-2.5">
          <Dropdown
            options={[
              { value: "remove", label: "Xoá khỏi blacklist" },
              { value: "export", label: "Xuất danh sách" },
            ]}
            value={blacklistAction}
            onChange={setBlacklistAction}
            placeholder="Thao tác"
          />
          <Button variant="danger" size="sm">
            Thêm người dùng
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#b5bcc4] rounded-md overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell
                data-sticky="left-1"
                align="center"
                className="w-[70px]"
              >
                #
              </TableHeaderCell>
              <TableHeaderCell className="w-[200px]" data-sticky="left-2">
                Họ tên
              </TableHeaderCell>
              <TableHeaderCell className="w-[200px]">Email</TableHeaderCell>
              <TableHeaderCell className="w-[140px]">
                Trạng thái tài khoản
              </TableHeaderCell>
              <TableHeaderCell className="w-[150px]">Quốc gia</TableHeaderCell>
              <TableHeaderCell>Lí do chặn</TableHeaderCell>
              <TableHeaderCell className="w-[150px]">
                Thời gian thêm vào DS
              </TableHeaderCell>
              <TableHeaderCell>Người thêm</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockBlacklistData.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell align="center" data-sticky="left-1">
                  {index === 0 ? (
                    <div className="flex items-center justify-center">
                      {index + 1}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedBlacklistUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBlacklistUsers([
                              ...selectedBlacklistUsers,
                              user.id,
                            ]);
                          } else {
                            setSelectedBlacklistUsers(
                              selectedBlacklistUsers.filter(
                                (id) => id !== user.id
                              )
                            );
                          }
                        }}
                        className="w-4 h-4 accent-[#f71e1e] cursor-pointer"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell data-sticky="left-2">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active"
                        ? "success"
                        : user.status === "deleted"
                        ? "danger"
                        : "default"
                    }
                  >
                    {user.status === "active"
                      ? "Kích hoạt"
                      : user.status === "deleted"
                      ? "Đã xoá"
                      : "Tạm dừng"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {user.countryCode === "VN"
                        ? "🇻🇳"
                        : user.countryCode === "TH"
                        ? "🇹🇭"
                        : user.countryCode === "ID"
                        ? "🇮🇩"
                        : "🇲🇾"}
                    </span>
                    <span className="text-[13px]">{user.country}</span>
                  </div>
                </TableCell>
                <TableCell>{user.reason}</TableCell>
                <TableCell>{user.addedDate}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-normal text-sm leading-5">
                      {user.addedBy}
                    </span>
                    <span className="font-normal text-[10px] leading-3.5 text-[#021337]">
                      {user.addedByEmail}
                    </span>
                  </div>
                </TableCell>
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
