import { GoogleIcon } from "@/icon/GoogleIcon";
import { FacebookIcon } from "@/icon/FacebookIcon";
import { AppleIcon } from "@/icon/AppleIcon";
import { ClickToCopy } from "@/components/ui/ClickToCopy";
import type { PublisherType } from "@/types";
import { text } from "@/lib/utils/common";
import { formatDateTimeTo, calculateAge } from "@/lib/utils/date";

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
      email: string
    };
  };
  publisherId: string;
}
// {
//     "id": "29",
//     "fullName": "Test User",
//     "email": "levantanphat9c4@gmail.com",
//     "isBlacklisted": false,
//     "referralCode": "levantanphat9c466",
//     "referredByCode": null,
//     "country": null,
//     "memberCount": {
//         "total": 0,
//         "byTier": {
//             "tier1": 0,
//             "tier2": 0,
//             "tier3": 0
//         }
//     },
//     "createdAt": "2025-12-05T07:26:00.460Z",
//     "createdAtTimeAgo": "5 giờ trước",
//     "kycStatus": "not_started",
//     "accountStatus": "suspended",
//     "accountStatusLabelColor": "#F79009",
//     "personalInfo": {
//         "profilePictureUrl": null,
//         "fullName": "Test User",
//         "accountStatus": "suspended",
//         "phoneNumber": null,
//         "email": "levantanphat9c4@gmail.com",
//         "dateOfBirth": null,
//         "gender": null,
//         "referralCode": "levantanphat9c466",
//         "nationality": null,
//         "idNumber": null,
//         "address": null,
//         "ssoProviders": [],
//         "referrerCode": null,
//         "joinedAt": "2025-12-05T07:26:00.460Z",
//         "joinedTimeAgo": "5 giờ trước",
//         "lastActiveAt": null,
//         "lastActiveTimeAgo": "--"
//     }
// }
export function PublisherInfos({ publisher }: PublisherInfosProps) {
  const {personalInfo} = publisher;
  console.log("publisher", publisher);
  return (
    <div className=" border-r border-[#b5bcc4] bg-white flex flex-col py-6 px-5 pb-20">
      {/* Contact Info */}
      <div className="flex flex-col gap-3.5">
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Điện thoại
          </p>
          <p className="text-[14px] leading-4 text-[#021337]">
            {text(personalInfo?.phoneNumber)}
          </p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">Email</p>
          <p className="text-[14px] leading-4 text-[#021337] truncate">
            {text(personalInfo?.email)}
          </p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">DOB</p>
          <p className="text-[14px] leading-4 text-[#021337]">
            {formatDateTimeTo(personalInfo?.dateOfBirth, 'dd.MM.yyyy')}
          </p>
          <p className="text-xs leading-4 text-[#677187]">
            {calculateAge(personalInfo?.dateOfBirth)}
          </p>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Giới tính
          </p>
          <p className="text-[14px] leading-4 text-[#021337]">
            {text(personalInfo?.gender)}
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
            {text(personalInfo?.referralCode)}
          </ClickToCopy>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Liên kết SSO
          </p>
          <div className="text-xs leading-4 text-[#021337]">
            <div className="flex gap-2">
              {personalInfo?.ssoProviders?.includes("apple") && (
                <div className="w-8 h-8 bg-[#f2f4f5] rounded-full flex items-center justify-center">
                  <AppleIcon classes="" />
                </div>
              )}
              {personalInfo?.ssoProviders?.includes("facebook") && (
                <div className="w-8 h-8 bg-[#f2f4f5] rounded-full flex items-center justify-center">
                  <FacebookIcon classes="" />
                </div>
              )}
              {personalInfo?.ssoProviders?.includes("google") && (
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
            {text(personalInfo?.nationality) || text(publisher.country.name)}
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
            {text(personalInfo?.idNumber)}
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
            {text(personalInfo?.referrerCode)}
          </ClickToCopy>
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Ngày tham gia
          </p>
          <p className="text-[14px] leading-4 text-[#021337]">
            {personalInfo?.joinedAt
              ? new Date(personalInfo.joinedAt).toLocaleDateString(
                  "vi-VN"
                )
              : publisher.createdAt
              ? new Date(publisher.createdAt).toLocaleDateString("vi-VN")
              : "--"}
          </p>
          {personalInfo?.joinedTimeAgo && (
            <p className="text-xs leading-4 text-[#677187]">
              {text(personalInfo.joinedTimeAgo)}
            </p>
          )}
        </div>
        <div className="flex gap-2.5">
          <p className="text-xs leading-4 text-[#677187] w-[110px]">
            Truy cập lần cuối
          </p>
          <p className="text-xs leading-4 text-[#021337]">
            {text(personalInfo?.lastActiveTimeAgo)}
          </p>
        </div>
      </div>
    </div>
  );
}
