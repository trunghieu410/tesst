import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import {
  usePublisherNotes,
  useCreateNote,
  useDeleteNote,
} from "@/lib/queries/usePublishers";

import type { PublisherType, PublisherOverviewResponse } from "@/types";

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
  publisherId: string;
  overviewData?: PublisherOverviewResponse;
  isLoading?: boolean;
}

// Token icon mapping
const TokenIcon = ({ symbol }: { symbol: string }) => {
  switch (symbol?.toUpperCase()) {
    case "USDT":
      return <TetherIcon classes="w-8 h-8" />;
    case "ROI":
      return <RoiIcon classes="w-8 h-8" />;
    default:
      return <OpenKingdomIcon classes="w-8 h-8" />;
  }
};

export function PublisherOverview({
  publisher,
  publisherId,
  overviewData,
  isLoading,
}: PublisherOverviewProps) {
  const navigate = useNavigate();
  const [noteContent, setNoteContent] = useState("");

  // Notes API
  const { data: notes = [] } = usePublisherNotes(publisherId);
  const createNoteMutation = useCreateNote();
  const deleteNoteMutation = useDeleteNote();

  // Use API data or fallback to publisher data
  const memberSummary = overviewData?.memberSummary || {
    total:
      publisher.memberCount.total +
      publisher.memberCount.byTier.tier1 +
      publisher.memberCount.byTier.tier2 +
      publisher.memberCount.byTier.tier3,
    tier1: publisher.memberCount.byTier.tier1,
    tier2: publisher.memberCount.byTier.tier2,
    tier3: publisher.memberCount.byTier.tier3,
  };

  const walletAssets = overviewData?.wallet?.assets || [];
  const totalBalanceUsd = overviewData?.wallet?.totalBalanceUsd || 0;
  const accountStatusHistory = overviewData?.accountStatusHistory || [];
  const latestTransaction = overviewData?.latestTransaction;
  const blacklistCampaigns = overviewData?.blacklistCampaigns || [];

  const handleCreateNote = () => {
    if (!noteContent.trim()) return;
    createNoteMutation.mutate(
      { publisherId, content: noteContent },
      {
        onSuccess: () => setNoteContent(""),
      }
    );
  };

  const handleDeleteNote = (noteId: string) => {
    deleteNoteMutation.mutate({ publisherId, noteId });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCreateNote();
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <p className="text-gray-500">Loading overview...</p>
      </div>
    );
  }

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
              {memberSummary.total}
            </p>
          </div>

          {/* Tier 1 */}
          <div className="w-[180px] border-r border-[#cfd6de] px-6 py-0 flex flex-col gap-1 items-center justify-center">
            <p className="text-sm leading-5 text-[#677187] text-center w-full">
              Tầng 1
            </p>
            <p className="font-semibold text-base leading-6 text-[#021337] text-center w-full">
              {memberSummary.tier1}
            </p>
          </div>

          {/* Tier 2 */}
          <div className="w-[180px] border-r border-[#cfd6de] px-6 py-0 flex flex-col gap-1 items-center justify-center">
            <p className="text-sm leading-5 text-[#677187] text-center w-full">
              Tầng 2
            </p>
            <p className="font-semibold text-base leading-6 text-[#021337] text-center w-full">
              {memberSummary.tier2}
            </p>
          </div>

          {/* Tier 3 */}
          <div className="w-[180px] px-6 py-0 flex flex-col gap-1 items-center justify-center">
            <p className="text-sm leading-5 text-[#677187] text-center w-full">
              Tầng 3
            </p>
            <p className="font-semibold text-base leading-6 text-[#021337] text-center w-full">
              {memberSummary.tier3}
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
            onClick={() => navigate("/dashboard/wallet")}
          >
            Chi tiết
          </Button>
          <div className="flex-1" />
          <p className="font-medium text-lg leading-6 text-[#021337] text-right">
            ~{totalBalanceUsd.toLocaleString()} USD
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
            {walletAssets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <p className="text-center text-gray-500 py-4">
                    Không có tài sản
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              walletAssets.map((asset) => (
                <TableRow key={asset.symbol}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TokenIcon symbol={asset.symbol} />
                      <div className="contents">
                        <p className="font-medium text-sm text-[#021337]">
                          {asset.name}
                        </p>

                        <p className="text-xs text-[#777e90]">{asset.symbol}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="right">{asset.total.toFixed(8)}</TableCell>
                  <TableCell align="right">
                    {asset.available.toFixed(8)}
                  </TableCell>
                  <TableCell align="right">{asset.locked.toFixed(6)}</TableCell>
                  <TableCell align="right">
                    {asset.convertedToUsd.toFixed(8)}
                  </TableCell>
                </TableRow>
              ))
            )}
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
              items={
                accountStatusHistory.length > 0
                  ? accountStatusHistory.map((item) => ({
                      timestamp: `${item.createdAt} bởi ${item.actor}`,
                      description: item.status,
                      reason: item.reason ? `Lí do: ${item.reason}` : undefined,
                    }))
                  : [
                      {
                        timestamp: "Không có lịch sử",
                        description: "Chưa có thay đổi trạng thái",
                      },
                    ]
              }
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
              {notes.length === 0 ? (
                <p className="text-sm text-[#677187] text-center py-4">
                  Chưa có ghi chú
                </p>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="border-b border-[#cfd6de] pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs text-[#677187]">
                        {new Date(note.createdAt).toLocaleString("vi-VN")}
                      </p>
                      <div className="w-1.5 h-1.5 bg-[#677187] rounded-full"></div>
                      <p className="text-xs font-medium text-[#677187]">
                        {note.author.name}
                      </p>
                      <p className="text-xs text-[#677187]">
                        {note.author.email}
                      </p>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="ml-auto text-xs text-red-500 hover:text-red-700"
                        disabled={deleteNoteMutation.isPending}
                      >
                        Xoá
                      </button>
                    </div>
                    <p className="text-sm text-[#021337]">{note.content}</p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-3">
              <input
                type="text"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập nội dung ghi chú và enter"
                className="w-full px-3 py-2 border border-[#cfd6de] rounded text-sm text-[#677187] focus:outline-none focus:ring-1 focus:ring-[#021337]"
                disabled={createNoteMutation.isPending}
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
              items={
                latestTransaction
                  ? [
                      {
                        timestamp: latestTransaction.createdAt,
                        description: `${latestTransaction.type} ${latestTransaction.amount} ${latestTransaction.token}`,
                      },
                    ]
                  : [
                      {
                        timestamp: "",
                        description: "Chưa có giao dịch",
                      },
                    ]
              }
              maxHeight="189px"
            />
          </div>
        </div>

        {/* Campaign Blacklist */}
        <div className="bg-white border-[0.5px] border-[#e7e9eb] rounded-lg h-[250px]">
          <div className="px-4 py-3">
            <Timeline
              title="Blacklist chiến dịch"
              counter={blacklistCampaigns.length}
              icon={DangerIcon}
              items={
                blacklistCampaigns.length > 0
                  ? blacklistCampaigns.map((campaign) => ({
                      timestamp: campaign.addedAt,
                      description: campaign.campaignName,
                      reason: campaign.reason
                        ? `Lí do: ${campaign.reason}`
                        : undefined,
                      link: campaign.campaignId,
                    }))
                  : [
                      {
                        timestamp: "",
                        description: "Không có trong blacklist nào",
                      },
                    ]
              }
              maxHeight="189px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

