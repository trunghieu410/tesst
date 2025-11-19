import type { BadgeVariant } from "@/components/ui/Badge";

export interface PublisherType {
  id: number;
  fullName: string;
  email: string;
  referralCode: string;
  referredByCode: string;
  memberCount: {
    total: number;
    byTier: {
      tier1: number;
      tier2: number;
      tier3: number;
    };
  };
  country: {
    code: string;
    name: string;
    flagUrl: string;
  };
  createdAt: string;
  accountStatus: string;
  accountStatusLabelColor: BadgeVariant;
  kycStatus: "not_started" | "approved" | "rejected" | "pending";
}

export interface CampaignType {
  id: number;
  name: string;
  campaignType: "daily_checkin" | "view_ads" | "shorten_link";
  description: string;
  status: "active" | "pending" | "completed" | "inactive" | "draft" | "ended";
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  budget: number;
  spent: number;
  participantCount: number;
  conversionRate: number;
  targetAudience: string;
  whitelist: string[];
  blacklist: string[];
  rewards: {
    tier1: number;
    tier2: number;
    tier3: number;
  };
  country: {
    code: string;
    name: string;
    flagUrl: string;
  };
}
