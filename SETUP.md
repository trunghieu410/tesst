# Quick Start Guide

## Prerequisites

- Node.js 18+
- Yarn package manager

## Installation & Running

### 1. Create Environment File

Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:3001
```

### 2. Start Development

Open **two separate terminals** in the project directory:

**Terminal 1 - Start Mock API:**

```bash
yarn mock-api
```

This starts the json-server on http://localhost:3001

**Terminal 2 - Start Vite Dev Server:**

```bash
yarn dev
```

This starts the app on http://localhost:5173

### 3. Login

1. Open http://localhost:5173 in your browser
2. Click "Login" or "Get Start" button
3. Enter any email (e.g., `admin@example.com`)
4. Click "Get OTP"
5. Enter OTP: `123456`
6. Click "Verify"

You'll be redirected to the dashboard!

## Project Features

### Pages

- **Landing Page** (`/`) - Hero section with login
- **Dashboard** (`/dashboard`) - Main dashboard with sidebar
- **Users** (`/dashboard/users`) - Paginated user list
- **User Detail** (`/dashboard/users/:id`) - User stats and actions
- **Campaigns** (`/dashboard/campaigns`) - Campaign management
- **Campaign Detail** (`/dashboard/campaigns/:id`) - Campaign info

### Key Features

- ✅ OTP-based authentication
- ✅ Protected routes with auto-redirect
- ✅ Paginated tables (20 items per page)
- ✅ Resizable sidebar
- ✅ User suspension/ban actions
- ✅ Campaign creation
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Dark mode ready
- ✅ Loading states & skeletons

### Tech Stack

- React 19
- TypeScript
- Tailwind CSS v4.1
- shadcn/ui components
- React Router v7
- TanStack Query v5
- json-server (mock API)

## Mock Data

- 100 users with various statuses
- 50 campaigns with different states
- All editable via `mock-api/db.json`

## Troubleshooting

**Port already in use?**

- Kill processes on ports 3001 (API) or 5173 (Vite)

**Dependencies issue?**

```bash
rm -rf node_modules yarn.lock
yarn install
```

**Build errors?**

```bash
yarn build
```

## Next Steps

- Customize theme colors in `src/index.css`
- Add more mock data in `mock-api/db.json`
- Integrate unicorn.studio for hero background
- Add real API endpoints
