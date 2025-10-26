import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Campaign {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface CampaignTableProps {
  campaigns: Campaign[];
  isLoading?: boolean;
}

export function CampaignTable({ campaigns, isLoading }: CampaignTableProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        No campaigns found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => (
          <TableRow
            key={campaign.id}
            className="cursor-pointer"
            onClick={() => navigate(`/dashboard/campaigns/${campaign.id}`)}
          >
            <TableCell className="font-medium">{campaign.id}</TableCell>
            <TableCell>{campaign.title}</TableCell>
            <TableCell>
              {format(new Date(campaign.startDate), "MMM dd, yyyy")}
            </TableCell>
            <TableCell>
              {format(new Date(campaign.endDate), "MMM dd, yyyy")}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  campaign.status === "active"
                    ? "default"
                    : campaign.status === "scheduled"
                    ? "secondary"
                    : "outline"
                }
              >
                {campaign.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
