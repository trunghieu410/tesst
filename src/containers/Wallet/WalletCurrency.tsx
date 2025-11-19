import { useState } from "react";
import { useEventEmitter } from "@/hooks/useEventEmitter";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { ChevronRightIcon } from "@/icon/ChevronRightIcon";
import {
  formatNumber,
  getCryptoIcon,
  getCurrencyStatusBadge,
} from "./walletUtils";

interface CurrencyAsset {
  id: number;
  name: string;
  ticker: string;
  icon: string;
  totalAssets: string;
  available: string;
  locked: string;
  usdtValue: string;
  status: "active" | "inactive";
}

export function WalletCurrency() {
  const { publish } = useEventEmitter();
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1000);

  const handleCurrencyClick = (currencyId: number) => {
    publish("show-right-panel", currencyId.toString());
  };

  // Sample currency data
  const currencyAssets: CurrencyAsset[] = [
    {
      id: 1,
      name: "Tether",
      ticker: "USDT",
      icon: "usdt",
      totalAssets: "12.32932832",
      available: "0.00840590",
      locked: "0.000000",
      usdtValue: "12.32932832",
      status: "active",
    },
    {
      id: 2,
      name: "ROI",
      ticker: "ROI",
      icon: "roi",
      totalAssets: "723.73829182",
      available: "0.00840590",
      locked: "0.000000",
      usdtValue: "723.73829182",
      status: "active",
    },
    {
      id: 3,
      name: "OpenKingdom",
      ticker: "OKT",
      icon: "okt",
      totalAssets: "1,324.85938271",
      available: "0.00840590",
      locked: "0.000000",
      usdtValue: "1,324.85938271",
      status: "active",
    },
  ];

  // Calculate totals
  const totals = currencyAssets.reduce(
    (acc, asset) => {
      const totalAssets = parseFloat(asset.totalAssets.replace(/,/g, "")) || 0;
      const available = parseFloat(asset.available) || 0;
      const locked = parseFloat(asset.locked) || 0;
      const usdtValue = parseFloat(asset.usdtValue.replace(/,/g, "")) || 0;
      return {
        totalAssets: acc.totalAssets + totalAssets,
        available: acc.available + available,
        locked: acc.locked + locked,
        usdtValue: acc.usdtValue + usdtValue,
      };
    },
    { totalAssets: 0, available: 0, locked: 0, usdtValue: 0 }
  );

  const currencyOptions = [
    { value: "", label: "Đơn vị tiền" },
    { value: "usdt", label: "USDT" },
    { value: "roi", label: "ROI" },
    { value: "okt", label: "OKT" },
  ];

  return (
    <>
      {/* Filter Section */}
      <div className="flex flex-col gap-2.5">
        <div className="flex gap-2.5 items-center">
          <div className="w-auto">
            <Select
              value={currencyFilter}
              onChange={setCurrencyFilter}
              placeholder="Đơn vị tiền"
              options={currencyOptions}
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="border border-[#cfd6de] rounded-md overflow-hidden">
        <Table>
          <TableHead>
            <TableRow className="bg-white">
              <TableHeaderCell align="left" className="w-[220px]">
                Tên tài sản
              </TableHeaderCell>
              <TableHeaderCell align="right" className="min-w-[150px]">
                Tổng tài sản
              </TableHeaderCell>
              <TableHeaderCell align="right" className="min-w-[150px]">
                Khả dụng
              </TableHeaderCell>
              <TableHeaderCell align="right" className="min-w-[150px]">
                Đang khoá
              </TableHeaderCell>
              <TableHeaderCell align="right" className="min-w-[200px]">
                Tổng tài sản quy đổi USDT
              </TableHeaderCell>
              <TableHeaderCell align="center" className="w-[90px]">
                Rút
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Summary Row */}
            <TableRow className="bg-[#f0f2f4]">
              <TableCell
                align="left"
                className="bg-[#f0f2f4] font-semibold text-xs leading-4"
              >
                12
              </TableCell>
              <TableCell
                align="right"
                className="bg-[#f0f2f4] font-semibold text-xs leading-4"
              >
                {formatNumber(totals.totalAssets)}
              </TableCell>
              <TableCell
                align="right"
                className="bg-[#f0f2f4] font-semibold text-xs leading-4"
              >
                {formatNumber(totals.available)}
              </TableCell>
              <TableCell
                align="right"
                className="bg-[#f0f2f4] font-semibold text-xs leading-4"
              >
                {formatNumber(totals.locked)}
              </TableCell>
              <TableCell
                align="right"
                className="bg-[#f0f2f4] font-semibold text-xs leading-4"
              >
                {formatNumber(totals.usdtValue)}
              </TableCell>
              <TableCell
                align="center"
                className="bg-[#f0f2f4] font-semibold text-xs leading-4"
              >
                --
              </TableCell>
            </TableRow>

            {/* Data Rows */}
            {currencyAssets.map((asset) => (
              <TableRow
                key={asset.id}
                onClick={() => handleCurrencyClick(asset.id)}
                className="h-14 cursor-pointer hover:bg-gray-50"
              >
                <TableCell align="left">
                  <div className="flex items-center gap-2">
                    {getCryptoIcon(asset.icon)}
                    <div className="flex items-center gap-2 text-sm leading-[18px]">
                      <span className="font-medium text-[#021337]">
                        {asset.name}
                      </span>
                      <span className="font-normal text-[#777e90]">
                        {asset.ticker}
                      </span>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-[#677187]" />
                  </div>
                </TableCell>
                <TableCell align="right" className="text-sm leading-5">
                  {asset.totalAssets}
                </TableCell>
                <TableCell align="right" className="text-sm leading-5">
                  {asset.available}
                </TableCell>
                <TableCell align="right" className="text-sm leading-5">
                  {asset.locked}
                </TableCell>
                <TableCell align="right" className="text-sm leading-5">
                  {asset.usdtValue}
                </TableCell>
                <TableCell align="center">
                  <div className="flex justify-center">
                    {getCurrencyStatusBadge(asset.status)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 p-2 border-t border-[#cfd6de]">
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </div>
      </div>
    </>
  );
}
