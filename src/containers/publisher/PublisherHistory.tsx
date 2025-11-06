import { useState, useMemo } from "react";
import { Dropdown } from "@/components/Dropdown";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/Table";

type HistoryItem = {
  id: number;
  actorName: string;
  actorEmail: string;
  actionTitle: string;
  actionChangeFrom: string;
  actionChangeTo: string;
  actionType: "deposit" | "withdraw";
  ip: string;
  time: string;
};

const MOCK_HISTORY: HistoryItem[] = [
  {
    id: 1,
    actorName: "Tuấn Phan",
    actorEmail: "tuanphan@gmail.com",
    actionTitle: "Cập nhật Trạng thái Rút",
    actionChangeFrom: "Khoá rút",
    actionChangeTo: "Cho rút",
    actionType: "withdraw",
    ip: "100.14.144.152",
    time: "10.13.2025 - 13:50",
  },
  {
    id: 2,
    actorName: "Trung Nguyễn",
    actorEmail: "trung@gmail.com",
    actionTitle: "Cập nhật Trạng thái Nạp",
    actionChangeFrom: "Cho nạp",
    actionChangeTo: "Khoá nạp",
    actionType: "deposit",
    ip: "100.14.148.76",
    time: "10.12.2025 - 13:50",
  },
];

const FILTER_OPTIONS = [
  { value: "deposit", label: "Nạp" },
  { value: "withdraw", label: "Rút" },
];

export function PublisherHistory() {
  const [filter, setFilter] = useState("");

  const data = useMemo(() => {
    if (!filter) return MOCK_HISTORY;
    return MOCK_HISTORY.filter((h) => h.actionType === filter);
  }, [filter]);

  return (
    <div className=" border-r border-[#b5bcc4] flex flex-col py-6 px-5 pb-20">
      <div className="mb-3">
        <Dropdown
          value={filter}
          onChange={setFilter}
          placeholder="Tất cả"
          options={FILTER_OPTIONS}
          className="w-[103px]"
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
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm leading-5 text-[#021337]">
                      {item.actorName}
                    </span>
                    <span className="text-[10px] leading-3.5 text-[#021337] opacity-80">
                      {item.actorEmail}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="align-top">
                  <div className="flex flex-col">
                    <span className="text-sm leading-5 text-[#021337]">
                      {item.actionTitle}
                    </span>
                    <span className="text-sm leading-5 text-[#021337]">
                      <span className="font-medium">
                        {item.actionChangeFrom}
                      </span>{" "}
                      →{" "}
                      <span className="font-medium">{item.actionChangeTo}</span>
                    </span>
                  </div>
                </TableCell>
                <TableCell>{item.ip}</TableCell>
                <TableCell>{item.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
