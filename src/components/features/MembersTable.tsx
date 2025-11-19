import { cn } from "@/lib/utils/common";

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
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#cfd6de]">
            <th className="text-left py-2 px-3 text-[12px] font-medium leading-4 text-[#677187] min-w-[40px]">
              #
            </th>
            <th className="text-left py-2 px-3 text-[12px] font-medium leading-4 text-[#677187] min-w-[180px]">
              Họ tên
            </th>
            <th className="text-right py-2 px-3 text-[12px] font-medium leading-4 text-[#677187] min-w-[100px]">
              Tổng Pub
            </th>
            <th className="text-right py-2 px-3 text-[12px] font-medium leading-4 text-[#677187] min-w-[80px]">
              F1
            </th>
            <th className="text-right py-2 px-3 text-[12px] font-medium leading-4 text-[#677187] min-w-[80px]">
              F2
            </th>
            <th className="text-right py-2 px-3 text-[12px] font-medium leading-4 text-[#677187] min-w-[80px]">
              F3
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={cn(
                "border-b border-[#e6e9ed] transition-colors",
                index === data.length - 1 && "border-b-0"
              )}
            >
              <td className="py-4 px-3 text-[14px] font-normal leading-5 text-[#021337]">
                {row.rank}
              </td>
              <td className="py-4 px-3">
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
              </td>
              <td className="py-4 px-3 text-right text-[14px] font-normal leading-5 text-[#021337]">
                {row.totalPub.toLocaleString()}
              </td>
              <td className="py-4 px-3 text-right text-[14px] font-normal leading-5 text-[#021337]">
                {row.f1.toLocaleString()}
              </td>
              <td className="py-4 px-3 text-right text-[14px] font-normal leading-5 text-[#021337]">
                {row.f2.toLocaleString()}
              </td>
              <td className="py-4 px-3 text-right text-[14px] font-normal leading-5 text-[#021337]">
                {row.f3.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
