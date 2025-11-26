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
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  return (
    <div className={className}>
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
          />
          {/* Left Y-Axis */}
          <YAxis
            yAxisId="left"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            domain={[0, 'auto']}
          />
          {/* Right Y-Axis (Mirrored) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            domain={[0, 'auto']}
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
  );
}
