import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Calendar } from "lucide-react";
import { useCampaign } from "@/lib/queries/useCampaigns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: campaign, isLoading } = useCampaign(id!);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/dashboard/campaigns")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 size-4" />
        Back to Campaigns
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{campaign.title}</CardTitle>
              <CardDescription className="mt-2">
                {campaign.description}
              </CardDescription>
            </div>
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
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(campaign.startDate), "MMMM dd, yyyy")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">End Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(campaign.endDate), "MMMM dd, yyyy")}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {format(new Date(campaign.createdAt), "MMM dd, yyyy HH:mm")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span>
                  {format(new Date(campaign.updatedAt), "MMM dd, yyyy HH:mm")}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
