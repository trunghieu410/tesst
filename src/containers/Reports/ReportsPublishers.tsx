import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useEffect, useState } from "react";
import { StatsCard } from "@/components/ui/StatsCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { IntroductionChart } from "@/components/charts/IntroductionChart";
import { GenderPieChart } from "@/components/charts/GenderPieChart";
import { ActivityLineChart } from "@/components/charts/ActivityLineChart";
import { AgeBarChart } from "@/components/charts/AgeBarChart";
import { KYCStatsGrid } from "@/components/features/KYCStatsGrid";
import { CountriesTable } from "@/components/features/CountriesTable";
import { MembersTable } from "@/components/features/MembersTable";
import { Dropdown } from "@/components/ui/Dropdown";
import { DateRangeInput } from "@/components/ui/DateRangeInput";
import { Tooltip } from "@/components/ui/Tooltip";

type CountryTabType = "members" | "airdrop" | "camp";
type MembersTabType = "members" | "airdrop" | "camp";

export function ReportsPublishers() {
  const { publish } = useEventEmitter();
  const [countryTab, setCountryTab] = useState<CountryTabType>("members");
  const [membersTab, setMembersTab] = useState<MembersTabType>("members");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [dateRange, setDateRange] = useState("1.10 - 30.11");

  useEffect(() => {
    publish("title-change", { title: "Publishers" });
  }, [publish]);

  // Sample data for charts
  const introductionData = [
    { date: "26.10", primary: 11900, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11800 },
    { date: "26.10", primary: 11900, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11800 },
    { date: "26.10", primary: 11800, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11900 },
    { date: "26.10", primary: 11000, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11900 },
  ];

  const genderData = [
    { name: "Kích hoạt", value: 12300, percentage: "6.7%", color: "#00a349" },
    { name: "Tạm khoá", value: 23600, percentage: "27.9%", color: "#d0d5dd" },
    { name: "Đã xoá", value: 2400, percentage: "14.1%", color: "#ff3b34" },
  ];

  const activityData = Array.from({ length: 20 }, (_, i) => ({
    date: `${i}`,
    value: 60 + Math.random() * 20,
  }));

  const ageData = [
    {
      label: "Dưới 18 tuổi",
      value: 0.102,
      percentage: "10.2%",
      count: "15,000",
    },
    {
      label: "18 tuổi - 25 tuổi",
      value: 0.402,
      percentage: "40.2%",
      count: "45,000",
    },
    {
      label: "26 tuổi - 35 tuổi",
      value: 0.202,
      percentage: "20.2%",
      count: "25,000",
    },
    {
      label: "36 tuổi - 45 tuổi",
      value: 0.402,
      percentage: "40.2%",
      count: "45,000",
    },
    {
      label: "46 tuổi - 55 tuổi",
      value: 0.402,
      percentage: "40.2%",
      count: "25,700",
    },
    { label: "Trên 55", value: 0.402, percentage: "40.2%", count: "25,700" },
  ];

  const kycStats = {
    approved: { value: 50000, percentage: "50.00%" },
    notDone: { value: 10000, percentage: "10.00%" },
    pending: { value: 20000, percentage: "20.00%" },
    rejected: { value: 20000, percentage: "20.00%" },
  };

  const countriesData = [
    { rank: 1, country: "Vietnam", flag: "🇻🇳", pubs: 50321 },
    { rank: 2, country: "Thailand", flag: "🇹🇭", pubs: 50000 },
    { rank: 3, country: "Indonesia", flag: "🇮🇩", pubs: 49382 },
    { rank: 4, country: "Australia", flag: "🇦🇺", pubs: 48032 },
    { rank: 5, country: "Brazil", flag: "🇧🇷", pubs: 47328 },
    { rank: 6, country: "Israel", flag: "🇮🇱", pubs: 45719 },
    { rank: 7, country: "Cyprus", flag: "🇨🇾", pubs: 44282 },
    { rank: 8, country: "Kazakhstan", flag: "🇰🇿", pubs: 40430 },
    { rank: 9, country: "Libea", flag: "🇱🇾", pubs: 38438 },
    { rank: 10, country: "Finland", flag: "🇫🇮", pubs: 31382 },
  ];

  const membersData = [
    {
      rank: 1,
      name: "Phan Công Kiều",
      email: "kieu.phan@gmail.com",
      flag: "🇻🇳",
      totalPub: 12321,
      f1: 10000,
      f2: 2000,
      f3: 321,
    },
    {
      rank: 2,
      name: "Tuấn Phạm",
      email: "tuan@gmail.com",
      flag: "⚠️",
      totalPub: 12000,
      f1: 30,
      f2: 30,
      f3: 30,
    },
    {
      rank: 3,
      name: "Trung Nguyễn",
      email: "trung@gmail.com",
      flag: "⚠️",
      totalPub: 11032,
      f1: 342,
      f2: 342,
      f3: 342,
    },
    {
      rank: 4,
      name: "Hậu Hoàng",
      email: "q.xem@gmail.com",
      flag: "🇻🇳",
      totalPub: 11000,
      f1: 100,
      f2: 100,
      f3: 100,
    },
    {
      rank: 5,
      name: "Hà Nhẫy",
      email: "nhay@gmail.com",
      flag: "🇻🇳",
      totalPub: 10324,
      f1: 100,
      f2: 100,
      f3: 100,
    },
    {
      rank: 6,
      name: "LongWang",
      email: "longwang@gmail.com",
      flag: "🇨🇳",
      totalPub: 10090,
      f1: 100,
      f2: 100,
      f3: 100,
    },
    {
      rank: 7,
      name: "Đại La Thanh",
      email: "dai@gmail.com",
      flag: "🇻🇳",
      totalPub: 9032,
      f1: 100,
      f2: 100,
      f3: 100,
    },
  ];
  const countryOptions = [
    { value: "VN", label: "Vietnam" },
    { value: "TH", label: "Thailand" },
    { value: "ID", label: "Indonesia" },
    { value: "MY", label: "Malaysia" },
  ];

  /*report-section*/
  return (
    <>
      {/* Top Stats Bar */}
      <div className="bg-[#feeddc] box-border flex items-center px-[16px] py-0 overflow-x-auto">
        <span className="font-medium leading-4 text-[#021337] text-[12px] whitespace-nowrap">
          All time
        </span>
        <StatsCard label="Tổng pub" value="54.6k" showBorder={false} />
        <StatsCard
          label="Kích hoạt"
          value="1k"
          valueColor="positive"
          showBorder
        />
        <StatsCard label="Tạm khóa" value="1.2k" showBorder />
        <StatsCard
          label="Đã xoá"
          value="1.7k"
          valueColor="negative"
          showBorder
        />
        <StatsCard label="Quốc gia" value="80" showBorder />
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-md flex items-center gap-4 px-4 py-3">
        <Tooltip position="top" tooltipsText="Thời gian tạo.">
          <DateRangeInput
            value={dateRange}
            onChange={setDateRange}
            className="w-[140px]"
          />
        </Tooltip>
        <Dropdown
          value={selectedCountry}
          onChange={setSelectedCountry}
          placeholder="Quốc gia"
          options={countryOptions}
          className="w-auto min-w-[120px]"
        />
      </div>

      <div className="p-3 flex flex-col gap-4 bg-[#f3f4f5]">
        {/* Introduction Chart Section */}
        <SectionCard title="Giới thiệu" showInfoIcon contentClassName="pb-0">
          {/* Stats row */}
          <div className="flex items-center gap-6 mb-4 pb-4 border-b border-[#d0d5dd]">
            <div className="flex flex-col">
              <span className="text-[10px] font-normal leading-3.5 text-[#677187]">
                Tổng click link referral
              </span>
              <span className="text-[18px] font-semibold leading-[26px] text-[#021337]">
                100,000
              </span>
            </div>
            <div className="flex flex-col border-l border-[#d0d5dd] pl-6">
              <span className="text-[10px] font-normal leading-3.5 text-[#677187]">
                Tài khoản mới
              </span>
              <span className="text-[18px] font-semibold leading-[26px] text-[#ff3b34]">
                92,920
              </span>
            </div>
            <div className="flex flex-col border-l border-[#d0d5dd] pl-6">
              <span className="text-[10px] font-normal leading-3.5 text-[#677187]">
                CVR
              </span>
              <span className="text-[18px] font-semibold leading-[26px] text-[#00a349]">
                92.92%
              </span>
            </div>
          </div>

          {/* Chart */}
          <IntroductionChart data={introductionData} />
        </SectionCard>

        {/* Second Row: Gender Pie Chart and KYC Stats */}
        <div className="flex flex-col gap-3 md:flex-row">
          {/* statustable */}
          <div className="w-full md:flex-1 md:min-w-0">
            <SectionCard
              title="Trạng thái tài khoản"
              contentClassName="pb-4 pt-4.5 px-0"
            >
              <GenderPieChart data={genderData} />
            </SectionCard>
          </div>

          {/* statusKyc */}
          <div className="w-full md:flex-1 md:min-w-0">
            <SectionCard
              title="KYC"
              showInfoIcon
              contentClassName="pb-3 pt-0 px-4 flex flex-col gap-3"
            >
              <KYCStatsGrid stats={kycStats} />
            </SectionCard>
          </div>
        </div>

        {/* Third Row: Activity, Engagement, Gender, and Age */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* activeBlock */}
          <SectionCard title="Hoạt động" contentClassName="pb-2">
            <div className="mb-2">
              <p className="text-[24px] font-semibold leading-8 text-[#021337]">
                76.21%
              </p>
              <p className="text-[18px] font-normal leading-6 text-[#a1abbf]">
                ~76,200
              </p>
            </div>
            <ActivityLineChart data={activityData} color="#021337" />
          </SectionCard>

          {/* tasstBlock */}
          <SectionCard title="Năng động" contentClassName="pb-2">
            <div className="mb-2">
              <p className="text-[24px] font-semibold leading-8 text-[#021337]">
                32.21%
              </p>
              <p className="text-[18px] font-normal leading-6 text-[#a1abbf]">
                ~27,200
              </p>
            </div>
            <ActivityLineChart data={activityData} color="#ff3b34" />
          </SectionCard>

          {/* genderBlock */}
          <SectionCard title="Giới tính" contentClassName="pb-2 relative">
            <GenderPieChart data={genderData} />
          </SectionCard>

          {/* ageBlock */}
          <SectionCard title="Tuổi" contentClassName="py-3">
            <AgeBarChart data={ageData} />
          </SectionCard>
        </div>

        {/* Bottom Row: Tables */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[530px_1fr]">
          {/*CountriesTable-section*/}
          <SectionCard
            title="89 Quốc gia"
            headerActions={
              <div className="bg-[#edf2fd] box-border flex h-[32px] items-center justify-center px-[2px] py-0 rounded-[6px] shrink-0">
                <button
                  onClick={() => setCountryTab("members")}
                  className={`box-border flex gap-[10px] h-[28px] items-center justify-center px-[8px] py-[6px] rounded-[5px] shrink-0 cursor-pointer transition-colors ${
                    countryTab === "members" ? "bg-white" : "bg-transparent"
                  }`}
                >
                  <div
                    className={`flex flex-col justify-center text-[12px] text-center leading-[16px] ${
                      countryTab === "members"
                        ? "font-['Inter'] font-medium text-[#021337]"
                        : "font-['Inter'] font-normal text-[#677187]"
                    }`}
                  >
                    <p className="whitespace-pre">Top thành viên</p>
                  </div>
                </button>
                <button
                  onClick={() => setCountryTab("airdrop")}
                  className={`box-border flex gap-[10px] h-[28px] items-center justify-center px-[8px] py-[6px] rounded-[5px] shrink-0 cursor-pointer transition-colors ${
                    countryTab === "airdrop" ? "bg-white" : "bg-transparent"
                  }`}
                >
                  <div
                    className={`flex flex-col justify-center text-[12px] text-center leading-[16px] ${
                      countryTab === "airdrop"
                        ? "font-['Inter'] font-medium text-[#021337]"
                        : "font-['Inter'] font-normal text-[#677187]"
                    }`}
                  >
                    <p className="whitespace-pre">Top airdrop</p>
                  </div>
                </button>
                <button
                  onClick={() => setCountryTab("camp")}
                  className={`box-border flex gap-[10px] h-[28px] items-center justify-center px-[8px] py-[6px] rounded-[5px] shrink-0 cursor-pointer transition-colors ${
                    countryTab === "camp" ? "bg-white" : "bg-transparent"
                  }`}
                >
                  <div
                    className={`flex flex-col justify-center text-[12px] text-center leading-[16px] ${
                      countryTab === "camp"
                        ? "font-['Inter'] font-medium text-[#021337]"
                        : "font-['Inter'] font-normal text-[#677187]"
                    }`}
                  >
                    <p className="whitespace-pre">Top camp</p>
                  </div>
                </button>
              </div>
            }
            contentClassName="p-0"
          >
            {countryTab === "members" && (
              <CountriesTable data={countriesData} />
            )}
            {countryTab === "airdrop" && (
              <div className="p-8 text-center text-[#677187]">
                Top airdrop data coming soon...
              </div>
            )}
            {countryTab === "camp" && (
              <div className="p-8 text-center text-[#677187]">
                Top camp data coming soon...
              </div>
            )}
          </SectionCard>
          {/*membersTable2-section*/}
          <SectionCard
            title="Thành viên"
            headerActions={
              <div className="bg-[#edf2fd] box-border flex h-[32px] items-center justify-center px-[2px] py-0 rounded-[6px] shrink-0">
                <button
                  onClick={() => setMembersTab("members")}
                  className={`box-border flex gap-[10px] h-[28px] items-center justify-center px-[8px] py-[6px] rounded-[5px] shrink-0 cursor-pointer transition-colors ${
                    membersTab === "members" ? "bg-white" : "bg-transparent"
                  }`}
                >
                  <div
                    className={`flex flex-col justify-center text-[12px] text-center leading-[16px] ${
                      membersTab === "members"
                        ? "font-['Inter'] font-medium text-[#021337]"
                        : "font-['Inter'] font-normal text-[#677187]"
                    }`}
                  >
                    <p className="whitespace-pre">Top thành viên</p>
                  </div>
                </button>
                <button
                  onClick={() => setMembersTab("airdrop")}
                  className={`box-border flex gap-[10px] h-[28px] items-center justify-center px-[8px] py-[6px] rounded-[5px] shrink-0 cursor-pointer transition-colors ${
                    membersTab === "airdrop" ? "bg-white" : "bg-transparent"
                  }`}
                >
                  <div
                    className={`flex flex-col justify-center text-[12px] text-center leading-[16px] ${
                      membersTab === "airdrop"
                        ? "font-['Inter'] font-medium text-[#021337]"
                        : "font-['Inter'] font-normal text-[#677187]"
                    }`}
                  >
                    <p className="whitespace-pre">Top airdrop</p>
                  </div>
                </button>
                <button
                  onClick={() => setMembersTab("camp")}
                  className={`box-border flex gap-[10px] h-[28px] items-center justify-center px-[8px] py-[6px] rounded-[5px] shrink-0 cursor-pointer transition-colors ${
                    membersTab === "camp" ? "bg-white" : "bg-transparent"
                  }`}
                >
                  <div
                    className={`flex flex-col justify-center text-[12px] text-center leading-[16px] ${
                      membersTab === "camp"
                        ? "font-['Inter'] font-medium text-[#021337]"
                        : "font-['Inter'] font-normal text-[#677187]"
                    }`}
                  >
                    <p className="whitespace-pre">Top camp</p>
                  </div>
                </button>
              </div>
            }
            contentClassName="p-0"
          >
            {membersTab === "members" && <MembersTable data={membersData} />}
            {membersTab === "airdrop" && (
              <div className="p-8 text-center text-[#677187]">
                Top airdrop data coming soon...
              </div>
            )}
            {membersTab === "camp" && (
              <div className="p-8 text-center text-[#677187]">
                Top camp data coming soon...
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </>
  );
}
