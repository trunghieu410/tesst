import { useState } from "react";
import { PaperclipIcon } from "lucide-react";
import { TrashIcon } from "@/icon/TrashIcon";
import { TextEditor } from "@/components/ui/TextEditor";

export function CampaignAssets() {
  const [activeRightTab, setActiveRightTab] = useState<
    "images" | "method" | "conditions" | "rules" | "banners"
  >("images");

  const [mainCoverImage, setMainCoverImage] = useState<string | null>(
    "https://placehold.co/800x400"
  );
  const [squareCoverImage, setSquareCoverImage] = useState<string | null>(
    "https://placehold.co/800x800"
  );
  const [ongoingImage, setOngoingImage] = useState<string | null>(
    "https://placehold.co/650x780"
  );

  // Right tab content state
  const [methodContent, setMethodContent] = useState("");
  const [conditionsContent, setConditionsContent] = useState("");
  const [rulesContent, setRulesContent] = useState("");

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

  return (
    <div className='p-4 bg-[#F3F4F5]' >
      <div className="flex-1 bg-white border border-[#e7e9eb] rounded-lg px-4 py-3 flex flex-col gap-3">
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
    </div>
  );
}
