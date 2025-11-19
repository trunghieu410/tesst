---
phase: testing
title: Testing Strategy - Wallet Currency Details Panel
description: Comprehensive testing plan for currency details feature
---

# Testing Strategy

## Test Coverage Goals
**What level of testing do we aim for?**

- **Unit test coverage target:** 80%+ of new CurrencyDetails component code
- **Integration test scope:** Critical paths (open panel, switch tabs, close panel) + error handling (missing data, empty states)
- **End-to-end test scenarios:** Complete user journey from currency table click to panel interaction and close
- **Alignment with requirements:** All acceptance criteria from requirements doc must be testable and tested

## Unit Tests
**What individual components need testing?**

### CurrencyDetails Component

#### Initial Render & State
- [ ] **Test: Renders null when no currency is selected**
  - Covers: Initial state, conditional rendering
  - Expected: Component returns null, no errors

- [ ] **Test: Listens for show-currency-panel event**
  - Covers: Event listener setup
  - Expected: useEventListener is called with correct event name

- [ ] **Test: Sets active tab to 'information' by default**
  - Covers: Default tab state
  - Expected: Information tab is selected on mount

#### Event Handling
- [ ] **Test: Updates selectedCurrencyId when event is received**
  - Covers: Event listener callback, state update
  - Expected: State updates with correct currency ID

- [ ] **Test: Resets to information tab when new currency is selected**
  - Covers: Tab reset on currency change
  - Expected: activeTab always resets to 'information'

- [ ] **Test: Publishes hide-right-panel event when close button is clicked**
  - Covers: Close handler, event publishing
  - Expected: Event emitter publish is called with correct event

- [ ] **Test: Clears selectedCurrencyId when closed**
  - Covers: State cleanup on close
  - Expected: selectedCurrencyId set to null

#### Tab Switching
- [ ] **Test: Switches to operations tab when clicked**
  - Covers: Tab state management, click handler
  - Expected: activeTab state changes to 'operations'

- [ ] **Test: Switches back to information tab when clicked**
  - Covers: Bidirectional tab switching
  - Expected: activeTab state changes to 'information'

- [ ] **Test: Applies correct CSS classes to active/inactive tabs**
  - Covers: Conditional styling
  - Expected: Active tab has white bg, inactive has transparent

#### Information Tab Rendering
- [ ] **Test: Displays currency name and ticker**
  - Covers: Data display, currency lookup
  - Expected: Correct currency data shown

- [ ] **Test: Shows withdrawal status correctly**
  - Covers: Status indicator rendering
  - Expected: Red toggle and "Khoá rút" text for disabled status

- [ ] **Test: Renders balance breakdown table**
  - Covers: Table rendering, data formatting
  - Expected: Table shows all balance columns with correct data

- [ ] **Test: Displays crypto icon with correct color**
  - Covers: Icon rendering helper function
  - Expected: Icon has correct background color for currency type

#### Transaction History
- [ ] **Test: Renders all transactions when no filter is applied**
  - Covers: Default transaction list rendering
  - Expected: All transactions from mock data are displayed

- [ ] **Test: Filters transactions by type**
  - Covers: Filter logic, state management
  - Expected: Only transactions matching filter are shown

- [ ] **Test: Shows empty state when no transactions match filter**
  - Covers: Empty state handling
  - Expected: Empty message displayed

- [ ] **Test: Formats transaction amounts with correct colors**
  - Covers: Conditional styling for positive/negative amounts
  - Expected: Green for +amounts, red for -amounts

- [ ] **Test: Displays correct status badges**
  - Covers: Badge rendering for different statuses
  - Expected: Approved → success, Pending → pending, etc.

#### Operation History Tab
- [ ] **Test: Renders operation history table**
  - Covers: Operations tab content rendering
  - Expected: Table with 3 columns displayed

- [ ] **Test: Displays operator name and email**
  - Covers: Nested data display
  - Expected: Both name and email shown for each operation

- [ ] **Test: Shows action with before→after format**
  - Covers: Action description formatting
  - Expected: "Khoá rút → Cho rút" format

- [ ] **Test: Formats datetime correctly**
  - Covers: Date display
  - Expected: Datetime in correct format

- [ ] **Test: Shows empty state when no operations exist**
  - Covers: Edge case - empty operations array
  - Expected: Empty message displayed

### Helper Functions

#### getCryptoIcon
- [ ] **Test: Returns correct color for USDT**
  - Expected: Returns green background (#26A17B)

- [ ] **Test: Returns correct color for ROI**
  - Expected: Returns purple background (#5B4FE9)

- [ ] **Test: Returns correct color for OKT**
  - Expected: Returns dark blue background (#1C315C)

- [ ] **Test: Returns default color for unknown icon**
  - Expected: Returns gray background

#### getTransactionStatusBadge
- [ ] **Test: Returns success badge for 'approved' status**
  - Expected: Badge with variant="success"

- [ ] **Test: Returns pending badge for 'pending' status**
  - Expected: Badge with variant="pending"

- [ ] **Test: Returns warning badge for 'warning' status**
  - Expected: Badge with variant="warning"

- [ ] **Test: Returns danger badge for 'rejected' status**
  - Expected: Badge with variant="danger"

## Integration Tests
**How do we test component interactions?**

### Currency Row Click → Panel Open
- [ ] **Integration: Click currency row triggers panel with correct data**
  - Scenario: User clicks on "Tether USDT" row
  - Expected: CurrencyDetails panel opens showing Tether data
  - Validates: Event emitter communication, data flow

### Tab Switching Integration
- [ ] **Integration: Switch between tabs maintains currency selection**
  - Scenario: Open panel → switch to operations tab → switch back to information
  - Expected: Currency data remains consistent, no data loss
  - Validates: State persistence during tab changes

### Multiple Currency Selection
- [ ] **Integration: Click different currency updates panel data**
  - Scenario: Open Tether → click ROI row
  - Expected: Panel updates to show ROI data, resets to information tab
  - Validates: Dynamic data loading, state updates

### Filter Interaction
- [ ] **Integration: Transaction type filter updates table**
  - Scenario: Select "Giao dịch" from filter dropdown
  - Expected: Table shows only "Giao dịch" transactions
  - Validates: Filter state, filtered rendering

### Close Panel
- [ ] **Integration: Close button hides panel**
  - Scenario: Open panel → click X button
  - Expected: Panel disappears, state is cleared
  - Validates: Close handler, event publishing, cleanup

### Edge Case: Empty Data
- [ ] **Integration: Handle currency with no transactions**
  - Scenario: Display currency with empty transactions array
  - Expected: Empty state message shown
  - Validates: Graceful empty data handling

- [ ] **Integration: Handle currency with no operations**
  - Scenario: Display currency with empty operations array
  - Expected: Empty state message shown
  - Validates: Graceful empty data handling

## End-to-End Tests
**What user flows need validation?**

### User Flow 1: Complete Currency Details View
- [ ] **E2E: Full happy path from currency table to detailed view**
  - Steps:
    1. Navigate to Wallet page
    2. Click "Đơn vị tiền" tab
    3. Click on "Tether USDT" row
    4. Verify panel opens with correct title
    5. Verify Information tab content is visible
    6. Verify withdrawal status is displayed
    7. Verify balance table is populated
    8. Verify transaction table is populated
  - Expected: Complete flow works without errors
  - Browser: Chrome, Firefox, Safari

### User Flow 2: Tab Navigation
- [ ] **E2E: Navigate between tabs**
  - Steps:
    1. Open currency details panel
    2. Click "Lịch sử thao tác" tab
    3. Verify operation history table appears
    4. Click "Thông tin" tab
    5. Verify information content reappears
  - Expected: Smooth tab transitions, correct content
  - Browser: Chrome, Firefox, Safari

### User Flow 3: Filter Transactions
- [ ] **E2E: Filter and view different transaction types**
  - Steps:
    1. Open currency details panel
    2. Click transaction type dropdown
    3. Select "Giao dịch"
    4. Verify filtered results
    5. Select "Điều chỉnh"
    6. Verify different filtered results
    7. Clear filter
    8. Verify all transactions shown
  - Expected: Filtering works correctly
  - Browser: Chrome, Firefox

### User Flow 4: Multiple Currencies
- [ ] **E2E: Switch between different currencies**
  - Steps:
    1. Click on Tether row
    2. Verify Tether data shown
    3. Click on ROI row
    4. Verify ROI data shown
    5. Click on OpenKingdom row
    6. Verify OpenKingdom data shown
  - Expected: Data updates correctly for each currency
  - Browser: Chrome, Firefox

### Critical Path Testing
- [ ] **E2E: Verify all acceptance criteria from requirements**
  - ✅ Currency row click triggers panel
  - ✅ Panel header shows correct title
  - ✅ Information tab displays all required sections
  - ✅ Operation History tab displays correct data
  - ✅ Tab switching works
  - ✅ Close button works
  - ✅ Styling matches Figma

### Regression Testing
- [ ] **E2E: Verify existing user wallet details still works**
  - Steps:
    1. Go to "Người dùng" tab
    2. Click on user row
    3. Verify user details panel opens (not currency panel)
    4. Close panel
    5. Switch to "Đơn vị tiền" tab
    6. Click currency row
    7. Verify currency details panel opens
  - Expected: Both panels work independently
  - Browser: Chrome

## Test Data
**What data do we use for testing?**

### Test Fixtures
```typescript
// Mock currency data for testing
const mockTestCurrency = {
  id: 1,
  name: "Tether",
  ticker: "USDT",
  icon: "usdt",
  totalAssets: "12.32932832",
  available: "0.00840590",
  locked: "0.000000",
  usdtValue: "12.32932832",
  withdrawalStatus: "disabled",
  depositStatus: "enabled",
  transactions: [
    {
      id: "1",
      txId: "TxC-312-67000",
      datetime: "10.13.2025 - 14:52",
      senderName: "Hệ thống",
      senderEmail: "kieu.phan@gmail.com",
      receiverName: "Phan Công Kiều",
      receiverEmail: "kieu.phan@gmail.com",
      type: "Giao dịch",
      amount: "-5.000000",
      balanceAfter: "12.070000",
      description: "Thu nhập từ chiến dịch",
      status: "approved",
    },
  ],
  operations: [
    {
      id: "1",
      datetime: "10.13.2025 - 13:50",
      operatorName: "Tuấn Phan",
      operatorEmail: "tuanphan@gmail.com",
      actionType: "withdrawal",
      actionDescription: "Cập nhật Trạng thái Rút",
      previousStatus: "Khoá rút",
      newStatus: "Cho rút",
    },
  ],
};

// Mock empty currency for edge case testing
const mockEmptyCurrency = {
  id: 2,
  name: "ROI",
  ticker: "ROI",
  icon: "roi",
  totalAssets: "0.00000000",
  available: "0.00000000",
  locked: "0.000000",
  usdtValue: "0.00000000",
  withdrawalStatus: "enabled",
  depositStatus: "enabled",
  transactions: [],
  operations: [],
};
```

### Mocks & Stubs
```typescript
// Mock event emitter
const mockPublish = jest.fn();
const mockUseEventEmitter = jest.fn(() => ({ publish: mockPublish }));

// Mock event listener
const mockUseEventListener = jest.fn((event, callback) => {
  // Store callback for manual triggering in tests
});
```

## Test Reporting & Coverage
**How do we verify and communicate test results?**

### Coverage Commands
```bash
# Run all tests with coverage
yarn test --coverage

# Run specific test file
yarn test CurrencyDetails.test.tsx

# Run tests in watch mode
yarn test --watch
```

### Coverage Thresholds
- **Statements:** 80%
- **Branches:** 75%
- **Functions:** 80%
- **Lines:** 80%

### Coverage Gaps & Rationale
- Helper functions (getCryptoIcon, etc.): Should reach 100%
- Event handlers: Should reach 100%
- Conditional rendering: Should test all branches
- Edge cases: Empty states, missing data

### Manual Testing Outcomes
- [ ] Visual design matches Figma (100%)
- [ ] All interactions work smoothly
- [ ] No console errors or warnings
- [ ] Responsive behavior acceptable
- [ ] Keyboard navigation works

## Manual Testing
**What requires human validation?**

### UI/UX Testing Checklist
- [ ] **Visual Design Accuracy**
  - [ ] Colors match Figma exactly
  - [ ] Spacing matches Figma (padding, gaps, margins)
  - [ ] Typography matches Figma (sizes, weights, line heights)
  - [ ] Withdrawal status toggle visual is correct
  - [ ] Tables are properly aligned
  - [ ] Badges have correct colors

- [ ] **Interactions**
  - [ ] Currency row hover state
  - [ ] Tab hover and active states
  - [ ] Close button hover state
  - [ ] Smooth panel slide-in animation
  - [ ] Smooth tab transitions
  - [ ] Dropdown interactions

- [ ] **Accessibility**
  - [ ] All interactive elements are keyboard accessible
  - [ ] Tab navigation works logically
  - [ ] Close button has proper focus indicator
  - [ ] Tables have proper semantic structure
  - [ ] Color contrast is sufficient (WCAG AA)
  - [ ] Screen reader compatibility (basic check)

### Browser/Device Compatibility
- [ ] **Desktop Browsers**
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)

- [ ] **Responsive Behavior**
  - [ ] Desktop (1920px wide) - panel 600px
  - [ ] Laptop (1366px wide) - panel 600px
  - [ ] Tablet (768px wide) - panel adapts
  - [ ] Mobile (375px wide) - full width panel

### Smoke Tests After Deployment
- [ ] Open wallet page - no errors
- [ ] Click currency row - panel opens
- [ ] Switch tabs - works correctly
- [ ] Close panel - panel disappears
- [ ] Existing user wallet details still works

## Performance Testing
**How do we validate performance?**

### Load Testing Scenarios
- [ ] **Panel Open Time**
  - Measure time from row click to panel fully rendered
  - Target: < 100ms
  - Tools: Chrome DevTools Performance tab

- [ ] **Tab Switch Time**
  - Measure time from tab click to content visible
  - Target: < 50ms (instantaneous)
  - Tools: Chrome DevTools Performance tab

- [ ] **Large Transaction List**
  - Test with 100+ transactions
  - Check scroll performance
  - Target: 60fps scrolling
  - Tools: Chrome DevTools Performance Monitor

### Performance Benchmarks
- **First Paint:** < 100ms after event
- **Time to Interactive:** < 150ms
- **Memory Usage:** No memory leaks on repeated open/close
- **Render Time:** < 50ms for tab switches

## Bug Tracking
**How do we manage issues?**

### Issue Tracking Process
1. Identify bug during testing
2. Document in GitHub Issues with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/environment info
3. Assign severity level
4. Link to test case that caught it

### Bug Severity Levels
- **Critical:** Panel doesn't open, app crashes
- **High:** Wrong data shown, major visual issues
- **Medium:** Minor visual issues, edge case bugs
- **Low:** Cosmetic issues, minor UX improvements

### Regression Testing Strategy
- Run full test suite before each commit
- Run E2E tests before merge to main
- Manual smoke test after deployment
- Monitor for issues in production

## Definition of Done - Testing
- [ ] All unit tests passing (80%+ coverage)
- [ ] All integration tests passing
- [ ] All E2E tests passing
- [ ] Manual testing completed and signed off
- [ ] No critical or high severity bugs remaining
- [ ] Visual design approved (matches Figma)
- [ ] Accessibility check passed
- [ ] Performance benchmarks met
- [ ] Browser compatibility verified
- [ ] Documentation updated with test results

