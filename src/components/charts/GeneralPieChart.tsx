import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { PieLabelRenderProps } from "recharts";

interface GeneralData {
  name: string;
  value: number;
  percentage: string;
  color: string;
}

interface GeneralPieChartProps {
  data: GeneralData[];
  className?: string;
  showInfo?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: GeneralData;
  }>;
}

// Custom tooltip component
function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1a1717] rounded-[8px] px-2 py-1.5 shadow-lg flex flex-col items-start">
        <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-bold text-[14px]">{(data.value / 1000).toFixed(1)}k</span>
            <span className="text-white font-bold text-[14px]">{data.percentage}</span>
        </div>
        <p className="text-[12px] font-normal text-white/80 whitespace-nowrap">
          {data.name}
        </p>
      </div>
    );
  }

  return null;
}

const RADIAN = Math.PI / 180;



// Simplified label render for the exact look in the image (floating boxes)
// The foreignObject approach allows using HTML/Tailwind inside SVG.
const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, payload } = props;
    const RADIAN = Math.PI / 180;
    // User allows overlap, so we bring labels closer to center to avoid clipping
    const radius = outerRadius - 10; 
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Center the box on the calculated point
    const width = 85;
    const height = 40;
    
    return (
        <foreignObject x={x - width / 2} y={y - height / 2} width={width} height={height}>
            <div className="bg-[#1a1717] rounded-[6px] px-1 py-1 flex flex-col items-center justify-center h-full shadow-lg">
                 <div className="flex items-center gap-1.5">
                    <span className="text-white font-bold text-[12px]">{(payload.value / 1000).toFixed(1)}k</span>
                    <span className="text-white font-bold text-[12px]">{payload.percentage}</span>
                </div>
                <p className="text-[12px] font-normal text-white whitespace-nowrap">
                  {payload.name}
                </p>
            </div>
        </foreignObject>
    );
};


export function GeneralPieChart({ data, className, showInfo = false }: GeneralPieChartProps) {
  return (
    <div
      className={`flex items-center justify-center w-full h-full ${className || ""}`}
    >
      <div className="w-full h-[195px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              innerRadius={55}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={0}
              label={showInfo ? renderCustomLabel : undefined}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            {!showInfo && <Tooltip content={<CustomTooltip />} />}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
