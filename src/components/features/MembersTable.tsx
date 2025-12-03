import { cn } from "@/lib/utils/common";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";

interface MemberData {
  rank: number;
  name: string;
  email: string;
  flag: string;
  totalPub: number;
  f1: number;
  f2: number;
  f3: number;
}

interface MembersTableProps {
  data: MemberData[];
  className?: string;
}

export function MembersTable({ data, className }: MembersTableProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell
              align="left"
              className="min-w-[40px] w-[70px] hidden md:table-cell"
              data-sticky="left-1"
            >
              #
            </TableHeaderCell>
            <TableHeaderCell
              align="left"
              className="min-w-[180px] max-md:left-0!"
              data-sticky="left-2"
            >
              Họ tên
            </TableHeaderCell>
            <TableHeaderCell align="right" className="min-w-[100px]">
              Tổng Pub
            </TableHeaderCell>
            <TableHeaderCell align="right" className="min-w-[80px]">
              F1
            </TableHeaderCell>
            <TableHeaderCell align="right" className="min-w-[80px]">
              F2
            </TableHeaderCell>
            <TableHeaderCell align="right" className="min-w-[80px]">
              F3
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                className="py-4 px-3 hidden md:table-cell"
                data-sticky="left-1"
              >
                {row.rank}
              </TableCell>
              <TableCell className="py-4 px-3 max-md:left-0!" data-sticky="left-2">
                <div className="flex items-center gap-2">
                  <span className="text-[18px]">{row.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium leading-5 text-[#7a4dff]">
                      {row.name}
                    </span>
                    <span className="text-[12px] font-normal leading-4 text-[#677187]">
                      {row.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell align="right" className="py-4 px-3">
                {row.totalPub.toLocaleString()}
              </TableCell>
              <TableCell align="right" className="py-4 px-3">
                {row.f1.toLocaleString()}
              </TableCell>
              <TableCell align="right" className="py-4 px-3">
                {row.f2.toLocaleString()}
              </TableCell>
              <TableCell align="right" className="py-4 px-3">
                {row.f3.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
