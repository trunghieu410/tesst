import { cn } from "@/lib/utils/common";

interface CountryData {
  rank: number;
  country: string;
  flag: string;
  pubs: number;
}

interface CountriesTableProps {
  data: CountryData[];
  className?: string;
}

export function CountriesTable({ data, className }: CountriesTableProps) {
  return (
    <div
      className={cn(
        "bg-white border-[#d0d5dd] border-[0.5px] border-solid rounded-bl-[6px] rounded-br-[6px] w-full",
        className
      )}
    >
      <div className="flex items-start overflow-clip rounded-[inherit] w-full">
        {/* Rank Column */}
        <div className="bg-white flex flex-col items-start shrink-0 w-[70px]">
          {/* Header */}
          <div className="border-[#cfd6de] border-b border-solid box-border flex flex-col h-[32px] items-start justify-center px-[10px] py-[8px] w-full">
            <div className="flex gap-[4px] items-center justify-center w-full">
              <div className="flex items-center self-stretch">
                <div className="flex flex-col h-full items-start justify-center">
                  <div className="flex gap-[10px] items-center justify-center">
                    <div className="flex flex-col font-['Inter'] font-medium justify-center text-[#021337] text-[12px] leading-[16px]">
                      <p className="whitespace-pre">#</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Rows */}
          {data.map((row, index) => (
            <div
              key={index}
              className={cn(
                "box-border flex gap-[10px] items-center justify-center px-[10px] py-[8px] w-full",
                index !== data.length - 1 &&
                  "border-[#cfd6de] border-b-[0.5px] border-solid"
              )}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col font-['Inter'] font-normal justify-center text-[#021337] text-[14px] leading-[20px]">
                  <p className="whitespace-pre">{row.rank}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Country Column */}
        <div className="flex flex-col items-center shrink-0 w-[130px]">
          {/* Header */}
          <div className="border-[#cfd6de] border-b border-solid box-border flex flex-col h-[32px] items-start justify-center px-[10px] py-[8px] w-full">
            <div className="flex gap-[4px] items-center w-full">
              <div className="flex items-center self-stretch">
                <div className="flex flex-col h-full items-start justify-center">
                  <div className="flex gap-[10px] items-center justify-center">
                    <div className="flex flex-col font-['Inter'] font-medium justify-center text-[#021337] text-[12px] leading-[16px]">
                      <p className="whitespace-pre">Quốc gia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Rows */}
          {data.map((row, index) => (
            <div
              key={index}
              className={cn(
                "box-border flex flex-col items-start justify-center px-[10px] py-[8px] w-full",
                index !== data.length - 1 &&
                  "border-[#cfd6de] border-b-[0.5px] border-solid"
              )}
            >
              <div className="flex gap-[8px] items-center">
                <span className="text-[20px] shrink-0 size-[20px] flex items-center justify-center">
                  {row.flag}
                </span>
                <div className="flex flex-col items-start justify-center">
                  <div className="flex flex-col font-['Inter'] font-normal justify-center text-[#021337] text-[13px] leading-[16px]">
                    <p className="whitespace-pre">{row.country}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pubs Column */}
        <div className="flex-1 flex flex-col items-center min-w-0">
          {/* Header */}
          <div className="border-[#cfd6de] border-b border-solid box-border flex flex-col h-[32px] items-start justify-center px-[10px] py-[8px] w-full">
            <div className="flex gap-[4px] items-center justify-end w-full">
              <div className="flex items-center self-stretch">
                <div className="flex flex-col h-full items-end justify-center">
                  <div className="flex gap-[10px] items-center justify-center">
                    <div className="flex flex-col font-['Inter'] font-medium justify-center text-[#021337] text-[12px] leading-[16px] text-right">
                      <p className="whitespace-pre">SLg Pub</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Rows */}
          {data.map((row, index) => (
            <div
              key={index}
              className={cn(
                "box-border flex gap-[10px] items-center px-[10px] py-[8px] w-full",
                index !== data.length - 1 &&
                  "border-[#cfd6de] border-b-[0.5px] border-solid"
              )}
            >
              <div className="flex-1 flex flex-col items-start justify-center min-w-0">
                <div className="flex flex-col font-['Inter'] font-normal justify-center text-[#021337] text-[14px] leading-[20px] text-right w-full">
                  <p>{row.pubs.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
