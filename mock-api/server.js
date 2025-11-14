import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const dbPath = path.join(__dirname, "db.json");
console.log(`Loading database from: ${dbPath}`);

// Load database
let db;
try {
  const dbContent = fs.readFileSync(dbPath, "utf-8");
  db = JSON.parse(dbContent);
  console.log("Database loaded successfully");
} catch (error) {
  console.error("Error loading database:", error);
  process.exit(1);
}

const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Helper functions
function paginate(array, page = 1, limit = 20) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = array.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: array.length,
      totalPages: Math.ceil(array.length / limit),
    },
  };
}

function filterBySearch(array, search, fields) {
  if (!search) return array;
  const searchLower = search.toLowerCase();
  return array.filter((item) =>
    fields.some((field) => {
      const value = field.split(".").reduce((obj, key) => obj?.[key], item);
      return value?.toString().toLowerCase().includes(searchLower);
    })
  );
}

function sortData(array, sortBy, sortOrder = "asc") {
  if (!sortBy) return array;
  return [...array].sort((a, b) => {
    const aVal = sortBy.split(".").reduce((obj, key) => obj?.[key], a);
    const bVal = sortBy.split(".").reduce((obj, key) => obj?.[key], b);
    if (sortOrder === "asc") {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });
}

// Log all requests
server.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Mock authentication middleware (skip for auth endpoints)
server.use((req, res, next) => {
  const publicPaths = ["/health", "/auth/otp/request", "/auth/otp/verify"];
  if (publicPaths.some((path) => req.path.startsWith(path))) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
});

// ============================================================================
// HEALTH ENDPOINTS
// ============================================================================

server.get("/health", (req, res) => {
  res.json({
    status: "ok",
    services: {
      database: "operational",
      api: "operational",
    },
  });
});

// ============================================================================
// AUTH ENDPOINTS
// ============================================================================

server.post("/auth/otp/request", (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  res.status(200).json({
    success: true,
    message: "OTP sent to your email",
  });
});

server.post("/auth/otp/verify", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  // Accept "123456" as valid OTP
  if (otp === "123456") {
    const token = `mock-token-${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}`;
    return res.status(200).json({
      accessToken: token,
    });
  }

  res.status(401).json({
    success: false,
    error: "Invalid OTP",
  });
});

// ============================================================================
// PUBLISHER ENDPOINTS
// ============================================================================

server.get("/admin/publishers", (req, res) => {
  const {
    page = 1,
    limit = 20,
    search,
    createdFrom,
    createdTo,
    countries,
    accountStatuses,
    minMembers,
    sortBy,
    sortOrder,
  } = req.query;

  let publishers = [...db.publishers];

  // Search filter
  if (search) {
    publishers = filterBySearch(publishers, search, [
      "email",
      "fullName",
      "referralCode",
    ]);
  }

  // Date filters
  if (createdFrom) {
    publishers = publishers.filter(
      (p) => new Date(p.createdAt) >= new Date(createdFrom)
    );
  }
  if (createdTo) {
    publishers = publishers.filter(
      (p) => new Date(p.createdAt) <= new Date(createdTo)
    );
  }

  // Country filter
  if (countries) {
    const countryArray = Array.isArray(countries)
      ? countries
      : countries.split(",");
    publishers = publishers.filter((p) =>
      countryArray.includes(p.country?.code)
    );
  }

  // Account status filter
  if (accountStatuses) {
    const statusArray = Array.isArray(accountStatuses)
      ? accountStatuses
      : accountStatuses.split(",");
    publishers = publishers.filter((p) =>
      statusArray.includes(p.accountStatus)
    );
  }

  // Min members filter
  if (minMembers) {
    publishers = publishers.filter(
      (p) => p.memberCount.total >= parseInt(minMembers)
    );
  }

  // Sort
  publishers = sortData(publishers, sortBy, sortOrder);

  // Paginate
  const result = paginate(publishers, page, limit);
  res.json(result);
});

server.get("/admin/publishers/:id", (req, res) => {
  const publisher = db.publishers.find((p) => p.id === req.params.id);
  if (!publisher) {
    return res.status(404).json({ error: "Publisher not found" });
  }
  res.json(publisher);
});

server.get("/admin/publishers/:id/overview", (req, res) => {
  const publisher = db.publishers.find((p) => p.id === req.params.id);
  if (!publisher) {
    return res.status(404).json({ error: "Publisher not found" });
  }

  const wallet = db.wallets.find((w) => w.userId === req.params.id);
  const notes = db.internalNotes.filter((n) => n.publisherId === req.params.id);
  const blacklists = db.blacklistEntries.filter(
    (b) => b.publisherId === req.params.id
  );
  const transactions = db.transactions.filter(
    (t) => t.userId === req.params.id
  );
  const latestTransaction = transactions.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];

  res.json({
    accountStatus: publisher.accountStatus,
    kycStatus: publisher.kycStatus,
    memberSummary: publisher.memberCount,
    wallet: wallet || null,
    accountStatusHistory: [],
    internalNotes: notes,
    latestTransaction: latestTransaction || null,
    blacklistCampaigns: blacklists,
    isBlacklisted: publisher.isBlacklisted,
  });
});

server.get("/admin/publishers/:id/members", (req, res) => {
  const {
    page = 1,
    limit = 20,
    search,
    countries,
    accountStatuses,
    tier,
  } = req.query;

  let members = db.publisherMembers.filter(
    (m) => m.publisherId === req.params.id
  );

  // Search filter
  if (search) {
    members = filterBySearch(members, search, ["email", "fullName"]);
  }

  // Country filter
  if (countries) {
    const countryArray = Array.isArray(countries)
      ? countries
      : countries.split(",");
    members = members.filter((m) => countryArray.includes(m.country?.code));
  }

  // Account status filter
  if (accountStatuses) {
    const statusArray = Array.isArray(accountStatuses)
      ? accountStatuses
      : accountStatuses.split(",");
    members = members.filter((m) => statusArray.includes(m.accountStatus));
  }

  // Tier filter
  if (tier && tier !== "all") {
    members = members.filter((m) => m.tier === tier);
  }

  // Calculate counters
  const counters = {
    total: members.length,
    tier1: members.filter((m) => m.tier === "tier1").length,
    tier2: members.filter((m) => m.tier === "tier2").length,
    tier3: members.filter((m) => m.tier === "tier3").length,
  };

  // Paginate
  const result = paginate(members, page, limit);
  result.counters = counters;

  res.json(result);
});

server.get("/admin/publishers/:id/notes", (req, res) => {
  const notes = db.internalNotes.filter((n) => n.publisherId === req.params.id);
  res.json(notes);
});

server.post("/admin/publishers/:id/notes", (req, res) => {
  const { content } = req.body;
  const newNote = {
    id: `note-${Date.now()}`,
    publisherId: req.params.id,
    content,
    createdAt: new Date().toISOString(),
    createdBy: "admin@openkingdom.com",
  };

  db.internalNotes.push(newNote);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  const notes = db.internalNotes.filter((n) => n.publisherId === req.params.id);
  res.json(notes);
});

server.delete("/admin/publishers/:id/notes/:noteId", (req, res) => {
  db.internalNotes = db.internalNotes.filter((n) => n.id !== req.params.noteId);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  const notes = db.internalNotes.filter((n) => n.publisherId === req.params.id);
  res.json(notes);
});

server.post("/admin/publishers/:id/status", (req, res) => {
  const { targetStatus, reason } = req.body;
  const publisher = db.publishers.find((p) => p.id === req.params.id);

  if (!publisher) {
    return res.status(404).json({ error: "Publisher not found" });
  }

  publisher.accountStatus = targetStatus;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  // Return overview
  server.handle(
    {
      ...req,
      method: "GET",
      url: `/admin/publishers/${req.params.id}/overview`,
    },
    res
  );
});

server.get("/admin/publishers/:id/kyc", (req, res) => {
  const submissions = db.kycSubmissions.filter(
    (k) => k.publisherId === req.params.id
  );
  res.json(submissions);
});

server.post("/admin/publishers/:id/kyc/:submissionId/approve", (req, res) => {
  const submission = db.kycSubmissions.find(
    (k) => k.id === req.params.submissionId
  );

  if (submission) {
    submission.status = "approved";
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  }

  const submissions = db.kycSubmissions.filter(
    (k) => k.publisherId === req.params.id
  );
  res.json(submissions);
});

server.post("/admin/publishers/:id/kyc/:submissionId/reject", (req, res) => {
  const { reason } = req.body;
  const submission = db.kycSubmissions.find(
    (k) => k.id === req.params.submissionId
  );

  if (submission) {
    submission.status = "rejected";
    submission.rejectReason = reason;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  }

  const submissions = db.kycSubmissions.filter(
    (k) => k.publisherId === req.params.id
  );
  res.json(submissions);
});

server.post("/admin/publishers/:id/disable-2fa", (req, res) => {
  res.json({ success: true });
});

server.get("/admin/publishers/:id/activity-logs", (req, res) => {
  const { page = 1, limit = 20, actor } = req.query;

  let logs = db.activityLogs.filter((log) => log.publisherId === req.params.id);

  if (actor) {
    logs = logs.filter((log) => log.actor === actor);
  }

  const result = paginate(logs, page, limit);
  res.json(result);
});

server.get("/admin/publishers/:id/blacklists", (req, res) => {
  const blacklists = db.blacklistEntries.filter(
    (b) => b.publisherId === req.params.id
  );
  res.json(blacklists);
});

// ============================================================================
// CAMPAIGN ENDPOINTS
// ============================================================================

server.get("/campaigns", (req, res) => {
  const { page = 1, limit = 20, search, status, sortBy, sortOrder } = req.query;

  let campaigns = [...db.campaigns];

  // Search filter
  if (search) {
    campaigns = filterBySearch(campaigns, search, ["name", "description"]);
  }

  // Status filter
  if (status) {
    campaigns = campaigns.filter((c) => c.status === status);
  }

  // Sort
  campaigns = sortData(campaigns, sortBy, sortOrder);

  // Paginate
  const result = paginate(campaigns, page, limit);
  res.json(result);
});

server.post("/campaigns", (req, res) => {
  const newCampaign = {
    id: `camp-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    participantCount: 0,
    spent: 0,
    conversionRate: 0,
  };

  db.campaigns.push(newCampaign);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.status(201).json(newCampaign);
});

server.get("/campaigns/:id", (req, res) => {
  const campaign = db.campaigns.find((c) => c.id === req.params.id);
  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }
  res.json(campaign);
});

server.put("/campaigns/:id", (req, res) => {
  const campaignIndex = db.campaigns.findIndex((c) => c.id === req.params.id);
  if (campaignIndex === -1) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  db.campaigns[campaignIndex] = {
    ...db.campaigns[campaignIndex],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json(db.campaigns[campaignIndex]);
});

server.delete("/campaigns/:id", (req, res) => {
  db.campaigns = db.campaigns.filter((c) => c.id !== req.params.id);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json({ success: true });
});

server.get("/campaigns/:id/participants", (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const participants = db.campaignParticipants.filter(
    (p) => p.campaignId === req.params.id
  );

  const result = paginate(participants, page, limit);
  res.json(result);
});

server.post("/campaigns/:id/activate", (req, res) => {
  const campaign = db.campaigns.find((c) => c.id === req.params.id);
  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  campaign.status = "active";
  campaign.updatedAt = new Date().toISOString();
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.json(campaign);
});

server.post("/campaigns/:id/pause", (req, res) => {
  const campaign = db.campaigns.find((c) => c.id === req.params.id);
  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  campaign.status = "paused";
  campaign.updatedAt = new Date().toISOString();
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.json(campaign);
});

server.post("/campaigns/:id/end", (req, res) => {
  const campaign = db.campaigns.find((c) => c.id === req.params.id);
  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  campaign.status = "ended";
  campaign.updatedAt = new Date().toISOString();
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.json(campaign);
});

server.get("/campaigns/:id/analytics", (req, res) => {
  res.json(db.analyticsData.campaigns);
});

server.get("/campaigns/:id/statistics", (req, res) => {
  const campaign = db.campaigns.find((c) => c.id === req.params.id);
  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  res.json({
    campaignId: campaign.id,
    campaignName: campaign.name,
    totalParticipants: campaign.participantCount,
    totalSpent: campaign.spent,
    budget: campaign.budget,
    conversionRate: campaign.conversionRate,
    roi: ((campaign.spent / campaign.budget) * 100).toFixed(2),
  });
});

// ============================================================================
// ANALYTICS ENDPOINTS
// ============================================================================

server.get("/analytics/dashboard", (req, res) => {
  res.json(db.dashboardMetrics);
});

server.get("/analytics/users", (req, res) => {
  res.json(db.analyticsData.users);
});

server.get("/analytics/campaigns", (req, res) => {
  res.json(db.analyticsData.campaigns);
});

server.get("/analytics/revenue", (req, res) => {
  res.json(db.analyticsData.revenue);
});

server.get("/analytics/referrals", (req, res) => {
  res.json({
    series: [
      {
        date: "2024-11-01",
        newReferrals: 12,
        activeReferrals: 45,
      },
      {
        date: "2024-11-02",
        newReferrals: 15,
        activeReferrals: 48,
      },
      {
        date: "2024-11-03",
        newReferrals: 18,
        activeReferrals: 52,
      },
    ],
    totals: {
      totalNewReferrals: 45,
      avgActiveReferrals: 48.33,
    },
  });
});

// ============================================================================
// NOTIFICATION ENDPOINTS
// ============================================================================

server.get("/notifications", (req, res) => {
  const { limit = 20 } = req.query;
  const notifications = db.notifications.slice(0, parseInt(limit));
  res.json(notifications);
});

server.get("/notifications/unread-count", (req, res) => {
  const count = db.notifications.filter((n) => !n.read).length;
  res.json({ count });
});

server.post("/notifications/:id/read", (req, res) => {
  const notification = db.notifications.find((n) => n.id === req.params.id);
  if (notification) {
    notification.read = true;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  }
  res.json({ success: true });
});

server.get("/notifications/alerts", (req, res) => {
  res.json(db.systemAlerts);
});

server.post("/notifications/push", (req, res) => {
  const newJob = {
    jobId: `job-${Date.now()}`,
    status: "queued",
    ...req.body,
    createdAt: new Date().toISOString(),
    completedAt: null,
    metrics: {
      totalRecipients: 0,
      sent: 0,
      delivered: 0,
      failed: 0,
    },
  };

  db.pushJobs.push(newJob);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.status(202).json(newJob);
});

server.get("/notifications/push", (req, res) => {
  const { status, limit = 20 } = req.query;

  let jobs = [...db.pushJobs];

  if (status) {
    jobs = jobs.filter((j) => j.status === status);
  }

  jobs = jobs.slice(0, parseInt(limit));
  res.json(jobs);
});

server.get("/notifications/push/:jobId", (req, res) => {
  const job = db.pushJobs.find((j) => j.jobId === req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }
  res.json(job);
});

server.post("/notifications/push/process", (req, res) => {
  res.json({ success: true });
});

// ============================================================================
// REPORTS ENDPOINTS
// ============================================================================

server.get("/reports/export", (req, res) => {
  const { type, format = "json", search } = req.query;

  let data = [];
  switch (type) {
    case "users":
      data = db.publishers;
      break;
    case "campaigns":
      data = db.campaigns;
      break;
    case "transactions":
      data = db.transactions;
      break;
    default:
      return res.status(400).json({ error: "Invalid report type" });
  }

  if (search) {
    data = data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    );
  }

  if (format === "csv") {
    // For CSV, return as text/csv
    const headers = Object.keys(data[0] || {}).join(",");
    const rows = data.map((item) => Object.values(item).join(","));
    const csv = [headers, ...rows].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${type}.csv"`);
    return res.send(csv);
  }

  res.json({
    filename: `${type}-export-${Date.now()}.json`,
    timestamp: new Date().toISOString(),
    data,
  });
});

// ============================================================================
// SETTINGS ENDPOINTS
// ============================================================================

server.get("/settings", (req, res) => {
  res.json(db.settings);
});

server.get("/settings/referral", (req, res) => {
  res.json(db.settings.referral);
});

server.put("/settings/referral", (req, res) => {
  db.settings.referral = {
    ...db.settings.referral,
    ...req.body,
  };
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.json({
    success: true,
    settings: db.settings,
  });
});

server.get("/settings/referral/levels", (req, res) => {
  const { limit = 50 } = req.query;
  const levels = db.referralLevels.slice(0, parseInt(limit));
  res.json(levels);
});

server.post("/settings/referral/levels", (req, res) => {
  const newLevel = {
    id: `level-${Date.now()}`,
    ...req.body,
  };

  db.referralLevels.push(newLevel);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.status(201).json(newLevel);
});

server.put("/settings/referral/levels/:id", (req, res) => {
  const levelIndex = db.referralLevels.findIndex((l) => l.id === req.params.id);
  if (levelIndex === -1) {
    return res.status(404).json({ error: "Level not found" });
  }

  db.referralLevels[levelIndex] = {
    ...db.referralLevels[levelIndex],
    ...req.body,
  };

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json(db.referralLevels[levelIndex]);
});

server.delete("/settings/referral/levels/:id", (req, res) => {
  db.referralLevels = db.referralLevels.filter((l) => l.id !== req.params.id);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json({ success: true });
});

// ============================================================================
// BULK OPERATIONS ENDPOINTS
// ============================================================================

server.post("/bulk/users/update", (req, res) => {
  const { userIds, updates } = req.body;
  let updatedCount = 0;

  userIds.forEach((id) => {
    const publisher = db.publishers.find((p) => p.id === id);
    if (publisher) {
      Object.assign(publisher, updates);
      updatedCount++;
    }
  });

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.json({
    success: true,
    updated: updatedCount,
  });
});

server.post("/bulk/users/export", (req, res) => {
  const filters = req.body;
  let users = [...db.publishers];

  // Apply filters
  if (filters.accountStatus) {
    users = users.filter((u) => u.accountStatus === filters.accountStatus);
  }

  res.json({
    filename: `users-bulk-export-${Date.now()}.json`,
    data: users,
    count: users.length,
  });
});

server.post("/bulk/campaigns/update", (req, res) => {
  const { campaignIds, updates } = req.body;
  let updatedCount = 0;

  campaignIds.forEach((id) => {
    const campaign = db.campaigns.find((c) => c.id === id);
    if (campaign) {
      Object.assign(campaign, updates);
      updatedCount++;
    }
  });

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.json({
    success: true,
    updated: updatedCount,
  });
});

// ============================================================================
// SEARCH ENDPOINTS
// ============================================================================

server.get("/search/users", (req, res) => {
  const { query, page = 1, limit = 20 } = req.query;

  const users = filterBySearch(db.publishers, query, [
    "email",
    "fullName",
    "referralCode",
  ]);

  const result = paginate(users, page, limit);
  res.json(result);
});

server.get("/search/campaigns", (req, res) => {
  const { query, page = 1, limit = 20 } = req.query;

  const campaigns = filterBySearch(db.campaigns, query, [
    "name",
    "description",
  ]);

  const result = paginate(campaigns, page, limit);
  res.json(result);
});

server.get("/search/transactions", (req, res) => {
  const { query, page = 1, limit = 20 } = req.query;

  const transactions = filterBySearch(db.transactions, query, [
    "id",
    "userName",
    "description",
  ]);

  const result = paginate(transactions, page, limit);
  res.json(result);
});

// ============================================================================
// TRANSACTION ENDPOINTS
// ============================================================================

server.get("/transactions", (req, res) => {
  const {
    page = 1,
    limit = 20,
    userId,
    campaignId,
    startDate,
    endDate,
    sortBy,
    sortOrder,
  } = req.query;

  let transactions = [...db.transactions];

  // User filter
  if (userId) {
    transactions = transactions.filter((t) => t.userId === userId);
  }

  // Campaign filter
  if (campaignId) {
    transactions = transactions.filter((t) => t.campaignId === campaignId);
  }

  // Date filters
  if (startDate) {
    transactions = transactions.filter(
      (t) => new Date(t.createdAt) >= new Date(startDate)
    );
  }
  if (endDate) {
    transactions = transactions.filter(
      (t) => new Date(t.createdAt) <= new Date(endDate)
    );
  }

  // Sort
  transactions = sortData(transactions, sortBy, sortOrder);

  // Paginate
  const result = paginate(transactions, page, limit);
  res.json(result);
});

// ============================================================================
// WALLET ENDPOINTS
// ============================================================================

server.get("/wallets", (req, res) => {
  const { page = 1, limit = 20, userId } = req.query;

  let wallets = [...db.wallets];

  // User filter
  if (userId) {
    wallets = wallets.filter((w) => w.userId === userId);
  }

  // Paginate
  const result = paginate(wallets, page, limit);
  res.json(result);
});

// ============================================================================
// KYC ENDPOINTS
// ============================================================================

server.post("/kyc/:id/review", (req, res) => {
  const { status, reason } = req.body;
  const submission = db.kycSubmissions.find((k) => k.id === req.params.id);

  if (!submission) {
    return res.status(404).json({ error: "KYC submission not found" });
  }

  submission.status = status;
  if (reason) {
    submission.rejectReason = reason;
  }

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json(submission);
});

// ============================================================================
// AUDIT LOG ENDPOINTS
// ============================================================================

server.get("/audit-logs", (req, res) => {
  const {
    page = 1,
    limit = 20,
    entityType,
    entityId,
    actorUserId,
    startDate,
    endDate,
  } = req.query;

  let logs = [...db.auditLogs];

  // Entity type filter
  if (entityType) {
    logs = logs.filter((l) => l.entityType === entityType);
  }

  // Entity ID filter
  if (entityId) {
    logs = logs.filter((l) => l.entityId === entityId);
  }

  // Actor filter
  if (actorUserId) {
    logs = logs.filter((l) => l.actorUserId === actorUserId);
  }

  // Date filters
  if (startDate) {
    logs = logs.filter((l) => new Date(l.timestamp) >= new Date(startDate));
  }
  if (endDate) {
    logs = logs.filter((l) => new Date(l.timestamp) <= new Date(endDate));
  }

  // Paginate
  const result = paginate(logs, page, limit);
  res.json(result);
});

server.get("/audit-logs/export", (req, res) => {
  const { entityType, entityId, actorUserId, startDate, endDate } = req.query;

  let logs = [...db.auditLogs];

  // Apply filters (same as above)
  if (entityType) logs = logs.filter((l) => l.entityType === entityType);
  if (entityId) logs = logs.filter((l) => l.entityId === entityId);
  if (actorUserId) logs = logs.filter((l) => l.actorUserId === actorUserId);
  if (startDate)
    logs = logs.filter((l) => new Date(l.timestamp) >= new Date(startDate));
  if (endDate)
    logs = logs.filter((l) => new Date(l.timestamp) <= new Date(endDate));

  // Convert to CSV format
  const headers = Object.keys(logs[0] || {}).join(",");
  const rows = logs.map((item) =>
    Object.values(item)
      .map((val) => (typeof val === "object" ? JSON.stringify(val) : val))
      .join(",")
  );
  const csvData = [headers, ...rows].join("\n");

  res.json({
    data: csvData,
    format: "csv",
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// SYSTEM ENDPOINTS
// ============================================================================

server.get("/system/stats", (req, res) => {
  res.json(db.systemStats);
});

server.get("/system/health", (req, res) => {
  res.json(db.systemHealth);
});

server.get("/system/logs", (req, res) => {
  const { limit = 100 } = req.query;
  const logs = db.systemLogs.slice(0, parseInt(limit));
  res.json(logs);
});

server.get("/system/maintenance", (req, res) => {
  res.json(db.maintenanceState);
});

server.post("/system/maintenance", (req, res) => {
  const { enabled } = req.body;
  db.maintenanceState.enabled = enabled;

  if (enabled) {
    db.maintenanceState.message = "System is under maintenance";
  } else {
    db.maintenanceState.message = null;
  }

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json(db.maintenanceState);
});

// ============================================================================
// CUSTOM MOCK DATA ENDPOINTS (for reports page)
// ============================================================================

server.get("/api/reports/kyc-stats", (req, res) => {
  res.json(db.kycStats);
});

server.get("/api/reports/members-demographics", (req, res) => {
  res.json(db.membersDemographics);
});

server.get("/api/reports/members", (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const result = paginate(db.publisherMembers, page, limit);
  res.json(result);
});

server.get("/api/reports/activity", (req, res) => {
  // Generate activity line chart data
  const days = 30;
  const series = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    series.push({
      date: date.toISOString().split("T")[0],
      newMembers: Math.floor(Math.random() * 50) + 10,
      activeMembers: Math.floor(Math.random() * 200) + 100,
    });
  }

  res.json({ series });
});

// Use default router for any unmatched routes
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`\n🚀 Mock API Server is running on http://localhost:${PORT}`);
  console.log(`📁 Database path: ${dbPath}`);
  console.log(`\n📝 API Endpoints available:`);
  console.log(`   Health:         GET  /health`);
  console.log(`   Auth:           POST /auth/otp/request`);
  console.log(`                   POST /auth/otp/verify`);
  console.log(`   Publishers:     GET  /admin/publishers`);
  console.log(`                   GET  /admin/publishers/:id`);
  console.log(`                   GET  /admin/publishers/:id/overview`);
  console.log(`                   GET  /admin/publishers/:id/members`);
  console.log(`                   GET  /admin/publishers/:id/kyc`);
  console.log(`   Campaigns:      GET  /campaigns`);
  console.log(`                   POST /campaigns`);
  console.log(`                   GET  /campaigns/:id`);
  console.log(`   Analytics:      GET  /analytics/dashboard`);
  console.log(`                   GET  /analytics/users`);
  console.log(`   Transactions:   GET  /transactions`);
  console.log(`   Wallets:        GET  /wallets`);
  console.log(`   Notifications:  GET  /notifications`);
  console.log(`   Reports:        GET  /reports/export`);
  console.log(`   Settings:       GET  /settings`);
  console.log(`   System:         GET  /system/stats\n`);
});
