import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { Dropdown } from "@/components/ui/Dropdown";
import { MultipleSelectDropdown } from "@/components/ui/MultipleSelectDropdown";
import { Pagination } from "@/components/ui/Pagination";
import { InfoIcon } from "@/icon/InfoIcon";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";

interface Member {
  id: number;
  name: string;
  email: string;
  country: {
    code: string;
    name: string;
    flag: string;
  };
  tier: "F1" | "F2" | "F3";
  createdAt: string;
  status: "active" | "deleted" | "suspended";
}

interface PublisherMembersProps {
  members?: Member[];
}

// Mock members data
const defaultMembers: Member[] = [
  {
    id: 1,
    name: "Phan Công Kiều",
    email: "kieu.phan@gmail.com",
    country: { code: "VN", name: "Vietnam", flag: "🇻🇳" },
    tier: "F1",
    createdAt: "10.13.2025 - 14:52",
    status: "active",
  },
  {
    id: 2,
    name: "Tuấn Phan",
    email: "tuanphan@gmail.com",
    country: { code: "TH", name: "Thailand", flag: "🇹🇭" },
    tier: "F1",
    createdAt: "10.13.2025 - 13:50",
    status: "active",
  },
  {
    id: 3,
    name: "Trung Nguyễn",
    email: "trung@gmail.com",
    country: { code: "ID", name: "Indonesia", flag: "🇮🇩" },
    tier: "F2",
    createdAt: "10.12.2025 - 13:50",
    status: "deleted",
  },
  {
    id: 4,
    name: "Hậu Hoàng",
    email: "queen@gmail.com",
    country: { code: "MY", name: "Malaysia", flag: "🇲🇾" },
    tier: "F3",
    createdAt: "10.11.2025 - 13:50",
    status: "suspended",
  },
];

export function PublisherMembers({
  members = defaultMembers,
}: PublisherMembersProps) {
  const [memberSearch, setMemberSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState<"all" | "F1" | "F2" | "F3">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1000);

  // Filter members based on search and filters
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      memberSearch === "" ||
      member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.email.toLowerCase().includes(memberSearch.toLowerCase());

    const matchesCountry =
      selectedCountry === "" || member.country.code === selectedCountry;

    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(member.status);

    const matchesTier = selectedTier === "all" || member.tier === selectedTier;

    return matchesSearch && matchesCountry && matchesStatus && matchesTier;
  });

  // Tier counts
  const tierCounts = {
    all: members.length,
    F1: members.filter((m) => m.tier === "F1").length,
    F2: members.filter((m) => m.tier === "F2").length,
    F3: members.filter((m) => m.tier === "F3").length,
  };

  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);

  return (
    <div className="p-3 pb-4">
      {/* <div className="bg-white border border-[#e7e9eb] rounded-lg p-3 "> */}
      {/* Filters Section */}
      <div className="flex items-center gap-2.5 mb-4 bg-none">
        <SearchInput
          value={memberSearch}
          onChange={setMemberSearch}
          placeholder="Tên, email của pub"
          className="w-[250px]"
        />

        <Dropdown
          value={selectedCountry}
          onChange={setSelectedCountry}
          placeholder="Quốc gia"
          options={[
            { value: "VN", label: "Vietnam" },
            { value: "TH", label: "Thailand" },
            { value: "ID", label: "Indonesia" },
            { value: "MY", label: "Malaysia" },
          ]}
          className="w-[103px]"
        />

        {/*MultipleSelectDropdown status*/}
        <MultipleSelectDropdown
          onSelectedChange={setSelectedStatuses}
          placeholder="Trạng thái"
          options={[
            { value: "active", label: "Kích hoạt" },
            { value: "deleted", label: "Đã xoá" },
            { value: "suspended", label: "Tạm dừng" },
          ]}
          className="w-[134px]"
        />
      </div>

      {/* Tier Tabs */}
      <div className="border-t border-x rounded-t-lg border-[#e6e9ed] bg-white">
        <div className="flex gap-0">
          <Button
            variant="tab"
            isActive={selectedTier === "all"}
            onClick={() => setSelectedTier("all")}
          >
            Tất cả
            <Badge variant="default">{tierCounts.all}</Badge>
          </Button>
          <Button
            variant="tab"
            isActive={selectedTier === "F1"}
            onClick={() => setSelectedTier("F1")}
          >
            Tầng 1<Badge variant="default">{tierCounts.F1}</Badge>
          </Button>
          <Button
            variant="tab"
            isActive={selectedTier === "F2"}
            onClick={() => setSelectedTier("F2")}
          >
            Tầng 2
            <InfoIcon className="w-4 h-4" />
            <Badge variant="default">{tierCounts.F2}</Badge>
          </Button>
          <Button
            variant="tab"
            isActive={selectedTier === "F3"}
            onClick={() => setSelectedTier("F3")}
          >
            Tầng 3<Badge variant="default">{tierCounts.F3}</Badge>
          </Button>
        </div>
      </div>

      {/* Members Table */}
      <Table className="border border-[#cfd6de]">
        <TableHead>
          <TableRow>
            <TableHeaderCell className="w-[70px] shrink-0" data-sticky="left-1">
              #
            </TableHeaderCell>
            <TableHeaderCell
              className="w-[262px] shrink-0"
              data-sticky="left-2"
            >
              Họ tên
            </TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell className="w-[150px] shrink-0">
              Quốc gia
            </TableHeaderCell>
            <TableHeaderCell className="w-[100px] shrink-0">
              Tầng
            </TableHeaderCell>
            <TableHeaderCell className="w-[150px] shrink-0">
              Thời gian tạo
            </TableHeaderCell>
            <TableHeaderCell className="w-[120px] shrink-0" data-sticky="right">
              Trạng thái
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMembers
            .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
            .map((member, index) => (
              <TableRow key={member.id}>
                <TableCell data-sticky="left-1">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell data-sticky="left-2">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{member.country.flag}</span>
                    <span>{member.country.name}</span>
                  </div>
                </TableCell>
                <TableCell>{member.tier}</TableCell>
                <TableCell>{member.createdAt}</TableCell>
                <TableCell data-sticky="right">
                  {member.status === "active" && (
                    <Badge variant="success">Kích hoạt</Badge>
                  )}
                  {member.status === "deleted" && (
                    <Badge variant="error">Đã xoá</Badge>
                  )}
                  {member.status === "suspended" && (
                    <Badge variant="error">Tạm dừng</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* Pagination */}
      <div className="flex items-center gap-2 p-2 border-b border-x rounded-b-lg border-[#e6e9ed] bg-white">
        <p className="font-normal text-sm leading-5 text-[#021337]">
          {filteredMembers.length.toLocaleString()} kết quả
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </div>
      {/* </div> */}
    </div>
  );
}
