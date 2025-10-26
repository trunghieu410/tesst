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

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  isLoading?: boolean;
}

export function UserTable({ users, isLoading }: UserTableProps) {
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

  if (!users || users.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        No users found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user.id}
            className="cursor-pointer"
            onClick={() => navigate(`/dashboard/users/${user.id}`)}
          >
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge
                variant={
                  user.status === "active"
                    ? "default"
                    : user.status === "suspended"
                    ? "secondary"
                    : "destructive"
                }
              >
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>
              {format(new Date(user.createdAt), "MMM dd, yyyy")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
