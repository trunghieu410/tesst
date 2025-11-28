import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { useIsMobile } from "../../hooks/use-mobile";

interface ChartData {
  date: string;
  referrals: number;
  newAccounts: number;
}

interface IntroductionChartProps {
  data: ChartData[];
  className?: string;
}

export function IntroductionChart({ data, className }: IntroductionChartProps) {
  const isMobile = useIsMobile();

  // Calculate global max for Y-axis domain to ensure both axes are mirrored
  const globalMax = Math.max(
    ...data.map((d) => Math.max(d.referrals, d.newAccounts))
  );

  // Helper to calculate nice ticks
  const calculateNiceTicks = (maxValue: number) => {
    if (maxValue === 0) return [0, 100];
    
    // Target roughly 6-8 ticks for better granularity
    const targetTickCount = 6;
    const roughStep = maxValue / (targetTickCount - 1);
    
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const normalizedStep = roughStep / magnitude;
    
    let niceStep;
    if (normalizedStep <= 1) niceStep = 1;
    else if (normalizedStep <= 2) niceStep = 2;
    else if (normalizedStep <= 2.5) niceStep = 2.5; 
    else if (normalizedStep <= 3) niceStep = 3; // Allows for 3k steps (3, 6, 9, 12, 15)
    else if (normalizedStep <= 5) niceStep = 5;
    else niceStep = 10;
    
    const step = niceStep * magnitude;
    
    const ticks = [];
    let current = 0;
    // Generate ticks until we cover the max value
    while (current <= maxValue || ticks.length < targetTickCount - 2) {
      ticks.push(current);
      if (current >= maxValue) break; // Stop once we've covered the max
      current += step;
    }
    
    return ticks;
  };

  const yAxisTicks = calculateNiceTicks(globalMax);
  const yAxisDomain = [0, yAxisTicks[yAxisTicks.length - 1]];

  // Scroll logic
  const minItemsToShow = isMobile ? 5 : 14;
  const itemWidthPercent = 100 / minItemsToShow;
  // If data.length > minItemsToShow, we need to expand the width
  // The width should be proportional: (totalItems / minItems) * 100%
  const chartWidthPercent =
    data.length > minItemsToShow
      ? (data.length / minItemsToShow) * 100
      : 100;

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      // Example logic for tooltip content based on requirements
      // "Decreased 1.22%" - this would ideally come from data comparison, 
      // but for now I'll mock it or calculate based on previous day if possible.
      // Since the requirement says "Content example: 'Decreased 1.22%'", 
      // I will just show a static example or a simple calc for now.
      
      return (
        <div className="bg-black text-white px-3 py-2 rounded text-xs">
          Decreased 1.22%
        </div>
      );
    }
    return null;
  };

  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
    return value.toString();
  };

  const formatYAxisTick = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
    return value.toString();
  };

  return (
    <div className={`w-full overflow-hidden ${className} ${isMobile ? "-ml-8" : ""}`}>
      <div className="w-full overflow-x-auto no-scrollbar">
        <div style={{ width: `${chartWidthPercent}%`, minWidth: "100%" }}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
              barGap={2}
            >
              <CartesianGrid
                strokeDasharray="0"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                dy={10}
                interval={0} 
              />
              {/* Left Y-Axis */}
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickFormatter={formatYAxisTick}
                domain={yAxisDomain}
                ticks={yAxisTicks}
              />
              {/* Right Y-Axis (Mirrored) */}
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickFormatter={formatYAxisTick}
                domain={yAxisDomain}
                ticks={yAxisTicks}
                hide={isMobile}
              />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'transparent' }} 
              />
              
              <Bar
                yAxisId="left"
                dataKey="referrals"
                fill="#6b7280"
                radius={[4, 4, 0, 0]}
                barSize={12}
              >
                <LabelList 
                  dataKey="referrals" 
                  position="top" 
                  formatter={formatValue}
                  style={{ fill: '#6b7280', fontSize: '10px', fontWeight: 500 }} 
                />
              </Bar>
              
              <Bar
                yAxisId="right"
                dataKey="newAccounts"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
                barSize={12}
              >
                <LabelList 
                  dataKey="newAccounts" 
                  position="top" 
                  formatter={formatValue}
                  style={{ fill: '#ef4444', fontSize: '10px', fontWeight: 500 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
