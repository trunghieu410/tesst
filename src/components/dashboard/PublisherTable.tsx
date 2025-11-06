import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";
import { DangerRedIcon } from "@/icon/DangerRedIcon";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";
import { Tooltip } from "../ui/Tooltip";
import { ClickToCopy } from "../ui/ClickToCopy";

interface Publisher {
  id: number;
  name: string;
  email: string;
  country: {
    code: string;
    name: string;
    flag: string;
  };
  members: number;
  createdAt: string;
  kyc: "not_started" | "approved" | "rejected" | "pending";
  status: "active" | "deleted" | "suspended";
}

interface PublisherTableProps {
  publishers: Publisher[];
  onRowClick?: (publisher: Publisher) => void;
}

const kycStatusMap: Record<
  Publisher["kyc"],
  { label: string; variant: BadgeVariant }
> = {
  not_started: { label: "Chưa làm", variant: "default" },
  approved: { label: "Đã duyệt", variant: "success" },
  rejected: { label: "Từ chối", variant: "error" },
  pending: { label: "Chờ duyệt", variant: "warning" },
};

const accountStatusMap: Record<
  Publisher["status"],
  { label: string; variant: BadgeVariant }
> = {
  active: { label: "Kích hoạt", variant: "success" },
  deleted: { label: "Đã xoá", variant: "error" },
  suspended: { label: "Tạm dừng", variant: "pending" },
};

export function PublisherTable({
  publishers,
  onRowClick,
}: PublisherTableProps) {
  const handleRowClick = (publisher: Publisher) => {
    if (onRowClick) {
      onRowClick(publisher);
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell
            align="center"
            className="w-[70px] shrink-0"
            data-sticky="left-1"
          >
            #
          </TableHeaderCell>
          <TableHeaderCell className="w-[174px]" data-sticky="left-2">
            Họ tên
          </TableHeaderCell>
          <TableHeaderCell className="w-[130px] shrink-0">
            Mã giới thiệu
          </TableHeaderCell>
          <TableHeaderCell className="w-[130px] shrink-0">
            Giới thiệu bởi
          </TableHeaderCell>
          <TableHeaderCell className="w-[130px] shrink-0">
            Quốc gia
          </TableHeaderCell>
          <TableHeaderCell align="right" className="w-[150px] shrink-0">
            Thành viên (F1 → F3)
          </TableHeaderCell>
          <TableHeaderCell className="w-[150px] shrink-0">
            Thời gian tạo
          </TableHeaderCell>
          <TableHeaderCell className="w-[120px] shrink-0">KYC</TableHeaderCell>
          <TableHeaderCell className="w-[120px] shrink-0" data-sticky="right">
            Trạng thái
          </TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {publishers.map((publisher) => {
          const kycStatus = kycStatusMap[publisher.kyc];
          const accountStatus = accountStatusMap[publisher.status];

          return (
            <TableRow key={publisher.id}>
              <TableCell
                align="center"
                data-sticky="left-1"
                onClick={() => handleRowClick(publisher)}
              >
                {publisher.id}
              </TableCell>
              <TableCell
                data-sticky="left-2"
                onClick={() => handleRowClick(publisher)}
              >
                <div className="flex items-center gap-2 text-red">
                  <span className="font-medium text-sm leading-5 text-[#021337]">
                    {publisher.name}
                  </span>
                  <Tooltip position="right" tooltipsText="Ghi chú này hơi dài.">
                    <DangerRedIcon className="w-4 h-4" />
                  </Tooltip>
                </div>
                <p className="font-normal text-xs leading-4 text-[#677187]">
                  {publisher.email}
                </p>
              </TableCell>
              <TableCell>
                <ClickToCopy className="text-[13px] leading-4" showIcon>
                  dillan.hoang
                </ClickToCopy>
              </TableCell>
              <TableCell>
                <ClickToCopy className="text-[13px] leading-4">
                  abcde.hoang
                </ClickToCopy>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{publisher.country.flag}</span>
                  <span className="text-[13px] leading-4">
                    {publisher.country.name}
                  </span>
                </div>
              </TableCell>
              <TableCell align="right">{publisher.members}</TableCell>
              <TableCell>{publisher.createdAt}</TableCell>
              <TableCell>
                <Badge variant={kycStatus.variant}>{kycStatus.label}</Badge>
              </TableCell>
              <TableCell data-sticky="right">
                <Badge variant={accountStatus.variant}>
                  {accountStatus.label}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
