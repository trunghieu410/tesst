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
import { Tooltip } from "@/components/ui/Tooltip";
import { ClickToCopy } from "@/components/ui/ClickToCopy";
import type { PublisherType } from "@/types";
import { text } from "@/lib/utils/common";
import { formatDateTimeTo } from "@/lib/utils/date";

interface PublisherTableProps {
  publishers: PublisherType[];
  onRowClick?: (publisherId: string) => void;
}

const kycStatusMap: Record<
  PublisherType["kycStatus"],
  { label: string; variant: BadgeVariant }
> = {
  not_started: { label: "Chưa làm", variant: "default" },
  approved: { label: "Đã duyệt", variant: "success" },
  rejected: { label: "Từ chối", variant: "error" },
  pending: { label: "Chờ duyệt", variant: "warning" },
};

const accountStatusMap: Record<
  PublisherType["accountStatus"],
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
  const handleRowClick = (publisherId: string) => {
    if (onRowClick) {
      onRowClick(publisherId);
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
          const kycStatus = kycStatusMap[publisher.kycStatus];
          const accountStatus = accountStatusMap[publisher.accountStatus]; 
          console.log(publisher);
          return (
            <TableRow key={publisher.id}>
              <TableCell
                align="center"
                data-sticky="left-1"
                onClick={() => handleRowClick(publisher.id.toString())}
              >
                {publisher.id}
              </TableCell>
              <TableCell
                data-sticky="left-2"
                onClick={() => handleRowClick(publisher.id.toString())}
              >
                <div className="flex items-center gap-2 text-red">
                  <span className="font-medium text-sm leading-5 text-[#021337]">
                    {publisher.fullName}
                  </span>
                  {publisher.isBlacklisted && (
                    <Tooltip position="right" tooltipsText="Pub có dấu hiện gian lận">
                      <DangerRedIcon className="w-4 h-4" />
                    </Tooltip>
                  )}
                </div>
                <p className="font-normal text-xs leading-4 text-[#677187]">
                  {publisher.email}
                </p>
              </TableCell>
              <TableCell>
                <ClickToCopy className="text-[13px] leading-4">
                  {publisher.referralCode}
                </ClickToCopy>
              </TableCell>
              <TableCell>
                <ClickToCopy className="text-[13px] leading-4">
                  {text(publisher.referredByCode)}
                </ClickToCopy>
              </TableCell>
              <TableCell>
                {publisher.country && (
                  <div className="flex items-center gap-2">
                    <span className={`flag flag-${publisher.country.code.toLowerCase()} shrink-0 inline-block w-[13px] h-[10px]`}></span>
                    <span className="text-[13px] leading-4">
                      {publisher.country.name}
                    </span>
                  </div>
                )}
              </TableCell>
              <TableCell align="right">{publisher.memberCount.total}</TableCell>
              <TableCell>{formatDateTimeTo(publisher.createdAt)}</TableCell>
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
