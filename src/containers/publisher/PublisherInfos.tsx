import { GoogleIcon } from "@/icon/GoogleIcon";
import { FacebookIcon } from "@/icon/FacebookIcon";
import { AppleIcon } from "@/icon/AppleIcon";

interface Publisher {
  id: number;
  name: string;
  email: string;
  country: {
    code: string;
    name: string;
    flag: string;
  };
  members: number;
  createdAt: string;
  kyc: "not_started" | "approved" | "rejected" | "pending";
  status: "active" | "deleted" | "suspended";
}

interface PublisherInfosProps {
  publisher: Publisher;
}

export function PublisherInfos({ publisher }: PublisherInfosProps) {
  return (
    <div className=" border-r border-[#b5bcc4] bg-white flex flex-col py-6 px-5 pb-20">
      {/* Contact Info */}
      <div className="flex flex-col gap-3.5">
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Điện thoại
          </p>
          <p className="text-[14px] leading-4 text-[#021337]">+84 0373467950</p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">Email</p>
          <p className="text-[14px] leading-4 text-[#021337] truncate">
            {publisher.email}
          </p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">DOB</p>
          <p className="text-[14px] leading-4 text-[#021337]">1.11.1991</p>
          <p className="text-xs leading-4 text-[#677187]">34 tuổi</p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Giới tính
          </p>
          <p className="text-[14px] leading-4 text-[#021337]">Nam</p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Mã giới thiệu
          </p>
          <p className="text-[14px] leading-4 text-[#021337]">giangdo2131</p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Liên kết SSO
          </p>
          <div className="text-xs leading-4 text-[#021337]">
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-[#f2f4f5] rounded-full flex items-center justify-center">
                <AppleIcon classes="" />
              </div>
              <div className="w-8 h-8 bg-[#f2f4f5] rounded-full flex items-center justify-center">
                <FacebookIcon classes="" />
              </div>

              <div className="w-8 h-8 bg-[#f2f4f5] rounded-full flex items-center justify-center">
                <GoogleIcon classes="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Quốc tịch
          </p>
          <p className="text-[14px] leading-4 text-[#021337]">Việt Nam</p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Số thẻ ID
          </p>
          <p className="text-[14px] leading-4 text-[#021337]">017261782</p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">Địa chỉ</p>
          <p className="text-[14px] leading-4 text-[#021337]">
            69 Tố Hữu, Hà Đông, Cầu Giấy ,Hà Nội, Việt Nam
          </p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Người giới thiệu
          </p>
          <p className="text-[14px] leading-4 text-[#021337]">EKWR212DA</p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Ngày tham gia
          </p>
          <p className="text-[14px] leading-4 text-[#021337]">3.08.2023</p>
          <p className="text-xs leading-4 text-[#677187]">2 năm 7 ngày</p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Truy cập lần cuối
          </p>
          <p className="text-xs leading-4 text-[#021337]"> 2 ngày trước</p>
        </div>
      </div>
    </div>
  );
}
