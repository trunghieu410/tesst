# Mock API

This directory contains the mock API setup using json-server for development and testing.

## Files

- `db.json` - The mock database containing users, campaigns, and publishers
- `server.js` - Custom json-server configuration (currently not in use)
- `generate-publishers.js` - Script to generate mock publisher data

## Usage

### Start the Mock API Server

```bash
npm run mock-api
```

This will start json-server on port 3001 with the following endpoints:
- http://localhost:3001/users
- http://localhost:3001/campaigns
- http://localhost:3001/publishers

### Start Both Dev Server and Mock API

```bash
npm run dev:all
```

This will start both the Vite dev server and the mock API server concurrently.

### Generate Mock Publishers

To regenerate the publishers data (creates 2100 mock publishers):

```bash
npm run generate-publishers
```

After regenerating, restart the mock API server to load the new data.

## API Endpoints

### Publishers

- `GET /publishers` - Get all publishers
- `GET /publishers?_page=1&_limit=10` - Paginated publishers
- `GET /publishers?q=search` - Search publishers by name/email
- `GET /publishers?country.code=VN` - Filter by country code
- `GET /publishers?status=active` - Filter by status (active, suspended, deleted)
- `GET /publishers?members_gte=100` - Filter by minimum members count
- `GET /publishers/:id` - Get a specific publisher

### Users

- `GET /users` - Get all users
- `GET /users?_page=1&_limit=20` - Paginated users
- `GET /users/:id` - Get a specific user
- `PATCH /users/:id` - Update a user

### Campaigns

- `GET /campaigns` - Get all campaigns
- `GET /campaigns?_page=1&_limit=20` - Paginated campaigns
- `GET /campaigns/:id` - Get a specific campaign
- `POST /campaigns` - Create a new campaign

## Mock Data Statistics

### Publishers (2100 total)
- **Countries**: Vietnam, Thailand, Indonesia, Malaysia, Singapore, Philippines, Cambodia, Laos, Myanmar, Brunei
- **KYC Statuses**: not_started, pending, approved, rejected
- **Account Statuses**: active, suspended, deleted
- **Members Range**: 0 - 1000
- **Date Range**: 2023 - 2025

### Users (100 total)
- Various statuses: active, suspended, banned
- Balance, monthly profit, and income fields

### Campaigns (50 total)
- Statuses: scheduled, active, completed
- Date ranges throughout 2024

## Customizing Mock Data

To customize the mock data generation:

1. Edit `generate-publishers.js` to modify:
   - Number of publishers (currently 2100)
   - Names, countries, or other fields
   - Value ranges (members, dates, etc.)

2. Run the generation script:
   ```bash
   npm run generate-publishers
   ```

3. Restart the mock API server to load changes

## Notes

- The mock API uses json-server which provides full REST API capabilities
- Data is persisted in `db.json` and will survive server restarts
- For development, the API supports CORS and is accessible from the frontend

