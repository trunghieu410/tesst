import { cn } from "@/lib/utils/common";

interface AgeData {
  label: string;
  value: number;
  percentage: string;
  count: string;
}

interface AgeBarChartProps {
  data: AgeData[];
  className?: string;
}

export function AgeBarChart({ data, className }: AgeBarChartProps) {
  // Find max value for normalization
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {data.map((item, index) => {
        const widthPercentage = (item.value / maxValue) * 100;

        return (
          <div key={index} className="flex flex-col gap-[2px]">
            {/* Label */}
            <p className="text-[13px] font-normal leading-4 text-[#021337]">
              {item.label}
            </p>

            {/* Bar and stats */}
            <div className="flex items-center gap-1">
              {/* Progress bar container */}
              <div className="flex-1 h-[15px] bg-transparent relative flex items-center">
                {/* Filled bars (represented as rectangles) */}
                <div
                  className="h-[15px] flex items-center"
                  style={{ width: `${widthPercentage}%` }}
                >
                  {/* Create individual segments */}
                  {Array.from({
                    length: Math.ceil(widthPercentage / 5),
                  }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[13.85px] h-[15px] bg-[#021337]"
                      style={{
                        opacity:
                          i < Math.floor(widthPercentage / 5)
                            ? 1
                            : (widthPercentage % 5) / 5,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Percentage */}
              <p className="text-[13px] font-normal leading-5 text-[#021337] min-w-[42px]">
                {item.percentage}
              </p>

              {/* Count */}
              <p className="text-[13px] font-normal leading-4 text-[#677187] min-w-[45px]">
                {item.count}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
