import { Badge } from "@/components/Badge";
import type { BadgeVariant } from "@/components/Badge";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/Table";

interface Campaign {
  id: number;
  name: string;
  imageType: string;
  country: {
    code: string;
    name: string;
    flag: string;
  };
  commission: string;
  notes: string;
  blacklist: number;
  whitelist: number;
  applicationPeriod: string;
  createdAt: string;
  status: "active" | "pending" | "completed" | "inactive";
}

interface CampaignTableProps {
  campaigns: Campaign[];
  onRowClick?: (campaign: Campaign) => void;
}

const statusMap: Record<
  Campaign["status"],
  { label: string; variant: BadgeVariant }
> = {
  active: { label: "Đang diễn ra", variant: "success" },
  pending: { label: "Sắp ra mắt", variant: "warning" },
  completed: { label: "Đã kết thúc", variant: "default" },
  inactive: { label: "Nhập", variant: "pending" },
};

export function CampaignTable({ campaigns, onRowClick }: CampaignTableProps) {
  const handleRowClick = (campaign: Campaign) => {
    if (onRowClick) {
      onRowClick(campaign);
    }
  };

  return (
    <Table horizontalScrollWithStickyColumns={true}>
      <TableHead>
        <TableRow>
          <TableHeaderCell
            align="center"
            className="w-[70px] shrink-0"
            data-sticky="left-1"
          >
            #
          </TableHeaderCell>
          <TableHeaderCell className="w-[200px]" data-sticky="left-2">
            Tên chiến dịch
          </TableHeaderCell>
          <TableHeaderCell className="w-[140px] shrink-0">
            Hình thức
          </TableHeaderCell>
          <TableHeaderCell className="w-[150px] shrink-0">
            Quốc gia
          </TableHeaderCell>
          <TableHeaderCell className="w-[150px] shrink-0">
            Commissions
          </TableHeaderCell>
          <TableHeaderCell className="min-w-[200px]">Ghi chú</TableHeaderCell>
          <TableHeaderCell align="center" className="w-[100px] shrink-0">
            Blacklist
          </TableHeaderCell>
          <TableHeaderCell align="center" className="w-[100px] shrink-0">
            Whitelist
          </TableHeaderCell>
          <TableHeaderCell className="min-w-[200px]">Áp dụng</TableHeaderCell>
          <TableHeaderCell className="w-[150px] shrink-0">
            Thời gian tạo
          </TableHeaderCell>
          <TableHeaderCell className="w-[120px] shrink-0" data-sticky="right">
            Trạng thái
          </TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {campaigns.map((campaign) => {
          const status = statusMap[campaign.status];

          return (
            <TableRow
              key={campaign.id}
              onClick={() => handleRowClick(campaign)}
            >
              <TableCell align="center" data-sticky="left-1">
                {campaign.id}
              </TableCell>
              <TableCell data-sticky="left-2">{campaign.name}</TableCell>
              <TableCell>
                <Badge variant="default">{campaign.imageType}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{campaign.country.flag}</span>
                  <span className="text-[13px] leading-4">
                    {campaign.country.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>{campaign.commission}</TableCell>
              <TableCell>
                <div className="text-[13px] leading-4 text-[#021337]">
                  {campaign.notes}
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="inline-flex items-center justify-center bg-[#fdd5d2] text-[#021337] px-2 py-0 rounded h-5 font-normal text-xs leading-4">
                  {campaign.blacklist}
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="inline-flex items-center justify-center bg-[#dbf5ea] text-[#021337] px-2 py-0 rounded h-5 font-normal text-xs leading-4">
                  {campaign.whitelist}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-[13px] leading-4">
                  {campaign.applicationPeriod}
                </div>
              </TableCell>
              <TableCell>{campaign.createdAt}</TableCell>
              <TableCell data-sticky="right">
                <Badge variant={status.variant}>{status.label}</Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
