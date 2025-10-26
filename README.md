# Admin Dashboard - Blockchain Intelligence Platform

A modern admin dashboard built with Vite, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui components.

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript, Tailwind CSS v4.1, shadcn/ui
- **Authentication**: Email-based OTP login flow (demo OTP: `123456`)
- **User Management**: View, suspend, and ban users with detailed statistics
- **Campaign Management**: Create and manage marketing campaigns
- **Responsive Design**: Mobile-friendly with collapsible sidebar
- **Data Fetching**: TanStack Query for efficient data management
- **Mock API**: json-server for development

## 📦 Prerequisites

- Node.js 18+ or later
- Yarn package manager

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
yarn install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_API_URL=http://localhost:3001
```

### 3. Start the Development Servers

You'll need to run two terminals:

**Terminal 1 - Mock API Server:**

```bash
yarn mock-api
```

**Terminal 2 - Vite Dev Server:**

```bash
yarn dev
```

The application will be available at `http://localhost:5173`
The mock API will be available at `http://localhost:3001`

## 🔐 Demo Credentials

- **Email**: Any valid email address (e.g., `admin@example.com`)
- **OTP**: `123456` (always valid for demo)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── auth/            # Authentication components
│   ├── layout/          # Layout components (Navbar, Sidebar, Hero)
│   ├── users/           # User-related components
│   └── campaigns/       # Campaign-related components
├── pages/               # Page components
│   ├── Landing.tsx
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   ├── UserDetail.tsx
│   ├── Campaigns.tsx
│   └── CampaignDetail.tsx
├── lib/
│   ├── api.ts           # API client (axios)
│   ├── queryClient.ts   # TanStack Query configuration
│   ├── utils.ts         # Utility functions
│   └── queries/         # TanStack Query hooks
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   └── use-mobile.tsx
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles (Tailwind)

mock-api/
├── db.json              # Mock database
└── server.js            # Custom API routes
```

## 🎯 Routes

- `/` - Landing page with login
- `/dashboard` - Dashboard home (redirects to /dashboard/users)
- `/dashboard/users` - Users list with pagination
- `/dashboard/users/:id` - User detail page
- `/dashboard/campaigns` - Campaigns list with pagination
- `/dashboard/campaigns/:id` - Campaign detail page

## 🎨 UI Components

All UI components are from shadcn/ui:

- Button, Input, Dialog, Sheet
- Table, Card, Avatar, Badge
- Toast (Sonner), Pagination
- Dropdown Menu, Label, Textarea
- Skeleton, Progress, Separator
- Sidebar, Resizable Panels
- Input OTP, Tooltip

## 🔄 Data Flow

1. **Authentication**: OTP-based login with localStorage token persistence
2. **Data Fetching**: TanStack Query with automatic caching and invalidation
3. **Mutations**: Optimistic updates with toast notifications
4. **Routing**: Protected routes with automatic redirect

## 📱 Responsive Behavior

- **Desktop**: Full sidebar with resizable panels
- **Tablet**: Collapsible sidebar
- **Mobile**: Sheet-based sidebar, full-screen modals

## 🧪 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn mock-api` - Start mock API server

## 🎭 Mock Data

The project includes mock data for:

- 5+ users with different statuses (active, suspended, banned)
- 5+ campaigns with various statuses (active, scheduled, completed)

All mock data can be found in `mock-api/db.json`

## 🚧 Development Notes

- OTP code `123456` is always valid for demo purposes
- Mock API runs on port 3001
- Authentication token is stored in localStorage
- All API calls use TanStack Query for caching and state management

## 📝 License

This project is part of a demo application and is provided as-is.
