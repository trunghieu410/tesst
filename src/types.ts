import type { BadgeVariant } from "./components/Badge";

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
