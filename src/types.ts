import type { BadgeVariant } from "@/components/ui/Badge";

export interface PublisherType {
  id: number;
  fullName: string;
  email: string;
  referralCode: string;
  referredByCode: string;
  isBlacklisted: boolean;
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

export interface Transaction {
  id: number;
  sender: string;
  receiver: string;
  content: string;
  wallet: string;
  walletAddress: string;
  amount: string;
  currency: string;
  balance: string;
  note: string;
  statusUpdateTime: string;
  updater: string;
  txId: string;
  createdAt: string;
  status:
    | "pending"
    | "approving"
    | "approved"
    | "rejected"
    | "temporarily-approved";
}

// ==========================================
// Publisher API Types
// ==========================================

// Publisher Overview types
export interface MemberSummary {
  total: number;
  byTier: {
    tier1: number;
    tier2: number;
    tier3: number;
  };
}

export interface WalletAsset {
  symbol: string;
  name: string;
  total: number;
  available: number;
  locked: number;
  convertedToUsd: number;
}

export interface PublisherWallet {
  totalBalanceUsd: number;
  assets: WalletAsset[];
}

export interface AccountStatusHistoryItem {
  status: string;
  reason: string;
  createdAt: string;
  actor: string;
}

export interface PublisherNote {
  id: string;
  content: string;
  createdAt: string;
  createdAtFormatted: string;
  actor: {
    displayName: string;
    email: string;
  };
}

export interface LatestTransaction {
  id: string;
  occurredAt: string;
  timeAgo: number;
  token: string;
  description: string;
}

export interface BlacklistCampaign {
  campaignId: string;
  campaignName: string;
  status: string;
  addedAt: string;
  reason: string;
}

export interface PublisherOverviewResponse {
  accountStatus: "active" | "suspended" | "inactive";
  kycStatus: "not_started" | "pending" | "approved" | "rejected";
  memberSummary: MemberSummary;
  wallet: PublisherWallet;
  accountStatusHistory: AccountStatusHistoryItem[];
  latestTransaction: LatestTransaction | null;
  blacklistCampaigns: BlacklistCampaign[];
}

// Publisher Info / Roles types
export interface PublisherRole {
  code: string;
  name: string;
}

export interface PublisherDetailResponse {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  country: {
    code: string;
    name: string;
  };
  roles: PublisherRole[];
  referralCode: string;
  referredByCode: string;
  createdAt: string;
  lastActiveAt?: string;
  ssoProviders?: string[];
}

// KYC types
export interface KYCSubmission {
  id: string;
  status: "pending" | "approved" | "rejected";
  frontImage: string;
  backImage: string;
  createdAt: string;
  timeAgo: string;
  approver?: string;
  reason?: string;
  assets?: {
    front: string;
    back: string;
  };
}

export interface KYCResponse {
  status?: "not_started" | "pending" | "approved" | "rejected";
  submissions: KYCSubmission[];
}

// Members types
export interface PublisherMember {
  id: string;
  email: string;
  fullName: string;
  tier: "tier1" | "tier2" | "tier3";
  country: {
    code: string;
    name: string;
  };
  accountStatus: string;
  createdAt: string;
}

export interface MembersFilters {
  page?: number;
  limit?: number;
  search?: string;
  tier?: "all" | "tier1" | "tier2" | "tier3";
  countries?: string;
  accountStatuses?: string;
  includeStats?: boolean;
}

export interface MembersResponse {
  counters: MemberSummary;
  stats: MemberSummary;
  data: PublisherMember[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Activity Log types
export interface ActivityLog {
  id: string;
  code: string;
  createdAt: string;
  timeAgo: string;
  ip?: string;
  actor: {
    type: string;
    id: string | null;
    displayName: string;
    email: string | null;
  };
  payload: {
    noteId: string;
  };
}

export interface ActivityLogsFilters {
  page?: number;
  limit?: number;
  actor?: string;
  includeSummary?: boolean;
}

export interface ActivityLogsResponse {
  summary?: {
    statusHistory: AccountStatusHistoryItem[];
    latestTransaction: LatestTransaction | null;
    recentNotes: PublisherNote[];
  };
  data: ActivityLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

