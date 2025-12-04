# OpenKingdom Admin

A modern React-based admin dashboard for managing a blockchain-based referral/affiliate marketing platform. This application provides administrators with comprehensive tools to manage publishers, campaigns, transactions, KYC verification, wallets, and analytics.

[![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18.x or higher
- **Yarn**: 1.22.x or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd openkingdom-admin

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

### Development

```bash
# Start both the app and mock API server
yarn dev:all

# Or run separately:
yarn dev        # Start Vite dev server (port 3000)
yarn mock-api   # Start mock API server (port 3001)
```

The application will be available at `http://localhost:3000`

### Build

```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

### Testing

```bash
# Run tests in watch mode
yarn test

# Run tests once
yarn test:run

# Run tests with UI
yarn test:ui

# Generate coverage report
yarn test:coverage
```

---

## 🏗️ Technology Stack

### Core Technologies

- **React 19.1.1** - UI framework with concurrent features
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite 7.1.7** - Fast build tool and dev server
- **React Router 7.1.0** - Client-side routing
- **React Query 5.62.0** - Server state management

### UI & Styling

- **Tailwind CSS 4.1.0** - Utility-first CSS framework
- **tailwind-variants 3.2.2** - Component variant management
- **Flowbite React 0.12.10** - Component library
- **Lucide React 0.468.0** - Icon library

### Forms & Validation

- **React Hook Form 7.54.0** - Performant form management
- **Zod 3.24.0** - TypeScript-first schema validation
- **@hookform/resolvers 3.9.0** - Form validation adapters

### Data Visualization

- **Recharts 2.15.0** - Composable charting library

### Rich Text Editor

- **TipTap 3.10.1** - Extensible rich text editor

### HTTP & Utilities

- **Axios 1.7.0** - Promise-based HTTP client
- **date-fns 4.1.0** - Modern date utility library

### Development & Testing

- **Vitest 4.0.10** - Fast unit test framework
- **React Testing Library 16.3.0** - React component testing
- **ESLint 9.36.0** - Code linting
- **TypeScript ESLint 8.45.0** - TypeScript-specific linting

---

## 📂 Project Structure

```
openkingdom-admin/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base design system components
│   │   ├── auth/           # Authentication components
│   │   ├── charts/         # Chart components
│   │   └── features/       # Feature-specific components
│   ├── containers/          # Page-level container components
│   │   ├── Publisher/      # Publisher management
│   │   ├── Campaign/       # Campaign management
│   │   ├── Reports/        # Analytics dashboards
│   │   ├── Wallet/         # Wallet management
│   │   └── ...             # Other features
│   ├── layout/              # Layout components
│   │   ├── Main.tsx        # Main dashboard layout
│   │   ├── Sidebar.tsx     # Desktop navigation
│   │   └── Header.tsx      # Top header bar
│   ├── lib/                 # Core utilities
│   │   ├── api.ts          # API client & endpoints
│   │   ├── queryClient.ts  # React Query config
│   │   ├── queries/        # React Query hooks
│   │   └── utils/          # Utility functions
│   ├── hooks/               # Custom React hooks
│   ├── context/             # React Context providers
│   ├── types.ts             # Global TypeScript types
│   └── main.tsx             # Application entry point
├── docs/                    # Project documentation
│   └── ai/                  # AI-DevKit structured docs
│       ├── requirements/    # Feature requirements
│       ├── design/          # Architecture & design
│       ├── planning/        # Task breakdowns
│       ├── implementation/  # Implementation guides
│       ├── testing/         # Test strategies
│       ├── deployment/      # Deployment guides
│       └── monitoring/      # Observability setup
├── mock-api/                # Mock API server
│   ├── server.js           # JSON Server instance
│   └── db.json             # Mock database
├── public/                  # Static assets
└── tests/                   # Test utilities
```

---

## 🎯 Key Features

### Publisher Management
- **Advanced Filtering**: Search by name, email, referral code, country, status, and member count
- **Detailed Profiles**: View publisher information, member network, KYC status, and activity history
- **Member Hierarchy**: Track tier-based referral structure (Tier 1, 2, 3)
- **KYC Approval**: Review and approve/reject KYC submissions
- **Publisher Actions**: Suspend, ban, or activate publisher accounts

### Campaign Management
- **Campaign Creation**: Rich text editor for descriptions, date range selection, budget allocation
- **Multi-format Support**: Daily check-in, view ads, shorten link campaigns
- **Targeting Options**: Country-specific campaigns with whitelist/blacklist support
- **Reward Configuration**: Tier-based reward distribution
- **Status Control**: Activate, pause, or end campaigns
- **Performance Tracking**: Real-time participant count, conversion rates, budget tracking

### Analytics & Reporting
- **Publisher Reports**: Time-based analytics, activity trends, top performers
- **Campaign Reports**: ROI metrics, conversion tracking, budget vs. spend analysis
- **Custom Date Ranges**: UTC-based date filtering with dual-month calendar picker
- **Data Export**: Export reports for external analysis
- **Visual Dashboards**: Line charts, bar charts, and KPI cards

### Transaction Management
- **Transaction History**: Complete audit trail of all platform transactions
- **Status Tracking**: Pending, approving, approved, rejected states
- **Detailed View**: Transaction details with sender, receiver, amount, and notes
- **Wallet Integration**: View associated wallet addresses and balances

### Wallet System
- **Multi-Currency Support**: Manage multiple cryptocurrency wallets
- **Balance Tracking**: Real-time wallet balance display
- **Currency Details**: Detailed views for each supported currency
- **User Wallet Management**: Track publisher wallets and transactions

### Platform Settings
- **Income Per Tier**: Configure revenue distribution across referral tiers
- **System Configuration**: Platform-wide settings and preferences
- **User Management**: Admin user management and permissions

---

## 🔐 Authentication

The application uses a **two-step OTP (One-Time Password) authentication** flow:

1. **Email Entry**: User enters their email address
2. **OTP Request**: System sends a 6-digit OTP code to the email
3. **OTP Verification**: User enters the received code
4. **Token Generation**: JWT token issued and stored in localStorage
5. **Auto-injection**: Token automatically included in all API requests
6. **Session Management**: 401 responses trigger automatic logout and redirect

**Protected Routes**: Dashboard routes are guarded by `ProtectedRoute` component, requiring valid authentication.

---

## 🎨 Design System

### Component Library

The project includes a comprehensive UI component library in `src/components/ui/`:

- **Table**: Flexible table with sticky columns, horizontal scroll, and responsive design
- **Button**: Variant-based buttons (primary, secondary, danger, ghost)
- **Modal**: Accessible modal dialogs with portal rendering
- **DateRangeInput**: UTC-based date range picker with mobile bottom sheet
- **MultipleSelectDropdown**: Checkbox-based multi-select with "Select All"
- **SearchInput**: Debounced search with customizable delay
- **Pagination**: Table pagination with rows-per-page selector
- **Badge**: Status indicators with color variants
- **Tabs**: Tabbed navigation for multi-section content
- **Alert**: Notification banners with severity levels
- **Tooltip**: Contextual help tooltips

### Responsive Design

- **Mobile Breakpoint**: 430px (phones)
- **Desktop Breakpoint**: 899px
- **Mobile Features**: Bottom sheet overlays, bottom navigation bar, touch-optimized UI
- **Desktop Features**: Sticky sidebar, multi-column layouts, hover states
- **Adaptive Components**: Components automatically adjust based on viewport size using `useIsMobile()` hook

### Styling Approach

- **Tailwind CSS 4**: Utility-first CSS with custom theme configuration
- **tailwind-variants**: Type-safe component variants
- **Consistent Spacing**: Standardized spacing scale (2.5, 3, 4, etc.)
- **Color System**: Semantic color palette aligned with brand
- **Typography**: System font stack with consistent heading hierarchy

---

## 🧪 Testing Strategy

### Test Coverage

The project uses **Vitest** with **React Testing Library** for comprehensive testing:

- **Unit Tests**: Individual component and utility testing
- **Integration Tests**: Component interaction and API flow testing
- **Coverage Target**: 80%+ for UI components, 100% for utilities

### Running Tests

```bash
# Watch mode (recommended during development)
yarn test

# Single run with coverage
yarn test:coverage

# UI mode for visual debugging
yarn test:ui

# Run specific test file
yarn test src/components/ui/Button.test.tsx
```

### Test Patterns

**Component Tests**:
```typescript
// Example: Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

**Hook Tests**:
```typescript
// Example: useAuth.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from './useAuth';

test('authenticates user with valid credentials', async () => {
  const { result } = renderHook(() => useAuth());
  // Test authentication flow
});
```

---

## 📚 Documentation

### Structured Documentation (AI-DevKit)

The project uses AI-DevKit for structured development documentation in `docs/ai/`:

| Phase | Description | Location |
|-------|-------------|----------|
| **Requirements** | Problem statements, user stories, success criteria | `docs/ai/requirements/` |
| **Design** | Architecture decisions, system design, diagrams | `docs/ai/design/` |
| **Planning** | Task breakdowns, milestones, timelines | `docs/ai/planning/` |
| **Implementation** | Code guides, patterns, integration notes | `docs/ai/implementation/` |
| **Testing** | Test strategies, test cases, quality assurance | `docs/ai/testing/` |
| **Deployment** | Deployment guides, infrastructure setup | `docs/ai/deployment/` |
| **Monitoring** | Observability, logging, alerting setup | `docs/ai/monitoring/` |

### Key Documentation Files

- **[Codebase Architecture](docs/ai/implementation/knowledge-src-codebase-architecture.md)**: Comprehensive onboarding guide covering the entire `src/` directory structure, patterns, and workflows
- **[Main App Architecture](docs/ai/implementation/knowledge-main-app-and-mock-api-architecture.md)**: System architecture overview of React app and mock API integration
- **[Wallet Container](docs/ai/implementation/knowledge-wallet-container.md)**: Deep dive into wallet management implementation
- **[AGENTS.md](AGENTS.md)**: AI interaction guidelines and project conventions

### Developer Onboarding

For new developers, we recommend this learning path:

**Week 1: Foundation**
1. Read [Codebase Architecture](docs/ai/implementation/knowledge-src-codebase-architecture.md)
2. Set up development environment
3. Explore authentication flow (`LoginModal`, `ProtectedRoute`)
4. Study one container component (e.g., `Publisher`)

**Week 2: Feature Development**
1. Review UI component library in `components/ui/`
2. Create a simple feature (add a filter, new component)
3. Study React Query patterns in `lib/queries/`
4. Write tests for your feature

**Week 3: Advanced Topics**
1. Study mobile responsive patterns (`useIsMobile`, `BottomSheet`)
2. Review state management strategy (React Query + Context)
3. Understand event communication (`useEventEmitter`)
4. Performance profiling with React DevTools

---

## 🔧 Development Workflows

### Adding a New Feature

1. **Requirements**: Document requirements in `docs/ai/requirements/feature-name.md`
2. **Design**: Create design doc in `docs/ai/design/feature-name.md` with diagrams
3. **Planning**: Break down tasks in `docs/ai/planning/feature-name.md`
4. **Implementation**:
   - Create container in `src/containers/FeatureName/`
   - Build UI components in `src/components/`
   - Add API endpoints in `src/lib/api.ts`
   - Create React Query hooks in `src/lib/queries/`
   - Add route in `src/App.tsx`
   - Update navigation in `src/layout/Sidebar.tsx`
5. **Testing**: Define test strategy in `docs/ai/testing/feature-name.md`, write tests
6. **Documentation**: Update implementation notes in `docs/ai/implementation/`

### Creating a New UI Component

1. Create component file: `src/components/ui/ComponentName.tsx`
2. Define TypeScript interfaces for props
3. Use `tailwind-variants` for styling with variants
4. Export component and types
5. Create test file: `src/components/ui/ComponentName.test.tsx`
6. Document usage in component file JSDoc comments

### API Integration

1. Define TypeScript types in `src/types.ts`
2. Add API methods in `src/lib/api.ts`
3. Create React Query hooks in `src/lib/queries/`
4. Use hooks in container components
5. Handle loading, error, and success states
6. Add optimistic updates where appropriate

---

## 🌐 API Integration

### Mock API Server

The project includes a **JSON Server-based mock API** for development:

- **Location**: `mock-api/server.js`
- **Database**: `mock-api/db.json`
- **Port**: 3001 (default)
- **Features**: Authentication, CRUD operations, pagination, filtering, sorting

### API Client Configuration

```typescript
// src/lib/api.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Auto-inject JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3001
```

---

## 🚢 Deployment

### Production Build

```bash
# Build optimized production bundle
yarn build

# Output: dist/ directory
# Contains optimized HTML, CSS, JS, and assets
```

### Deployment Options

The built static files in `dist/` can be deployed to:

- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag-and-drop or CLI deployment
- **AWS S3 + CloudFront**: Static hosting with CDN
- **GitHub Pages**: Free hosting for public repos
- **Docker**: Build Docker image with nginx to serve static files

### Environment-Specific Configuration

Use environment variables for different environments:

- `.env.development` - Development settings
- `.env.production` - Production settings
- `.env.staging` - Staging settings

---

## 🤝 Contributing

### Code Style

- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Follow configured rules in `eslint.config.js`
- **Formatting**: Consistent indentation (2 spaces), semicolons
- **Naming**: 
  - Components: PascalCase (`UserProfile`)
  - Files: PascalCase for components, camelCase for utilities
  - Variables/Functions: camelCase (`getUserData`)
  - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Commit Conventions

Follow conventional commits format:

```
type(scope): subject

feat(auth): add two-factor authentication
fix(publisher): resolve filtering bug
docs(readme): update installation steps
test(campaign): add unit tests for creation flow
refactor(table): improve sticky column logic
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Pull Request Process

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes following code style guidelines
3. Write/update tests for your changes
4. Run `yarn lint` and `yarn test` to ensure quality
5. Update relevant documentation in `docs/ai/`
6. Commit changes with conventional commit messages
7. Push branch and create pull request
8. Request review from team members

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🔗 Resources

### Documentation
- [Codebase Architecture Guide](docs/ai/implementation/knowledge-src-codebase-architecture.md)
- [AI-DevKit Documentation](docs/ai/)
- [Component Library](src/components/ui/)

### External Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Vitest Documentation](https://vitest.dev/)

### Community
- GitHub Issues: Report bugs and request features
- Pull Requests: Contribute code improvements
- Discussions: Ask questions and share ideas

---

## 💬 Support

For questions, issues, or contributions:

1. **Check Documentation**: Review `docs/ai/` for detailed guides
2. **Search Issues**: Look for existing discussions on GitHub
3. **Create Issue**: Report bugs or request features
4. **Contact Team**: Reach out to project maintainers

---

**Built with ❤️ by the OpenKingdom Team**
