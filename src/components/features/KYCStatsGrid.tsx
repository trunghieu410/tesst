import { CompactStatsCard } from "@/components/ui/StatsCard";

interface KYCStats {
  approved: { value: number; percentage: string };
  notDone: { value: number; percentage: string };
  pending: { value: number; percentage: string };
  rejected: { value: number; percentage: string };
}

interface KYCStatsGridProps {
  stats: KYCStats;
  className?: string;
}

export function KYCStatsGrid({ stats, className }: KYCStatsGridProps) {
  return (
    <div className={className}>
      {/* First row */}
      <div className="flex gap-2.5 ">
        <CompactStatsCard
          label="Đã duyệt"
          value={stats.approved.value.toLocaleString()}
          percentage={stats.approved.percentage}
          valueColor="positive"
          className="flex-1 border-[0.5px] border-[#d0d5dd] rounded-md"
        />
        <CompactStatsCard
          label="Chưa làm"
          value={stats.notDone.value.toLocaleString()}
          percentage={stats.notDone.percentage}
          valueColor="default"
          className="flex-1 border-[0.5px] border-[#d0d5dd] rounded-md"
        />
      </div>

      {/* Second row */}
      <div className="flex gap-2.5 mt-3">
        <CompactStatsCard
          label="Chờ duyệt"
          value={stats.pending.value.toLocaleString()}
          percentage={stats.pending.percentage}
          valueColor="warning"
          className="flex-1 border-[0.5px] border-[#d0d5dd] rounded-md"
        />
        <CompactStatsCard
          label="Từ chối"
          value={stats.rejected.value.toLocaleString()}
          percentage={stats.rejected.percentage}
          valueColor="negative"
          className="flex-1 border-[0.5px] border-[#d0d5dd] rounded-md"
        />
      </div>
    </div>
  );
}
