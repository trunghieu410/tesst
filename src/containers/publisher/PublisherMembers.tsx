import { useState, useEffect } from "react";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
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
import { usePublisherMembers } from "@/lib/queries/usePublishers";
import MultipleSelectCountryDropdown from "@/components/ui/MultipleSelectCountryDropdown";
import type { PublisherType } from "@/types";

interface PublisherMembersProps {
  publisherId: string;
}

const accountStatusMap: Record<
  PublisherType["accountStatus"],
  { label: string; variant: BadgeVariant }
> = {
  active: { label: "Kích hoạt", variant: "success" },
  deleted: { label: "Đã xoá", variant: "error" },
  suspended: { label: "Tạm dừng", variant: "pending" },
};

export function PublisherMembers({ publisherId }: PublisherMembersProps) {
  const [memberSearch, setMemberSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTier, setSelectedTier] = useState<
    "all" | "tier1" | "tier2" | "tier3"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(memberSearch);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [memberSearch]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCountry, selectedStatuses, selectedTier]);

  const {
    data: membersData,
    isLoading,
    error,
  } = usePublisherMembers(
    publisherId,
    {
      search: debouncedSearch || '',
      tier: selectedTier,
      countries: selectedCountry.length > 0 ? selectedCountry.sort().join(",") : '',
      accountStatuses:
        selectedStatuses.length > 0 ? selectedStatuses.sort().join(",") : '',
    },
    currentPage,
    rowsPerPage
  );

  const members = membersData?.data || [];
  const pagination = membersData?.pagination || {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  };
  const stats = membersData?.counters || { total: 0, tier1: 0, tier2: 0, tier3: 0 };
  console.log(stats); 
  if (error) {
    return (
      <div className="p-4 flex items-center justify-center">
        <p className="text-red-500">Error loading members</p>
      </div>
    );
  }
  
  return (
    <div className="p-3 pb-4">
      {/* Filters Section */}
      <div className="flex items-center gap-2.5 mb-4 bg-none">
        <SearchInput
          value={memberSearch}
          onChange={setMemberSearch}
          placeholder="Tên, email của pub"
          className="w-[250px]"
        />

        <MultipleSelectCountryDropdown
          initialValues={selectedCountry}
          onSelectedChange={setSelectedCountry}
          placeholder="Quốc gia"
          className="w-auto min-w-[120px]"
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
            <Badge variant="default">{stats.total}</Badge>
          </Button>
          <Button
            variant="tab"
            isActive={selectedTier === "tier1"}
            onClick={() => setSelectedTier("tier1")}
          >
            Tầng 1<Badge variant="default">{stats.tier1}</Badge>
          </Button>
          <Button
            variant="tab"
            isActive={selectedTier === "tier2"}
            onClick={() => setSelectedTier("tier2")}
          >
            Tầng 2
            <InfoIcon className="w-4 h-4" />
            <Badge variant="default">{stats.tier2}</Badge>
          </Button>
          <Button
            variant="tab"
            isActive={selectedTier === "tier3"}
            onClick={() => setSelectedTier("tier3")}
          >
            Tầng 3<Badge variant="default">{stats.tier3}</Badge>
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
              className="w-[174px] shrink-0"
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7}>
                <p className="text-center text-gray-500 py-4">Loading...</p>
              </TableCell>
            </TableRow>
          ) : members.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <p className="text-center text-gray-500 py-4">
                  Không có thành viên
                </p>
              </TableCell>
            </TableRow>
          ) : (
            members.map((member, index) => {
              const accountStatus = accountStatusMap[member.accountStatus];
              return (
              <TableRow key={member.id}>
                <TableCell data-sticky="left-1">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell data-sticky="left-2">{member.fullName}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{member.country?.name || "N/A"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {member.tier === "tier1"
                    ? "F1"
                    : member.tier === "tier2"
                    ? "F2"
                    : "F3"}
                </TableCell>
                <TableCell>
                  {new Date(member.createdAt).toLocaleString("vi-VN")}
                </TableCell>
                <TableCell data-sticky="right">
                  <Badge variant={accountStatus.variant}>
                    {accountStatus.label}
                  </Badge>
                </TableCell>
              </TableRow>
            )})
          )}
        </TableBody>
      </Table>
      {/* Pagination */}
      <div className="flex items-center gap-2 p-2 border-b border-x rounded-b-lg border-[#e6e9ed] bg-white">
        <p className="font-normal text-sm leading-5 text-[#021337]">
          {pagination.total.toLocaleString()} kết quả
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </div>
    </div>
  );
}

