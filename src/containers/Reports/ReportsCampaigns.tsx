import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useEffect, useState } from "react";
import { SectionCard } from "@/components/ui/SectionCard";
import { GenderPieChart } from "@/components/charts/GenderPieChart";
import { IntroductionChart } from "@/components/charts/IntroductionChart";
import { DateRangeInput } from "@/components/ui/DateRangeInput";
import { Dropdown } from "@/components/ui/Dropdown";

type TabType = "daily" | "view_ads" | "shorten_links";

export function ReportsCampaigns() {
  const { publish } = useEventEmitter();
  const [activeTab, setActiveTab] = useState<TabType>("daily");
  const [dateRange, setDateRange] = useState("26.10.2025 - 7.11.2025");
  const [selectedCampaign, setSelectedCampaign] = useState("");

  useEffect(() => {
    publish("title-change", { title: "Campaigns" });
  }, [publish]);

  // Sample data for daily check-in chart
  const checkinData = [
    { date: "26.10", primary: 11900, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11800 },
    { date: "26.10", primary: 11500, secondary: 11900 },
    { date: "26.10", primary: 11800, secondary: 11800 },
    { date: "26.10", primary: 11900, secondary: 11800 },
    { date: "26.10", primary: 11900, secondary: 11800 },
    { date: "26.10", primary: 11900, secondary: 11800 },
    { date: "26.10", primary: 11800, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11800 },
    { date: "26.10", primary: 11000, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11900 },
    { date: "26.10", primary: 11900, secondary: 11800 },
  ];

  // Sample data for token distribution chart
  const tokenData = [
    { date: "26.10", primary: 14000, secondary: 12000 },
    { date: "27.10", primary: 12400, secondary: 11700 },
    { date: "28.10", primary: 11700, secondary: 10600 },
    { date: "29.10", primary: 10600, secondary: 16500 },
    { date: "30.10", primary: 14000, secondary: 12000 },
    { date: "31.10", primary: 16500, secondary: 6000 },
    { date: "1.11", primary: 10600, secondary: 10600 },
    { date: "2.11", primary: 14000, secondary: 12000 },
    { date: "3.11", primary: 13000, secondary: 11500 },
    { date: "4.11", primary: 16400, secondary: 3600 },
    { date: "5.11", primary: 14000, secondary: 12000 },
    { date: "6.11", primary: 6000, secondary: 15900 },
    { date: "7.11", primary: 16400, secondary: 3600 },
    { date: "8.11", primary: 14000, secondary: 12000 },
  ];

  // Sample data for transaction status pie chart
  const transactionData = [
    { name: "Chờ duyệt", value: 12300, percentage: "6.7%", color: "#FFA500" },
    { name: "Tạm duyệt", value: 23600, percentage: "27.9%", color: "#0066FF" },
    { name: "Đã duyệt", value: 23600, percentage: "27.9%", color: "#00a349" },
    { name: "Từ chối", value: 2400, percentage: "14.1%", color: "#ff3b34" },
  ];

  // Sample data for top earning table
  const topEarnersData = [
    {
      rank: 1,
      name: "Phan Công Kiều",
      email: "kieu.phan@gmail.com",
      flag: "🇻🇳",
      totalIncome: "371,321 OKD",
      personal: "280,435 OKD",
      f1: "67,493 OKD",
      f2: "90,886 OKD",
      f3: "0 OKD",
    },
    {
      rank: 2,
      name: "Tuấn Phạm",
      email: "tuanphan@gmail.com",
      flag: "⚠️",
      totalIncome: "329,302 OKD",
      personal: "203,832 OKD",
      f1: "100,470 OKD",
      f2: "25,000 OKD",
      f3: "0 OKD",
    },
    {
      rank: 3,
      name: "Trung Nguyễn",
      email: "trung@gmail.com",
      flag: "⚠️",
      totalIncome: "290,328 OKD",
      personal: "173,542 OKD",
      f1: "74,594 OKD",
      f2: "42,192 OKD",
      f3: "0 OKD",
    },
    {
      rank: 4,
      name: "Hậu Hoàng",
      email: "q.xem@gmail.com",
      flag: "🇻🇳",
      totalIncome: "289,545 OKD",
      personal: "100 OKD",
      f1: "100 OKD",
      f2: "100 OKD",
      f3: "0 OKD",
    },
    {
      rank: 5,
      name: "Hà Nhẫy",
      email: "nhay@gmail.com",
      flag: "🇻🇳",
      totalIncome: "270,540 OKD",
      personal: "100 OKD",
      f1: "100 OKD",
      f2: "100 OKD",
      f3: "0 OKD",
    },
    {
      rank: 6,
      name: "LongWang",
      email: "longwang@gmail.com",
      flag: "🇨🇳",
      totalIncome: "0 OKD",
      personal: "0 OKD",
      f1: "0 OKD",
      f2: "0 OKD",
      f3: "0 OKD",
    },
  ];

  const campaignOptions = [
    { value: "campaign1", label: "Campaign 1" },
    { value: "campaign2", label: "Campaign 2" },
    { value: "campaign3", label: "Campaign 3" },
  ];

  const tabLabels = {
    daily: "Daily Checkin",
    view_ads: "View Ads",
    shorten_links: "Shorten Links",
  };

  return (
    <>
      {/* Filter Bar */}
      <div className="bg-white rounded-md flex items-center gap-4 px-4 py-3">
        {/* Segment Control */}
        <div className="bg-[#edf2fd] box-border flex h-8 items-center justify-center px-0.5 py-0 rounded-md shrink-0">
          {(["daily", "view_ads", "shorten_links"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`box-border flex gap-2.5 h-7 items-center justify-center px-2 py-1.5 rounded-[5px] shrink-0 cursor-pointer transition-colors ${
                activeTab === tab ? "bg-white" : "bg-transparent"
              }`}
            >
              <div
                className={`flex flex-col justify-center text-[12px] text-center leading-4 ${
                  activeTab === tab
                    ? "font-['Inter'] font-medium text-[#021337]"
                    : "font-['Inter'] font-normal text-[#677187]"
                }`}
              >
                <p className="whitespace-pre">{tabLabels[tab]}</p>
              </div>
            </button>
          ))}
        </div>

        <DateRangeInput
          value={dateRange}
          onChange={setDateRange}
          className="w-[200px]"
        />
        <Dropdown
          value={selectedCampaign}
          onChange={setSelectedCampaign}
          placeholder="Quốc gia"
          options={campaignOptions}
          className="w-auto min-w-[120px]"
        />
        <Dropdown
          value={selectedCampaign}
          onChange={setSelectedCampaign}
          placeholder="Chiến dịch"
          options={campaignOptions}
          className="w-auto min-w-[120px]"
        />
      </div>

      <div className="p-3 flex flex-col gap-4 bg-[#f3f4f5]">
        {/* Banner Performance Stats Section */}
        <SectionCard
          title="Hiệu suất banner từ chiến dịch"
          showInfoIcon
          contentClassName="pb-4 pt-4.5 px-4"
        >
          <div className="flex items-center gap-6 mb-0">
            <div className="flex flex-col items-center flex-1">
              <span className="text-[10px] font-normal leading-3.5 text-[#677187] text-center mb-2">
                Lượt view
              </span>
              <span className="text-[18px] font-semibold leading-[26px] text-[#021337]">
                50,000
              </span>
            </div>
            <div className="flex flex-col items-center flex-1 border-l border-[#d0d5dd] pl-6">
              <span className="text-[10px] font-normal leading-3.5 text-[#677187] text-center mb-2">
                Lượt click
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[18px] font-semibold leading-[26px] text-[#021337]">
                  25,000
                </span>
                <span className="text-[12px] font-normal leading-4 text-[#00a349]">
                  50.00%
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center flex-1 border-l border-[#d0d5dd] pl-6">
              <span className="text-[10px] font-normal leading-3.5 text-[#677187] text-center mb-2">
                Pub đăng ký từ banner
              </span>
              <span className="text-[18px] font-semibold leading-[26px] text-[#021337]">
                12,500
              </span>
            </div>
            <div className="flex flex-col items-center flex-1 border-l border-[#d0d5dd] pl-6">
              <span className="text-[10px] font-normal leading-3.5 text-[#677187] text-center mb-2">
                CVR
              </span>
              <span className="text-[18px] font-semibold leading-[26px] text-[#00a349]">
                25.00%
              </span>
            </div>
          </div>
        </SectionCard>

        {/* Daily Check-in Chart Section */}
        <SectionCard
          title="Lượt checkin mỗi ngày"
          showInfoIcon
          contentClassName="p-4 pb-0"
        >
          {/* Stats row */}
          <div className="flex items-center gap-6 mb-4 pb-4 border-b border-[#d0d5dd]">
            <div className="flex flex-col">
              <span className="text-[10px] font-normal leading-3.5 text-[#677187]">
                Tổng lượt click
              </span>
              <span className="text-[18px] font-semibold leading-[26px] text-[#021337]">
                100,000
              </span>
            </div>
            <div className="flex flex-col border-l border-[#d0d5dd] pl-6">
              <span className="text-[10px] font-normal leading-3.5 text-[#677187]">
                Tổng lượt claim thành công
              </span>
              <span className="text-[18px] font-semibold leading-[26px] text-[#ff3b34]">
                92,920
              </span>
            </div>
            <div className="flex flex-col border-l border-[#d0d5dd] pl-6">
              <span className="text-[10px] font-normal leading-3.5 text-[#677187]">
                Tỉ lệ thành công
              </span>
              <span className="text-[18px] font-semibold leading-[26px] text-[#00a349]">
                92.92%
              </span>
            </div>
          </div>

          {/* Chart */}
          <IntroductionChart data={checkinData} />
        </SectionCard>

        {/* Token Distribution and Transaction Status Row */}
        <div className="flex flex-col gap-3 md:flex-row">
          {/* Token Distribution Chart */}
          <div className="w-full md:flex-[61%] md:min-w-0">
            <SectionCard
              title="Token phân phối cho checkin"
              showInfoIcon
              contentClassName="p-4 pb-0"
            >
              {/* Stats row */}
              <div className="flex items-center gap-6 mb-4 pb-4 border-b border-[#d0d5dd]">
                <div className="flex flex-col">
                  <span className="text-[10px] font-normal leading-3.5 text-[#677187]">
                    Tổng OKD
                  </span>
                  <span className="text-[18px] font-semibold leading-[26px] text-[#021337]">
                    100,000.9328 OKD
                  </span>
                </div>
                <div className="flex flex-col border-l border-[#d0d5dd] pl-6">
                  <span className="text-[10px] font-normal leading-3.5 text-[#677187]">
                    Cá nhân
                  </span>
                  <span className="text-[18px] font-semibold leading-[26px] text-[#9333ea]">
                    682,300.0232 OKD
                  </span>
                </div>
                <div className="flex flex-col border-l border-[#d0d5dd] pl-6">
                  <span className="text-[10px] font-normal leading-3.5 text-[#677187]">
                    Thành viên
                  </span>
                  <span className="text-[18px] font-semibold leading-[26px] text-[#ff3b34]">
                    582,300.0283 OKD
                  </span>
                </div>
              </div>

              {/* Chart with custom colors for personal/member */}
              <IntroductionChart
                data={tokenData}
                primaryColor="#9333ea"
                secondaryColor="#ff3b34"
              />
            </SectionCard>
          </div>

          {/* Transaction Status Pie Chart */}
          <div className="w-full md:flex-[39%] md:min-w-0">
            <SectionCard
              title="Trạng thái giao dịch"
              contentClassName="pb-4 pt-4.5 px-4"
            >
              <GenderPieChart data={transactionData} />
            </SectionCard>
          </div>
        </div>

        {/* Top Earning Table */}
        <SectionCard title="Top earning" contentClassName="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f3f4f5] border-b border-[#d0d5dd]">
                  <th className="px-4 py-2 text-left text-[12px] font-medium leading-4 text-[#677187] w-10">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-[12px] font-medium leading-4 text-[#677187] min-w-60">
                    Họ tên
                  </th>
                  <th className="px-4 py-2 text-left text-[12px] font-medium leading-4 text-[#677187] min-w-60">
                    Tổng thu nhập
                  </th>
                  <th className="px-4 py-2 text-left text-[12px] font-medium leading-4 text-[#677187] min-w-60">
                    Cá nhân
                  </th>
                  <th className="px-4 py-2 text-left text-[12px] font-medium leading-4 text-[#677187] min-w-60">
                    F1
                  </th>
                  <th className="px-4 py-2 text-left text-[12px] font-medium leading-4 text-[#677187] min-w-60">
                    F2, F3
                  </th>
                </tr>
              </thead>
              <tbody>
                {topEarnersData.map((earner, index) => (
                  <tr
                    key={earner.rank}
                    className={`border-b border-[#d0d5dd] ${
                      index % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"
                    }`}
                  >
                    <td className="px-4 py-3 text-[12px] font-normal leading-4 text-[#021337]">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#feeddc] text-[12px] font-medium text-[#021337]">
                          {earner.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px]">{earner.flag}</span>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-medium leading-5 text-[#021337]">
                            {earner.name}
                          </span>
                          <span className="text-[12px] font-normal leading-4 text-[#677187]">
                            {earner.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[14px] font-normal leading-5 text-[#021337]">
                      {earner.totalIncome}
                    </td>
                    <td className="px-4 py-3 text-[14px] font-normal leading-5 text-[#021337]">
                      {earner.personal}
                    </td>
                    <td className="px-4 py-3 text-[14px] font-normal leading-5 text-[#021337]">
                      {earner.f1}
                    </td>
                    <td className="px-4 py-3 text-[14px] font-normal leading-5 text-[#021337]">
                      {earner.f2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
