import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface GenderData {
  name: string;
  value: number;
  percentage: string;
  color: string;
}

interface GenderPieChartProps {
  data: GenderData[];
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: GenderData;
  }>;
}

// Custom tooltip component matching Figma design
function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1717] rounded-[4px] px-[4px] py-[2px] shadow-lg">
        <p className="text-[12px] font-normal leading-4 text-white whitespace-nowrap">
          {payload[0].name}
        </p>
      </div>
    );
  }

  return null;
}

export function GenderPieChart({ data, className }: GenderPieChartProps) {
  return (
    <div
      className={`flex gap-4 items-center justify-center ${className || ""}`}
    >
      {/* Chart */}
      <div className="flex flex-col gap-2.5 shrink-0">
        <div className="w-[150px] h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={75}
                innerRadius={45}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3 px-4 py-0">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-[15px] h-[10px] shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <p className="text-[14px] leading-4 text-[#2c2a2a]">
              <span className="font-bold">
                {(item.value / 1000).toFixed(1)}k {item.percentage}{" "}
              </span>
              <span className="font-normal">{item.name}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
