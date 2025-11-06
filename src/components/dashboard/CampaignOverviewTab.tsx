import { Button } from "@/components/ui/Button";
import { TextEditor } from "@/components/ui/TextEditor";
import { DateRangeInput } from "@/components/ui/DateRangeInput";
import { CampaignLabels } from "@/components/ui/CampaignLabels";
import { TrashIcon } from "@/icon/TrashIcon";
import { ChevronDownIcon, PaperclipIcon } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";

export function CampaignOverviewTab() {
  const [activeRightTab, setActiveRightTab] = useState<
    "images" | "method" | "conditions" | "rules" | "banners"
  >("images");
  const [campaignName, setCampaignName] = useState("");
  const [commissionType, setCommissionType] = useState<"fixed" | "percentage">(
    "fixed"
  );
  const [fixedAmount, setFixedAmount] = useState("0.00002");
  const [percentageAmount, setPercentageAmount] = useState("0");
  const [dateRange, setDateRange] = useState("15.11.2025 - 30.06.2026");
  const [ctaName, setCtaName] = useState("");
  const [advertiserName, setAdvertiserName] = useState("");
  const [website, setWebsite] = useState("");
  const [approvalPeriod, setApprovalPeriod] = useState("0");
  const [cookieLTV, setCookieLTV] = useState("30");
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Hot",
    "Đề xuất",
  ]);
  const [isAdvertiserExpanded, setIsAdvertiserExpanded] = useState(true);

  const [mainCoverImage, setMainCoverImage] = useState<string | null>(
    "http://localhost:3845/assets/00fe3968d9281a33a03ef71e91f3b65853878c7e.png"
  );
  const [squareCoverImage, setSquareCoverImage] = useState<string | null>(
    "http://localhost:3845/assets/00fe3968d9281a33a03ef71e91f3b65853878c7e.png"
  );
  const [ongoingImage, setOngoingImage] = useState<string | null>(
    "http://localhost:3845/assets/a72a5705eb3a0b2c01b842b2ba6a9871d720833b.png"
  );

  // Right tab content state
  const [methodContent, setMethodContent] = useState("");
  const [conditionsContent, setConditionsContent] = useState("");
  const [rulesContent, setRulesContent] = useState("");

  // Calculate days difference between start and end dates
  const daysDifference = useMemo(() => {
    if (!dateRange) return null;

    const parts = dateRange.split(" - ");
    if (parts.length !== 2) return null;

    const parseDate = (dateString: string): Date | null => {
      const parts = dateString.split(".");
      if (parts.length >= 2) {
        const [day, month, year] = parts.map(Number);
        const currentYear = year || new Date().getFullYear();
        return new Date(currentYear, month - 1, day);
      }
      return null;
    };

    const startDate = parseDate(parts[0]);
    const endDate = parseDate(parts[1]);

    if (startDate && endDate) {
      const diffTime = endDate.getTime() - startDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
      return diffDays;
    }

    return null;
  }, [dateRange]);

  const handleImageUpload = (
    setter: (value: string | null) => void,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (setter: (value: string | null) => void) => {
    setter(null);
  };

  // Track container position to align fixed bottom bar with parent width
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [bottomBarDims, setBottomBarDims] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  useEffect(() => {
    const updateDims = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setBottomBarDims({ left: rect.left, width: rect.width });
    };

    updateDims();
    window.addEventListener("resize", updateDims);
    // Capture scroll events on ancestors that might shift layout
    window.addEventListener("scroll", updateDims, true);
    return () => {
      window.removeEventListener("resize", updateDims);
      window.removeEventListener("scroll", updateDims, true);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="p-4 flex gap-4 relative w-full bg-[#F3F4F5] h-full overflow-auto pb-[72px]"
      >
        {/* Left Column */}
        <div className="flex flex-col gap-2.5 w-[537px]">
          {/* General Information Section */}
          <div className="bg-white border border-[#e7e9eb] rounded-lg p-4 flex flex-col gap-3">
            <h2 className="font-medium text-sm leading-5 text-[#021337]">
              Thông tin chung
            </h2>

            {/* Campaign Name */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm leading-5 text-[#021337]">
                Tên chiến dịch
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Nhập tên chiến dịch"
                className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 text-sm leading-5 text-[#021337] placeholder:text-[#677187] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Form Type */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm leading-5 text-[#021337]">
                Hình thức
              </label>
              <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 flex items-center justify-between cursor-pointer">
                <span className="text-sm leading-5 text-[#677187]">
                  Chọn hình thức
                </span>
                <ChevronDownIcon className="w-[18px] h-[18px]" />
              </div>
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm leading-5 text-[#021337]">
                Quốc gia áp dụng
              </label>
              <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 flex items-center justify-between cursor-pointer">
                <span className="text-sm leading-5 text-[#021337]">
                  Toàn cầu
                </span>
                <ChevronDownIcon className="w-[18px] h-[18px]" />
              </div>
            </div>

            {/* Commissions */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm leading-5 text-[#021337]">
                Commissions
              </label>

              {/* Fixed Commission */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      commissionType === "fixed"
                        ? "border-[#f71e1e]"
                        : "border-[#cfd6de]"
                    }`}
                    onClick={() => setCommissionType("fixed")}
                  >
                    {commissionType === "fixed" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f71e1e]" />
                    )}
                  </div>
                  <span className="text-[13px] leading-4 text-[#021337]">
                    Hoa hồng mức cố định
                  </span>
                </label>

                <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-0 flex items-center w-[200px]">
                  <div className="border-r border-[#cfd6de] pr-2.5 py-1.5 flex items-center gap-2.5">
                    <span className="font-medium text-[13px] leading-4 text-[#021337]">
                      OKT
                    </span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fixedAmount}
                    onChange={(e) => setFixedAmount(e.target.value)}
                    className="flex-1 pl-2 py-2 text-[13px] leading-4 text-[#021337] focus:outline-none"
                  />
                </div>
              </div>

              {/* Percentage Commission */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      commissionType === "percentage"
                        ? "border-[#f71e1e]"
                        : "border-[#cfd6de]"
                    }`}
                    onClick={() => setCommissionType("percentage")}
                  >
                    {commissionType === "percentage" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f71e1e]" />
                    )}
                  </div>
                  <span className="text-[13px] leading-4 text-[#021337]">
                    Hoa hồng % theo giá trị giao dịch
                  </span>
                </label>

                <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-0 flex items-center w-[135px]">
                  <span className="font-medium text-[13px] leading-4 text-[#021337] py-1.5">
                    %
                  </span>
                  <input
                    type="text"
                    value={percentageAmount}
                    onChange={(e) => setPercentageAmount(e.target.value)}
                    className="flex-1 pl-2 py-2 text-[13px] leading-4 text-[#021337] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="flex items-end gap-3">
              <div className="flex-1 flex flex-col gap-1">
                <label className="font-medium text-sm leading-5 text-[#021337]">
                  Thời hạn áp dụng
                </label>
                <DateRangeInput
                  value={dateRange}
                  onChange={setDateRange}
                  showYear={true}
                />
              </div>
              <p className="flex-1 text-sm leading-5 text-[#021337]">
                {daysDifference ? `${daysDifference} ngày` : ""}
              </p>
            </div>

            {/* CTA Name */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm leading-5 text-[#021337]">
                Tên nút CTA dành cho user đang tham gia chiến dịch
              </label>
              <input
                type="text"
                value={ctaName}
                onChange={(e) => setCtaName(e.target.value)}
                placeholder="VD: Checkin nhận airdrop, Xem quảng cáo, ..."
                className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 text-sm leading-5 text-[#021337] placeholder:text-[#677187] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <CampaignLabels value={selectedTags} onChange={setSelectedTags} />
          </div>

          {/* Advertiser Section */}
          <div className="bg-white border border-[#e7e9eb] rounded-lg p-4 flex flex-col gap-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsAdvertiserExpanded(!isAdvertiserExpanded)}
            >
              <h2 className="font-medium text-sm leading-5 text-[#021337]">
                Nhà quảng cáo (Advertiser)
              </h2>
              <ChevronDownIcon
                className={`w-6 h-6 text-[#021337] transition-transform duration-200 ${
                  isAdvertiserExpanded ? "rotate-180" : ""
                }`}
              />
            </div>

            {isAdvertiserExpanded && (
              <>
                <div className="flex gap-4">
                  <div className="border border-[#cfd6de] w-[88px] h-[88px] bg-gray-100" />
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="font-medium text-sm leading-5 text-[#021337]">
                      Tên nhà quảng cáo
                    </label>
                    <input
                      type="text"
                      value={advertiserName}
                      onChange={(e) => setAdvertiserName(e.target.value)}
                      placeholder="Nhập tên nhà quảng cáo"
                      className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 text-sm leading-5 text-[#021337] placeholder:text-[#677187] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <label className="font-medium text-sm leading-5 text-[#021337]">
                      Website chính thức
                    </label>
                    <span className="font-normal text-xs leading-4 text-[#677187]">
                      Không bắt buộc
                    </span>
                  </div>
                  <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 flex items-center">
                    <span className="font-medium text-sm leading-5 text-[#021337]">
                      https://
                    </span>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="Nhập địa chỉ website"
                      className="flex-1 pl-2 text-sm leading-5 text-[#021337] placeholder:text-[#677187] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm leading-5 text-[#021337]">
                    Thời hạn hoa hồng được duyệt trên hệ thống
                  </label>
                  <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 flex items-center">
                    <input
                      type="text"
                      value={approvalPeriod}
                      onChange={(e) => setApprovalPeriod(e.target.value)}
                      className="flex-1 text-sm leading-5 text-[#021337] focus:outline-none"
                    />
                    <span className="font-medium text-sm leading-5 text-[#021337]">
                      ngày
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm leading-5 text-[#021337]">
                    Cookie LTV (life-time value)
                  </label>
                  <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 flex items-center">
                    <input
                      type="text"
                      value={cookieLTV}
                      onChange={(e) => setCookieLTV(e.target.value)}
                      className="flex-1 text-sm leading-5 text-[#021337] focus:outline-none"
                    />
                    <span className="font-medium text-sm leading-5 text-[#021337]">
                      ngày
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 bg-white border border-[#e7e9eb] rounded-lg p-4 flex flex-col gap-3">
          {/* Segment Tabs */}
          <div className="bg-[#edf2fd] rounded-md p-0.5 flex gap-0.5">
            <button
              onClick={() => setActiveRightTab("images")}
              className={`cursor-pointer rounded px-2 py-1.5 text-xs leading-4 transition-colors ${
                activeRightTab === "images"
                  ? "bg-white font-medium text-[#021337]"
                  : "font-normal text-[#677187] hover:text-[#021337]"
              }`}
            >
              Hình ảnh
            </button>
            <button
              onClick={() => setActiveRightTab("method")}
              className={`cursor-pointer rounded px-2 py-1.5 text-xs leading-4 transition-colors ${
                activeRightTab === "method"
                  ? "bg-white font-medium text-[#021337]"
                  : "font-normal text-[#677187] hover:text-[#021337]"
              }`}
            >
              Cách thức thực hiện
            </button>
            <button
              onClick={() => setActiveRightTab("conditions")}
              className={`cursor-pointer rounded px-2 py-1.5 text-xs leading-4 transition-colors ${
                activeRightTab === "conditions"
                  ? "bg-white font-medium text-[#021337]"
                  : "font-normal text-[#677187] hover:text-[#021337]"
              }`}
            >
              Điều kiện chấp nhận
            </button>
            <button
              onClick={() => setActiveRightTab("rules")}
              className={`cursor-pointer rounded px-2 py-1.5 text-xs leading-4 transition-colors ${
                activeRightTab === "rules"
                  ? "bg-white font-medium text-[#021337]"
                  : "font-normal text-[#677187] hover:text-[#021337]"
              }`}
            >
              Quy định khác
            </button>
          </div>

          {/* Images Tab Content */}
          {activeRightTab === "images" && (
            <>
              {/* Main Cover Image */}
              <div className="flex items-center gap-0 py-1.5">
                <span className="font-medium text-[10px] leading-3.5 text-[#677187]">
                  ẢNH COVER CHÍNH
                </span>
                <div className="flex-1 h-px bg-[#e7e9eb] ml-2.5" />
              </div>

              <div className="flex gap-4">
                <div className="bg-[#e6e9ed] rounded-md w-[95px] h-8 px-3 py-2 flex items-center gap-2.5 cursor-pointer">
                  <PaperclipIcon className="w-4 h-4" />
                  <label className="font-medium text-[13px] leading-4 text-[#021337] cursor-pointer">
                    Tải ảnh
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(setMainCoverImage, e)}
                    />
                  </label>
                </div>
                <div className="text-sm leading-5 text-[#021337]">
                  <p>Kích thước: 800px x 400px</p>
                  <p>Tỉ lệ: Chữ nhật, 2:1</p>
                  <p>Dung lượng tối đa: 500Kb</p>
                </div>
              </div>

              {mainCoverImage && (
                <div className="bg-[#f2f4f5] border border-[#cfd6de] rounded-xl p-2.5 relative flex justify-center">
                  <img
                    src={mainCoverImage}
                    alt="Main cover"
                    className="w-[350px] h-[175px] object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(setMainCoverImage)}
                    className="absolute top-4 right-4 bg-white border border-[#cfd6de] rounded-md w-8 h-8 flex items-center justify-center"
                  >
                    <TrashIcon className="text-[#021337]" />
                  </button>
                </div>
              )}

              {/* Square Cover Image */}
              <div className="flex items-center gap-0 py-1.5">
                <span className="font-medium text-[10px] leading-3.5 text-[#677187]">
                  ẢNH COVER VUÔNG
                </span>
                <div className="flex-1 h-px bg-[#e7e9eb] ml-2.5" />
              </div>

              <div className="flex gap-4">
                <div className="bg-[#e6e9ed] rounded-md w-[95px] h-8 px-3 py-2 flex items-center gap-2.5 cursor-pointer">
                  <PaperclipIcon className="w-4 h-4" />
                  <label className="font-medium text-[13px] leading-4 text-[#021337] cursor-pointer">
                    Tải ảnh
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(setSquareCoverImage, e)
                      }
                    />
                  </label>
                </div>
                <div className="text-sm leading-5 text-[#021337]">
                  <p>
                    Ảnh này sử dụng làm thumbnail khi chia sẻ link chiến dịch
                    lên MXH.
                  </p>
                  <p>Kích thước: 800px x 800px</p>
                  <p>Tỉ lệ: Vuông, 1:1</p>
                  <p>Dung lượng tối đa: 500Kb</p>
                </div>
              </div>

              {squareCoverImage && (
                <div className="bg-[#f2f4f5] border border-[#cfd6de] rounded-xl p-2.5 relative flex justify-center">
                  <img
                    src={squareCoverImage}
                    alt="Square cover"
                    className="w-[175px] h-[175px] object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(setSquareCoverImage)}
                    className="absolute top-4 right-4 bg-white border border-[#cfd6de] rounded-md w-8 h-8 flex items-center justify-center"
                  >
                    <TrashIcon className="text-[#021337]" />
                  </button>
                </div>
              )}

              {/* Ongoing Campaign Image */}
              <div className="flex items-center gap-0 py-1.5">
                <span className="font-medium text-[10px] leading-3.5 text-[#677187]">
                  ẢNH CHIẾN DỊCH ĐANG DIỄN RA
                </span>
                <div className="flex-1 h-px bg-[#e7e9eb] ml-2.5" />
              </div>

              <div className="flex gap-4">
                <div className="bg-[#e6e9ed] rounded-md w-[95px] h-8 px-3 py-2 flex items-center gap-2.5 cursor-pointer">
                  <PaperclipIcon className="w-4 h-4" />
                  <label className="font-medium text-[13px] leading-4 text-[#021337] cursor-pointer">
                    Tải ảnh
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(setOngoingImage, e)}
                    />
                  </label>
                </div>
                <div className="text-sm leading-5 text-[#021337]">
                  <p>Kích thước: 650px x 780px</p>
                  <p>Tỉ lệ: Chữ nhật, 1:1.2</p>
                  <p>Dung lượng tối đa: 500Kb</p>
                </div>
              </div>

              {ongoingImage && (
                <div className="bg-[#f2f4f5] border border-[#cfd6de] rounded-xl p-2.5 relative flex justify-center">
                  <img
                    src={ongoingImage}
                    alt="Ongoing campaign"
                    className="w-[175px] h-[210px] object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(setOngoingImage)}
                    className="absolute top-4 right-4 bg-white border border-[#cfd6de] rounded-md w-8 h-8 flex items-center justify-center"
                  >
                    <TrashIcon className="text-[#021337]" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Method Tab Content */}
          {activeRightTab === "method" && (
            <div className="flex flex-col h-[500px]">
              <TextEditor
                value={methodContent}
                onChange={setMethodContent}
                placeholder="Nhập cách thức thực hiện chiến dịch..."
              />
            </div>
          )}

          {/* Conditions Tab Content */}
          {activeRightTab === "conditions" && (
            <div className="flex flex-col h-[500px]">
              <TextEditor
                value={conditionsContent}
                onChange={setConditionsContent}
                placeholder="Nhập điều kiện chấp nhận..."
              />
            </div>
          )}

          {/* Rules Tab Content */}
          {activeRightTab === "rules" && (
            <div className="flex flex-col h-[500px]">
              <TextEditor
                value={rulesContent}
                onChange={setRulesContent}
                placeholder="Nhập quy định khác..."
              />
            </div>
          )}
        </div>
        {/* Bottom Action Bar */}
        <div
          className="fixed bottom-0 border-t border-[#b5bcc4] bg-white px-4 py-3 flex items-center justify-end gap-2.5 z-50"
          style={{ left: bottomBarDims.left, width: bottomBarDims.width }}
        >
          <Button variant="success" size="sm">
            Lưu Đã lên lịch
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-[#ffe2a9] text-[#021337] hover:bg-[#ffd77a]"
          >
            Lưu Sắp ra mắt
          </Button>
          <Button variant="secondary" size="sm">
            Lưu Nháp
          </Button>
        </div>
      </div>
    </>
  );
}
