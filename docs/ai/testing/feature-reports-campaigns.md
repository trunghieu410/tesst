---
phase: testing
title: Testing Strategy
description: Define testing approach, test cases, and quality assurance
---

# Testing Strategy

## Test Coverage Goals
**What level of testing do we aim for?**

- Unit test coverage target: 100% of new custom components
- Integration test scope: Component interactions, data flow
- Manual testing: Visual verification against Figma, responsive behavior
- Alignment with requirements: All user stories covered

## Unit Tests
**What individual components need testing?**

### ReportsCampaigns Container
- [ ] Test: Component renders without crashing
- [ ] Test: Page title is set via event emitter
- [ ] Test: All sections render with sample data
- [ ] Test: Filter state updates correctly
- [ ] Test: Date range change updates state
- [ ] Test: Dropdown selection updates state

### Banner Performance Section
- [ ] Test: Renders all 4 stat cards
- [ ] Test: Displays correct values from props
- [ ] Test: Percentage formatting is correct
- [ ] Test: Responsive layout on mobile

### Daily Check-in Chart
- [ ] Test: Chart renders with sample data
- [ ] Test: Stats summary displays correct values
- [ ] Test: Hover tooltips work (if implemented)
- [ ] Test: Empty state when no data

### Token Distribution Chart
- [ ] Test: Dual-color bars render correctly
- [ ] Test: Legend shows personal vs member
- [ ] Test: Tooltip shows breakdown on hover
- [ ] Test: Stats row displays totals

### Transaction Status Pie Chart
- [ ] Test: Pie chart renders with transaction data
- [ ] Test: Legend displays correctly
- [ ] Test: Colors match design
- [ ] Test: Percentages sum to 100%

### Top Earning Table
- [ ] Test: Table renders all rows
- [ ] Test: Columns display correct data
- [ ] Test: Sorting works (if implemented)
- [ ] Test: Empty state when no data
- [ ] Test: Pagination works (if implemented)

## Integration Tests
**How do we test component interactions?**

- [ ] Integration: Filter changes update all dependent sections
- [ ] Integration: Date range filter affects chart data
- [ ] Integration: Tab switching shows correct content
- [ ] Integration: Event emitter updates page title on mount
- [ ] Integration: All charts load and render simultaneously

## End-to-End Tests
**What user flows need validation?**

- [ ] User flow 1: Navigate to Reports Campaigns page
- [ ] User flow 2: View all dashboard sections
- [ ] User flow 3: Change date range and see updates
- [ ] User flow 4: Switch between tabs (if multiple views)
- [ ] User flow 5: Verify responsive behavior on mobile

## Test Data
**What data do we use for testing?**

### Sample Data Sets
```typescript
// Banner stats mock
const mockBannerStats = {
  views: 50000,
  clicks: 25000,
  clickRate: "50.00%",
  pubRegistrations: 12500,
  cvr: "25.00%"
};

// Check-in data mock
const mockCheckinData = [
  { date: "26.10", totalClicks: 100000, uniqueParticipants: 92920, completionRate: "92.92%" },
  // ... more entries
];

// Token distribution mock
const mockTokenData = [
  { date: "26.10", personal: 14000, member: 12000 },
  // ... more entries
];

// Transaction status mock
const mockTransactionStatus = [
  { name: "Chờ duyệt", value: 12300, percentage: "6.7%", color: "#FFA500" },
  { name: "Tạm duyệt", value: 23600, percentage: "27.9%", color: "#0066FF" },
  { name: "Đã duyệt", value: 23600, percentage: "27.9%", color: "#00a349" },
  { name: "Từ chối", value: 2400, percentage: "14.1%", color: "#ff3b34" }
];

// Top earners mock
const mockTopEarners = [
  { rank: 1, name: "Phan Công Kiều", email: "kieu.phan@gmail.com", flag: "🇻🇳", 
    totalIncome: "371,321 OKD", personal: "280,435 OKD", f1: "67,493 OKD", 
    f2: "90,886 OKD", f3: "0 OKD" },
  // ... more entries
];
```

## Test Reporting & Coverage
**How do we verify and communicate test results?**

- Coverage command: `npm run test -- --coverage src/containers/Reports/ReportsCampaigns.tsx`
- Target: 100% coverage for new components
- Coverage gaps: Document any exceptions with rationale
- Manual testing checklist: Verify visual match with Figma

## Manual Testing
**What requires human validation?**

### UI/UX Testing Checklist
- [ ] Visual comparison with Figma design (pixel-perfect)
- [ ] Colors match design system
- [ ] Fonts and spacing match Figma
- [ ] Hover states work correctly
- [ ] Loading states display properly
- [ ] Empty states are user-friendly
- [ ] Accessibility: keyboard navigation works
- [ ] Accessibility: screen reader compatible

### Browser/Device Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Responsive Breakpoints
- [ ] Mobile (< 640px)
- [ ] Tablet (640px - 1024px)
- [ ] Desktop (> 1024px)
- [ ] Large desktop (> 1440px)

## Performance Testing
**How do we validate performance?**

- [ ] Page load time < 2 seconds
- [ ] Chart rendering < 500ms
- [ ] Filter interactions < 100ms
- [ ] No memory leaks on filter changes
- [ ] Smooth scrolling with all content loaded

## Bug Tracking
**How do we manage issues?**

- Issues found during testing will be tracked in Git commits/PR
- Critical bugs: Must fix before merge
- Minor bugs: Document and prioritize
- Future enhancements: Add to project backlog

## Test Results Summary
**To be filled after testing**

- Unit tests passed: [ ] Yes [ ] No
- Integration tests passed: [ ] Yes [ ] No
- Manual testing completed: [ ] Yes [ ] No
- Figma verification: [ ] Matches [ ] Minor differences [ ] Major differences
- Performance benchmarks met: [ ] Yes [ ] No

