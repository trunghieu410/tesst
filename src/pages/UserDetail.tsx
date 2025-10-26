import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useUser, useSuspendUser, useBanUser } from "@/lib/queries/useUsers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser(id!);
  const suspendUser = useSuspendUser();
  const banUser = useBanUser();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const handleSuspend = () => {
    suspendUser.mutate(id!);
  };

  const handleBan = () => {
    banUser.mutate(id!);
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/dashboard/users")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 size-4" />
        Back to Users
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="text-lg">
                {user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <p className="text-sm text-muted-foreground mt-1">
                Joined {format(new Date(user.createdAt), "MMMM dd, yyyy")}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Account Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  ${user.balance.toLocaleString()}
                </p>
                <Progress value={65} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Monthly Profit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  ${user.monthlyProfit.toLocaleString()}
                </p>
                <Progress value={45} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  ${user.income.toLocaleString()}
                </p>
                <Progress value={80} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleSuspend}
              disabled={suspendUser.isPending || user.status === "suspended"}
            >
              Suspend User
            </Button>
            <Button
              variant="destructive"
              onClick={handleBan}
              disabled={banUser.isPending || user.status === "banned"}
            >
              Ban User
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
