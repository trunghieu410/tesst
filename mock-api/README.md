# OpenKingdom Admin - Mock API Server

A comprehensive mock API server that implements all endpoints from the OpenAPI contract specification.

## 🚀 Getting Started

### Installation

```bash
cd mock-api
npm install
```

### Running the Server

```bash
npm start
# or
node server.js
```

The server will start on `http://localhost:3001`

## 📋 Available Endpoints

### Health Check

- `GET /health` - Check API health status

### Authentication

- `POST /auth/otp/request` - Request OTP code
  - Body: `{ "email": "user@example.com" }`
- `POST /auth/otp/verify` - Verify OTP and get JWT token
  - Body: `{ "email": "user@example.com", "otp": "123456" }`
  - **Test OTP**: Use `123456` as the valid OTP code

### Publishers

- `GET /admin/publishers` - List all publishers with filters and pagination
  - Query params: `page`, `limit`, `search`, `createdFrom`, `createdTo`, `countries`, `accountStatuses`, `minMembers`, `sortBy`, `sortOrder`
- `GET /admin/publishers/:id` - Get publisher detail
- `GET /admin/publishers/:id/overview` - Get publisher overview snapshot
- `GET /admin/publishers/:id/members` - List publisher's referral members
  - Query params: `page`, `limit`, `search`, `countries`, `accountStatuses`, `tier`
- `GET /admin/publishers/:id/notes` - Get internal notes for publisher
- `POST /admin/publishers/:id/notes` - Create internal note
  - Body: `{ "content": "Note content" }`
- `DELETE /admin/publishers/:id/notes/:noteId` - Delete internal note
- `POST /admin/publishers/:id/status` - Update publisher status
  - Body: `{ "targetStatus": "active|suspended|deleted", "reason": "Reason text" }`
- `GET /admin/publishers/:id/kyc` - List KYC submissions
- `POST /admin/publishers/:id/kyc/:submissionId/approve` - Approve KYC submission
- `POST /admin/publishers/:id/kyc/:submissionId/reject` - Reject KYC submission
  - Body: `{ "reason": "Rejection reason" }`
- `POST /admin/publishers/:id/disable-2fa` - Disable 2FA for publisher
- `GET /admin/publishers/:id/activity-logs` - List activity logs
  - Query params: `page`, `limit`, `actor`
- `GET /admin/publishers/:id/blacklists` - List blacklist entries

### Campaigns

- `GET /campaigns` - List all campaigns
  - Query params: `page`, `limit`, `search`, `status`, `sortBy`, `sortOrder`
- `POST /campaigns` - Create new campaign
  - Body: `{ "name": "Campaign Name", "description": "...", "status": "draft", ... }`
- `GET /campaigns/:id` - Get campaign detail
- `PUT /campaigns/:id` - Update campaign
- `DELETE /campaigns/:id` - Delete campaign
- `GET /campaigns/:id/participants` - List campaign participants
  - Query params: `page`, `limit`
- `POST /campaigns/:id/activate` - Activate campaign
- `POST /campaigns/:id/pause` - Pause campaign
- `POST /campaigns/:id/end` - End campaign
- `GET /campaigns/:id/analytics` - Get campaign analytics
- `GET /campaigns/:id/statistics` - Get campaign statistics

### Analytics

- `GET /analytics/dashboard` - Dashboard metrics
- `GET /analytics/users` - User analytics
  - Query params: `startDate`, `endDate`, `granularity`
- `GET /analytics/campaigns` - Campaign analytics
  - Query params: `startDate`, `endDate`, `granularity`
- `GET /analytics/revenue` - Revenue analytics
  - Query params: `startDate`, `endDate`, `granularity`
- `GET /analytics/referrals` - Referral analytics
  - Query params: `startDate`, `endDate`, `granularity`

### Notifications

- `GET /notifications` - List notifications
  - Query params: `limit`
- `GET /notifications/unread-count` - Get unread notification count
- `POST /notifications/:id/read` - Mark notification as read
- `GET /notifications/alerts` - List system alerts
- `POST /notifications/push` - Create push notification job
  - Body: `{ "title": "Title", "body": "Body", "userIds": [...], ... }`
- `GET /notifications/push` - List push notification jobs
  - Query params: `status`, `limit`
- `GET /notifications/push/:jobId` - Get push job status
- `POST /notifications/push/process` - Process SQS message (internal)

### Reports

- `GET /reports/export` - Export reports
  - Query params: `type` (users|campaigns|transactions), `format` (json|csv), `search`
- `GET /api/reports/kyc-stats` - Get KYC statistics
- `GET /api/reports/members-demographics` - Get member demographics
- `GET /api/reports/members` - List members for reports
- `GET /api/reports/activity` - Get activity data for charts

### Settings

- `GET /settings` - Get all settings
- `GET /settings/referral` - Get referral settings
- `PUT /settings/referral` - Update referral settings
  - Body: `{ "referralBonusPercentage": 10, "maxReferralDepth": 3 }`
- `GET /settings/referral/levels` - List referral levels
  - Query params: `limit`
- `POST /settings/referral/levels` - Create referral level
  - Body: `{ "level": 1, "commissionPercentage": 10, "description": "..." }`
- `PUT /settings/referral/levels/:id` - Update referral level
- `DELETE /settings/referral/levels/:id` - Delete referral level

### Bulk Operations

- `POST /bulk/users/update` - Bulk update users
  - Body: `{ "userIds": [...], "updates": { ... } }`
- `POST /bulk/users/export` - Bulk export users
  - Body: `{ "accountStatus": "active", ... }`
- `POST /bulk/campaigns/update` - Bulk update campaigns
  - Body: `{ "campaignIds": [...], "updates": { ... } }`

### Search

- `GET /search/users` - Search users
  - Query params: `query`, `page`, `limit`
- `GET /search/campaigns` - Search campaigns
  - Query params: `query`, `page`, `limit`
- `GET /search/transactions` - Search transactions
  - Query params: `query`, `page`, `limit`

### Transactions

- `GET /transactions` - List transactions
  - Query params: `page`, `limit`, `userId`, `campaignId`, `startDate`, `endDate`, `sortBy`, `sortOrder`

### Wallets

- `GET /wallets` - List wallets
  - Query params: `page`, `limit`, `userId`

### KYC

- `POST /kyc/:id/review` - Review KYC submission
  - Body: `{ "status": "approved|rejected|pending", "reason": "..." }`

### Audit Logs

- `GET /audit-logs` - List audit logs
  - Query params: `page`, `limit`, `entityType`, `entityId`, `actorUserId`, `startDate`, `endDate`
- `GET /audit-logs/export` - Export audit logs
  - Query params: Same as above

### System

- `GET /system/stats` - Platform statistics
- `GET /system/health` - System health status
- `GET /system/logs` - Retrieve system logs
  - Query params: `limit`
- `GET /system/maintenance` - Get maintenance mode state
- `POST /system/maintenance` - Toggle maintenance mode
  - Body: `{ "enabled": true|false }`

## 🔑 Authentication

Most endpoints require authentication. Include the `Authorization` header with a Bearer token:

```bash
curl -H "Authorization: Bearer your-token-here" http://localhost:3001/admin/publishers
```

To get a token, use the OTP verification endpoint with code `123456`:

```bash
# Request OTP
curl -X POST http://localhost:3001/auth/otp/request \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Verify OTP (use 123456 as the code)
curl -X POST http://localhost:3001/auth/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","otp":"123456"}'
```

## 📊 Mock Data

The server includes comprehensive mock data for:

- **3 Publishers** with complete profiles, KYC submissions, and member data
- **3 Campaigns** (active, draft, and ended)
- **3 Transactions** with different types and statuses
- **3 Wallets** with balance and transaction history
- **Activity Logs**, **Notifications**, **Audit Logs**
- **System Stats**, **Analytics Data**, and **Demographics**

### Sample Publisher IDs

- `pub-1` - John Smith (Active, KYC Approved)
- `pub-2` - Sarah Johnson (Active, KYC Pending)
- `pub-3` - Michael Chen (Suspended, KYC Rejected, Blacklisted)

### Sample Campaign IDs

- `camp-1` - Summer Promo 2024 (Active)
- `camp-2` - Black Friday 2024 (Draft)
- `camp-3` - New Year Campaign 2025 (Ended)

## 🔍 Testing Examples

### Get Publishers List

```bash
curl "http://localhost:3001/admin/publishers?page=1&limit=10" \
  -H "Authorization: Bearer mock-token"
```

### Search Users

```bash
curl "http://localhost:3001/search/users?query=john&page=1&limit=10" \
  -H "Authorization: Bearer mock-token"
```

### Get Publisher Overview

```bash
curl "http://localhost:3001/admin/publishers/pub-1/overview" \
  -H "Authorization: Bearer mock-token"
```

### Create Campaign

```bash
curl -X POST "http://localhost:3001/campaigns" \
  -H "Authorization: Bearer mock-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Campaign",
    "description": "Test description",
    "status": "draft",
    "budget": 10000
  }'
```

### Get Analytics Dashboard

```bash
curl "http://localhost:3001/analytics/dashboard" \
  -H "Authorization: Bearer mock-token"
```

## 🛠️ Features

- ✅ **Full API Contract Implementation** - All endpoints from OpenAPI spec
- ✅ **Pagination Support** - All list endpoints support pagination
- ✅ **Filtering & Search** - Multiple filter options on list endpoints
- ✅ **Sorting** - Configurable sorting on list endpoints
- ✅ **Authentication** - Mock JWT authentication
- ✅ **CRUD Operations** - Create, Read, Update, Delete for all entities
- ✅ **Consistent Data** - Cross-referenced IDs and relationships
- ✅ **Real-time Updates** - Data persists to db.json file
- ✅ **Request Logging** - All requests logged to console

## 📝 API Contract

The mock API implements the full OpenAPI 3.1.0 specification defined in `api-contract.yaml`.

## 🐛 Troubleshooting

### Port Already in Use

If port 3001 is already in use:

```bash
# Kill the process using port 3001
lsof -ti:3001 | xargs kill -9

# Or change the port in server.js
const PORT = 3002; // Change this line
```

### Database Not Loading

Make sure `db.json` exists in the mock-api directory. The server will exit with an error if the database file is missing or invalid.

## 📚 Related Files

- `server.js` - Main server implementation
- `db.json` - Mock database with all entities
- `api-contract.yaml` - OpenAPI specification
- `generate-campaigns.js` - Helper to generate campaign data
- `generate-publishers.js` - Helper to generate publisher data

## 🎯 Development Tips

1. **Testing**: Use tools like Postman, Insomnia, or curl for testing
2. **Data Modification**: Edit `db.json` directly for custom test data
3. **Debugging**: Check console logs for request/response information
4. **Reset Data**: Restore `db.json` from backup to reset to initial state

## ⚡ Quick Start Examples

```bash
# Start the server
npm start

# In another terminal, test the health endpoint
curl http://localhost:3001/health

# Get a token
TOKEN=$(curl -s -X POST http://localhost:3001/auth/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","otp":"123456"}' | jq -r '.accessToken')

# Use the token to get publishers
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/admin/publishers | jq

# Get analytics
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/analytics/dashboard | jq
```

---

**Note**: This is a mock server for development and testing purposes only. Do not use in production.
