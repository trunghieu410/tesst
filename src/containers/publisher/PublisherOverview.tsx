import { MembersIcon } from "@/icon/MembersIcon";
import { OpenKingdomIcon } from "@/icon/OpenKingdomIcon";
import { WalletIcon } from "@/icon/WalletIcon";
import { InfoIcon } from "@/icon/InfoIcon";
import { ChevronRightIcon } from "@/icon/ChevronRightIcon";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";
import { TetherIcon } from "@/icon/TetherIcon";
import { RoiIcon } from "@/icon/RoiIcon";
import { Timeline } from "@/components/features/Timeline";
import { Notes } from "@/icon/Notes";
import { HistoricalIcon } from "@/icon/HistoricalIcon";
import { ClockIcon } from "@/icon/ClockIcon";
import { DangerIcon } from "@/icon/DangerIcon";

import type { PublisherType } from "@/types";

interface PublisherOverviewProps {
  publisher: PublisherType & {
    memberCount: {
      total: number;
      byTier: {
        tier1: number;
        tier2: number;
        tier3: number;
      };
    };
  };
}

const mockWallets = [
  {
    name: "Tether",
    code: "USDT",
    total: 0.0084059,
    available: 0.0084059,
    locked: 0.0,
    converted: 0.00000042,
  },
  {
    name: "Roi",
    code: "ROI",
    total: 0.0084059,
    available: 0.0084059,
    locked: 0.0,
    converted: 0.00000042,
  },
  {
    name: "OpenKingdom",
    code: "OKT",
    total: 0.0084059,
    available: 0.0084059,
    locked: 0.0,
    converted: 0.00000042,
  },
];

export function PublisherOverview({ publisher }: PublisherOverviewProps) {
  return (
    <div className="p-4 space-y-4 pb-20 ">
      {/* Total Members Card */}
      <div className="bg-white border border-[#e7e9eb] rounded-lg overflow-hidden py-3">
        <div className="flex">
          {/* First column: Icon, Label, Info Icon, and Total */}
          <div className="flex-1 border-r border-[#cfd6de] px-6 py-0 flex flex-col gap-1 items-center justify-center">
            <div className="flex items-center justify-center gap-2.5">
              <div className="bg-[#ffd9cc] rounded p-1 flex items-center justify-center">
                <MembersIcon classes="w-4 h-4" />
              </div>
              <p className="font-medium text-sm leading-5 text-[#021337] whitespace-nowrap">
                Tổng thành viên
              </p>
              <InfoIcon className="w-4 h-4 shrink-0" />
            </div>
            <p className="font-semibold text-base leading-6 text-center text-[#021337] w-full">
              {publisher.memberCount.total +
                publisher.memberCount.byTier.tier1 +
                publisher.memberCount.byTier.tier2 +
                publisher.memberCount.byTier.tier3}
            </p>
          </div>

          {/* Tier 1 */}
          <div className="w-[180px] border-r border-[#cfd6de] px-6 py-0 flex flex-col gap-1 items-center justify-center">
            <p className="text-sm leading-5 text-[#677187] text-center w-full">
              Tầng 1
            </p>
            <p className="font-semibold text-base leading-6 text-[#021337] text-center w-full">
              {publisher.memberCount.byTier.tier1}
            </p>
          </div>

          {/* Tier 2 */}
          <div className="w-[180px] border-r border-[#cfd6de] px-6 py-0 flex flex-col gap-1 items-center justify-center">
            <p className="text-sm leading-5 text-[#677187] text-center w-full">
              Tầng 2
            </p>
            <p className="font-semibold text-base leading-6 text-[#021337] text-center w-full">
              {publisher.memberCount.byTier.tier2}
            </p>
          </div>

          {/* Tier 3 */}
          <div className="w-[180px] px-6 py-0 flex flex-col gap-1 items-center justify-center">
            <p className="text-sm leading-5 text-[#677187] text-center w-full">
              Tầng 3
            </p>
            <p className="font-semibold text-base leading-6 text-[#021337] text-center w-full">
              {publisher.memberCount.byTier.tier3}
            </p>
          </div>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="bg-white border border-[#e7e9eb] rounded-lg overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-3 ">
          <div className="bg-[#ffd9cc] rounded-lg p-1 flex items-center justify-center">
            <WalletIcon classes="w-4 h-4" />
          </div>
          <p className="font-medium text-sm leading-5 text-[#021337]">Ví</p>
          <Button
            variant="outline"
            size="sm"
            rightIcon={<ChevronRightIcon className="w-4 h-4 text-[#021337]" />}
            className="h-8 px-3 py-2 text-[13px]"
          >
            Chi tiết
          </Button>
          <div className="flex-1" />
          <p className="font-medium text-lg leading-6 text-[#021337] text-right">
            ~3,342.321322 USD
          </p>
        </div>
        <Table className="border-[#b5bcc4] border rounded-lg rounded-t-none">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Tên tài sản</TableHeaderCell>
              <TableHeaderCell align="right">Tổng tài sản</TableHeaderCell>
              <TableHeaderCell align="right">Khả dụng</TableHeaderCell>
              <TableHeaderCell align="right">Đang khoá</TableHeaderCell>
              <TableHeaderCell align="right">Quy đổi USD</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockWallets.map((wallet) => (
              <TableRow key={wallet.code}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {wallet.code === "USDT" ? (
                      <TetherIcon classes="w-8 h-8" />
                    ) : wallet.code === "ROI" ? (
                      <RoiIcon classes="w-8 h-8" />
                    ) : (
                      <OpenKingdomIcon classes="w-8 h-8" />
                    )}
                    <div className="contents">
                      <p className="font-medium text-sm text-[#021337]">
                        {wallet.name}
                      </p>

                      <p className="text-xs text-[#777e90]">{wallet.code}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right">{wallet.total.toFixed(8)}</TableCell>
                <TableCell align="right">
                  {wallet.available.toFixed(8)}
                </TableCell>
                <TableCell align="right">{wallet.locked.toFixed(6)}</TableCell>
                <TableCell align="right">
                  {wallet.converted.toFixed(8)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Info-4-blocks */}
      <div className="grid grid-cols-2 gap-x-2.5 gap-y-4">
        {/* Account Status History */}
        <div className="bg-white border-[0.5px] border-[#e7e9eb] rounded-lg h-[250px] overflow-hidden">
          <div className="px-4 py-3">
            <Timeline
              title="Lịch sử trạng thái tài khoản"
              icon={HistoricalIcon}
              items={[
                {
                  timestamp: "10 giờ trước bởi Hà Kiêu (hakieu@ok.co)",
                  description: "Kích hoạt",
                  reason: "Lí do: Đã thoả thuận xử lý khiếu nại xong.",
                },
                {
                  timestamp: "12 giờ trước bởi Hệ thống",
                  description: "Tạm khoá",
                  reason: "Lí do: 2 lần vào blacklist chiến dịch",
                },
                {
                  timestamp: "3 ngày trước bởi David Do (daviddo@gmail.com)",
                  description: "Kích hoạt",
                },
                {
                  timestamp: "3 ngày trước bởi David Do (daviddo@gmail.com)",
                  description: "Chưa kích hoạt",
                },
              ]}
              maxHeight="189px"
            />
          </div>
        </div>

        {/* Internal Notes */}
        <div className="bg-white border-[0.5px] border-[#e7e9eb] rounded-lg h-[250px]">
          <div className="px-4 py-3">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="bg-[#ffd9cc] rounded p-1 flex items-center justify-center">
                <Notes className="w-4 h-4" />
              </div>
              <p className="font-medium text-sm leading-5 text-[#021337]">
                Ghi chú nội bộ
              </p>
            </div>
            <div className="space-y-3 overflow-scroll max-h-[140px]">
              <div className="border-b border-[#cfd6de] pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs text-[#677187]">31.10.2025 - 18:11</p>
                  <div className="w-1.5 h-1.5 bg-[#677187] rounded-full"></div>
                  <p className="text-xs font-medium text-[#677187]">
                    Phan Công Kiều
                  </p>
                  <p className="text-xs text-[#677187]">kieu.phan@gmail.co</p>
                </div>
                <p className="text-sm text-[#021337]">
                  Internal audit random check bạn này nha
                </p>
              </div>
              <div className="border-b border-[#cfd6de] pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs text-[#677187]">30.10.2025 - 18:11</p>
                  <div className="w-1.5 h-1.5 bg-[#677187] rounded-full"></div>
                  <p className="text-xs font-medium text-[#677187]">
                    Super Admin
                  </p>
                  <p className="text-xs text-[#677187]">daviddo@ok.co</p>
                </div>
                <p className="text-sm text-[#021337]">
                  User này sao rút đuọc hơn số dư khả dụng vậy mọi người?
                </p>
              </div>
            </div>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Nhập nội dung ghi chú và enter"
                className="w-full px-3 py-2 border border-[#cfd6de] rounded text-sm text-[#677187] focus:outline-none focus:ring-1 focus:ring-[#021337]"
              />
            </div>
          </div>
        </div>

        {/* Latest Transactions */}
        <div className="bg-white border-[0.5px] border-[#e7e9eb] rounded-lg h-[250px] overflow-hidden">
          <div className="px-4 py-3">
            <Timeline
              isDetailButton
              title="Giao dịch mới nhất"
              icon={ClockIcon}
              items={[
                {
                  timestamp: "12 giờ trước",
                  description: "Received 5.00 OKT for campaign's income",
                },
                {
                  timestamp: "1 ngày trước",
                  description: "Received 0.5 OKT for member's income",
                },
                {
                  timestamp: "3 ngày trước",
                  description: "Received 5.00 OKT for campaign's income",
                },
              ]}
              maxHeight="189px"
            />
          </div>
        </div>

        {/* Campaign Blacklist */}
        <div className="bg-white border-[0.5px] border-[#e7e9eb] rounded-lg h-[250px]">
          <div className="px-4 py-3">
            <Timeline
              title="Blacklist chiến dịch"
              counter={2}
              icon={DangerIcon}
              items={[
                {
                  timestamp: "12 giờ trước bởi Hà Kiêu (hakieu@ok.co)",
                  description: "Checkin mỗi ngày nhận airdrop OKT",
                  reason: "Lí do: Cheating",
                  link: "abc",
                },
                {
                  timestamp: "15 giờ trước bởi Hà Kiêu (hakieu@ok.co)",
                  description: "Checkin mỗi ngày nhận airdrop OKT",
                  reason: "Lí do: Cheating",
                  link: "abc",
                },
              ]}
              maxHeight="189px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
