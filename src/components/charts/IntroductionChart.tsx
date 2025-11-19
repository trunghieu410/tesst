import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartData {
  date: string;
  primary: number;
  secondary: number;
}

interface IntroductionChartProps {
  data: ChartData[];
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export function IntroductionChart({
  data,
  className,
  primaryColor = "#677187",
  secondaryColor = "#ff3b34",
}: IntroductionChartProps) {
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const change = payload[0].value - payload[1].value;
      const percentChange = ((change / payload[1].value) * 100).toFixed(2);
      const sign = change >= 0 ? "+" : "";

      return (
        <div className="bg-[rgba(0,0,0,0.9)] px-2 py-1 rounded text-white text-[12px] font-medium">
          {sign}
          {percentChange}%
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="0"
            stroke="#d0d5dd"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#021337", fontSize: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#021337", fontSize: 10 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar
            dataKey="primary"
            fill={primaryColor}
            radius={[2, 2, 0, 0]}
            barSize={16}
          >
            {data.map((_, index) => (
              <Cell key={`cell-primary-${index}`} />
            ))}
          </Bar>
          <Bar
            dataKey="secondary"
            fill={secondaryColor}
            radius={[2, 2, 0, 0]}
            barSize={16}
          >
            {data.map((_, index) => (
              <Cell key={`cell-secondary-${index}`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
