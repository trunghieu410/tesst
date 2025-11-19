---
phase: implementation
title: Implementation Guide
description: Technical implementation notes, patterns, and code guidelines
---

# Implementation Guide

## Development Setup
**How do we get started?**

### Prerequisites
- ✓ Node.js and npm/yarn installed
- ✓ React 19 with TypeScript
- ✓ Tailwind 4 configured
- ✓ Existing component library available

### Files to Modify/Create
- Main file: `src/containers/Reports/ReportsCampaigns.tsx`
- No new components needed (reuse existing)
- May need custom chart components if not available

## Code Structure
**How is the code organized?**

### Component Hierarchy
```
ReportsCampaigns (Container)
├── Banner Performance Stats Row
│   └── StatsCard (×4)
├── Filter Row
│   ├── DateRangeInput
│   ├── Dropdown
│   └── SegmentControl
├── Daily Check-in Section
│   └── SectionCard
│       ├── Stats Row
│       └── Bar Chart
├── Token Distribution & Transaction Status Row
│   ├── Token Chart (SectionCard + Dual Bar Chart)
│   └── Transaction Pie (SectionCard + GenderPieChart)
└── Top Earning Table
    └── SectionCard + Table
```

### File Organization
- Container: `src/containers/Reports/ReportsCampaigns.tsx`
- Reused components: `src/components/ui/*`
- Reused charts: `src/components/charts/*`
- Custom components: Inline in container or extract to src/components/ui if reusable

## Implementation Notes
**Key technical details to remember:**

### Core Features

#### 1. Banner Performance Section
```typescript
// Use StatsCard component similar to ReportsPublishers
<div className="flex items-center gap-6 mb-4 pb-4 border-b border-[#d0d5dd]">
  <div className="flex flex-col">
    <span className="text-[10px] font-normal leading-3.5 text-[#677187]">Lượt view</span>
    <span className="text-[18px] font-semibold leading-[26px] text-[#021337]">50,000</span>
  </div>
  {/* Repeat for clicks, registrations, CVR */}
</div>
```

#### 2. Daily Check-in Chart
- Reuse or adapt `IntroductionChart` component
- Two-color bars (primary/secondary) for different metrics
- Add stats row above chart with metrics
- Hover tooltip showing "Decreased 1.22%"

#### 3. Token Distribution Chart
- Create dual-color bar chart (personal in purple, member in red)
- Stats row showing: "Tổng OKD", "Cá nhân", "Thành viên"
- Hover tooltip with breakdown

#### 4. Transaction Status Pie Chart
- Reuse `GenderPieChart` component
- 4 segments: Chờ duyệt, Tạm duyệt, Đã duyệt, Từ chối
- Colors: Orange, Blue, Green, Red

#### 5. Top Earning Table
- Similar pattern to `MembersTable`
- Columns: #, Họ tên, Tổng thu nhập, Cá nhân, F1, F2, F3
- 50px row height, alternating background colors

### Patterns & Best Practices

#### State Management
```typescript
const [dateRange, setDateRange] = useState("26.10.2025 - 7.11.2025");
const [selectedCampaign, setSelectedCampaign] = useState("");
const [activeTab, setActiveTab] = useState<"daily" | "view_ads" | "shorten_links">("daily");
```

#### Reusable Components
- **StatsCard**: For stat displays
- **SectionCard**: Wrapper for all chart/table sections
- **DateRangeInput**: Date range picker
- **Dropdown**: Campaign selector
- **GenderPieChart**: Pie chart visualization
- **IntroductionChart**: Bar chart pattern

#### Tailwind Patterns
- Use exact colors from Figma: `#021337`, `#677187`, `#ff3b34`, `#00a349`, `#0066FF`
- Background colors: `#f3f4f5` for page, `#ffffff` for cards
- Border colors: `#d0d5dd`
- Rounded corners: `rounded-md` (6px)
- Shadows: `shadow-sm` for cards

## Integration Points
**How do pieces connect?**

### Event Emitter
```typescript
useEffect(() => {
  publish("title-change", { title: "Campaigns" });
}, [publish]);
```

### Component Imports
```typescript
import { useEventEmitter } from "@/hooks/useEventEmitter";
import { StatsCard } from "@/components/ui/StatsCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { DateRangeInput } from "@/components/ui/DateRangeInput";
import { Dropdown } from "@/components/ui/Dropdown";
import { GenderPieChart } from "@/components/charts/GenderPieChart";
import { IntroductionChart } from "@/components/charts/IntroductionChart";
```

## Error Handling
**How do we handle failures?**

- Loading states for async data (future)
- Empty states when no data available
- Graceful fallbacks for chart rendering errors
- Error boundaries for section isolation

## Performance Considerations
**How do we keep it fast?**

### Optimization Strategies
- Use `useMemo` for expensive data transformations
- Use `useCallback` for event handlers passed to children
- Lazy load chart libraries if not already loaded
- Consider virtualization for long tables (if > 100 rows)

### Example
```typescript
const chartData = useMemo(
  () => rawData.map(transformDataPoint),
  [rawData]
);

const handleDateChange = useCallback(
  (newDate: string) => setDateRange(newDate),
  []
);
```

## Key Reusable Patterns from ReportsPublishers

### Section with Info Icon
```typescript
<SectionCard title="Section Title" showInfoIcon contentClassName="pb-0">
  {/* Content */}
</SectionCard>
```

### Stats Grid Layout
```typescript
<div className="flex items-center gap-6 mb-4 pb-4 border-b border-[#d0d5dd]">
  {stats.map(stat => (
    <div key={stat.label} className="flex flex-col">
      <span className="text-[10px] font-normal leading-3.5 text-[#677187]">
        {stat.label}
      </span>
      <span className="text-[18px] font-semibold leading-[26px] text-[#021337]">
        {stat.value}
      </span>
    </div>
  ))}
</div>
```

### Responsive Grid
```typescript
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  {/* Two-column layout on desktop */}
</div>
```

## Implementation Progress
**Track progress here:**

- [ ] File structure created
- [ ] Imports added
- [ ] Banner stats section implemented
- [ ] Filter row implemented
- [ ] Daily check-in chart implemented
- [ ] Token distribution chart implemented
- [ ] Transaction status pie chart implemented
- [ ] Top earning table implemented
- [ ] Responsive layout tested
- [ ] Final polish and Figma comparison

