import { GoogleIcon } from "@/icon/GoogleIcon";
import { FacebookIcon } from "@/icon/FacebookIcon";
import { AppleIcon } from "@/icon/AppleIcon";
import { ClickToCopy } from "@/components/ui/ClickToCopy";
import type { PublisherType } from "@/types";

interface PublisherInfosProps {
  publisher: PublisherType & {
    personalInfo?: {
      phoneNumber?: string;
      dateOfBirth?: string;
      gender?: string;
      referralCode?: string;
      nationality?: string;
      idNumber?: string;
      address?: string;
      ssoProviders?: string[];
      referrerCode?: string;
      joinedAt?: string;
      joinedTimeAgo?: string;
      lastActiveAt?: string;
      lastActiveTimeAgo?: string;
    };
  };
  publisherId: string;
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
          <p className="text-[14px] leading-4 text-[#021337]">
            {publisher.personalInfo?.phoneNumber || "--"}
          </p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">Email</p>
          <p className="text-[14px] leading-4 text-[#021337] truncate">
            {publisher.email}
          </p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">DOB</p>
          <p className="text-[14px] leading-4 text-[#021337]">
            {publisher.personalInfo?.dateOfBirth || "--"}
          </p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Giới tính
          </p>
          <p className="text-[14px] leading-4 text-[#021337]">
            {publisher.personalInfo?.gender || "--"}
          </p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Mã giới thiệu
          </p>
          <ClickToCopy
            className="text-[14px] leading-4 text-[#021337]"
            showIcon
          >
            {publisher.referralCode ||
              publisher.personalInfo?.referralCode ||
              "--"}
          </ClickToCopy>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Liên kết SSO
          </p>
          <div className="text-xs leading-4 text-[#021337]">
            <div className="flex gap-2">
              {publisher.personalInfo?.ssoProviders?.includes("apple") && (
                <div className="w-8 h-8 bg-[#f2f4f5] rounded-full flex items-center justify-center">
                  <AppleIcon classes="" />
                </div>
              )}
              {publisher.personalInfo?.ssoProviders?.includes("facebook") && (
                <div className="w-8 h-8 bg-[#f2f4f5] rounded-full flex items-center justify-center">
                  <FacebookIcon classes="" />
                </div>
              )}
              {publisher.personalInfo?.ssoProviders?.includes("google") && (
                <div className="w-8 h-8 bg-[#f2f4f5] rounded-full flex items-center justify-center">
                  <GoogleIcon classes="" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Quốc tịch
          </p>
          <p className="text-[14px] leading-4 text-[#021337]">
            {publisher.personalInfo?.nationality ||
              publisher.country.name ||
              "--"}
          </p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Số thẻ ID
          </p>
          <ClickToCopy
            className="text-[14px] leading-4 text-[#021337]"
            showIcon
          >
            {publisher.personalInfo?.idNumber || "--"}
          </ClickToCopy>
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
          <ClickToCopy className="text-[14px] leading-4" showIcon>
            {publisher.referredByCode ||
              publisher.personalInfo?.referrerCode ||
              "--"}
          </ClickToCopy>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Ngày tham gia
          </p>
          <p className="text-[14px] leading-4 text-[#021337]">
            {publisher.personalInfo?.joinedAt
              ? new Date(publisher.personalInfo.joinedAt).toLocaleDateString(
                  "vi-VN"
                )
              : publisher.createdAt
              ? new Date(publisher.createdAt).toLocaleDateString("vi-VN")
              : "--"}
          </p>
          {publisher.personalInfo?.joinedTimeAgo && (
            <p className="text-xs leading-4 text-[#677187]">
              {publisher.personalInfo.joinedTimeAgo}
            </p>
          )}
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Truy cập lần cuối
          </p>
          <p className="text-xs leading-4 text-[#021337]">
            {publisher.personalInfo?.lastActiveTimeAgo || "--"}
          </p>
        </div>
      </div>
    </div>
  );
}
