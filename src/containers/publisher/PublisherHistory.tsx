import { useState } from "react";
import { Dropdown } from "@/components/ui/Dropdown";
import { Pagination } from "@/components/ui/Pagination";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";
import { usePublisherActivityLogs } from "@/lib/queries/usePublishers";

interface PublisherHistoryProps {
  publisherId: string;
}

const FILTER_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: "system", label: "Hệ thống" },
  { value: "publisher", label: "Publisher" },
  { value: "admin", label: "Admin" },
];

export function PublisherHistory({ publisherId }: PublisherHistoryProps) {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const {
    data: logsData,
    isLoading,
    error,
  } = usePublisherActivityLogs(
    publisherId,
    {
      actor: filter || undefined,
    },
    currentPage,
    rowsPerPage
  );

  const logs = logsData?.data || [];
  const pagination = logsData?.pagination || {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  };

  if (error) {
    return (
      <div className="p-4 flex items-center justify-center">
        <p className="text-red-500">Error loading activity logs</p>
      </div>
    );
  }

  return (
    <div className=" border-r border-[#b5bcc4] flex flex-col py-6 px-5 pb-20">
      <div className="mb-3 flex items-center gap-3">
        <Dropdown
          value={filter}
          onChange={setFilter}
          placeholder="Tất cả"
          options={FILTER_OPTIONS}
          className="w-[130px]"
        />
      </div>
      <div className="rounded-md border border-[#d0d5dd] overflow-hidden">
        <Table className="bg-white">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="min-w-[220px]">
                Người thao tác
              </TableHeaderCell>
              <TableHeaderCell className="w-[280px]">Thao tác</TableHeaderCell>
              <TableHeaderCell className="w-[180px]">IP</TableHeaderCell>
              <TableHeaderCell className="w-[200px]">
                Thời gian thao tác
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <p className="text-center text-gray-500 py-4">Loading...</p>
                </TableCell>
              </TableRow>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <p className="text-center text-gray-500 py-4">
                    Không có lịch sử thao tác
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              logs.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm leading-5 text-[#021337]">
                        {item.actorName || "Unknown"}
                      </span>
                      <span className="text-[10px] leading-3.5 text-[#021337] opacity-80">
                        {item.actorEmail || item.actorUserId}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="flex flex-col">
                      <span className="text-sm leading-5 text-[#021337]">
                        {item.action}
                      </span>
                      {item.reason && (
                        <span className="text-xs text-[#677187]">
                          Lí do: {item.reason}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{item.ip || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleString("vi-VN")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center gap-2 p-2 mt-3">
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

