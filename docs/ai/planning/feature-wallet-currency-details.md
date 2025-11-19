---
phase: planning
title: Project Planning & Task Breakdown - Wallet Currency Details Panel
description: Task breakdown and implementation plan for currency details feature
---

# Project Planning & Task Breakdown

## Milestones
**What are the major checkpoints?**

- [x] Milestone 1: Requirements & Design Documentation Complete
- [ ] Milestone 2: Mock Data & Data Structures Ready
- [ ] Milestone 3: CurrencyDetails Component Implementation Complete
- [ ] Milestone 4: Integration & Testing Complete
- [ ] Milestone 5: Code Review & Deployment Ready

## Task Breakdown
**What specific work needs to be done?**

### Phase 1: Foundation & Data Preparation
**Goal:** Prepare data structures and extend existing mock data

- [ ] **Task 1.1: Extend Currency Data Model**
  - Add `withdrawalStatus` and `depositStatus` fields to CurrencyAsset interface
  - Define `CurrencyTransaction` interface
  - Define `CurrencyOperation` interface
  - Update TypeScript types in appropriate location
  - **Estimated effort:** 30 minutes

- [ ] **Task 1.2: Create Mock Data for Currency Details**
  - Add transaction history to existing currency mock data
  - Add operation history to existing currency mock data
  - Create sample data for Tether (USDT), ROI, and OpenKingdom (OKT)
  - Ensure data matches Figma examples
  - **Estimated effort:** 1 hour

- [ ] **Task 1.3: Update WalletCurrency Component**
  - Add click handler to currency table rows
  - Emit `show-currency-panel` event with currency ID
  - Add ChevronRightIcon to rows (similar to user wallet view)
  - Add hover state styling
  - **Estimated effort:** 30 minutes

### Phase 2: Core Component Development
**Goal:** Build the CurrencyDetails component with all features

- [ ] **Task 2.1: Create CurrencyDetails Component Shell**
  - Create new file: `src/containers/Wallet/CurrencyDetails.tsx`
  - Set up component structure with event listener
  - Implement panel header with title and close button
  - Add basic styling matching Figma
  - **Estimated effort:** 45 minutes

- [ ] **Task 2.2: Implement Tab Navigation**
  - Create segment-style tab switcher UI (matching Figma)
  - Implement tab state management
  - Add tab switching logic
  - Apply correct styling for active/inactive states
  - **Estimated effort:** 30 minutes

- [ ] **Task 2.3: Build Information Tab - Withdrawal Status Section**
  - Display withdrawal status indicator (toggle visual + text)
  - Use red color (#FF3B34) for disabled status
  - Match Figma design exactly
  - **Estimated effort:** 20 minutes

- [ ] **Task 2.4: Build Information Tab - Balance Info Section**
  - Display currency name and ticker
  - Create balance breakdown table (Tên tài sản, Tổng tài sản, Khả dụng, Đang khoá, Tổng tài sản quy đổi USDT)
  - Reuse existing Table components
  - Add crypto icon display
  - **Estimated effort:** 45 minutes

- [ ] **Task 2.5: Build Information Tab - Transaction History**
  - Add transaction type filter dropdown
  - Create transaction history table with all columns
  - Implement filtering logic
  - Add proper status badges (approved, pending, rejected, warning)
  - Format amounts with colors (green for +, red for -)
  - **Estimated effort:** 1 hour

- [ ] **Task 2.6: Build Operation History Tab**
  - Create operation history table with 3 columns
  - Display operator name and email
  - Show action description with before→after states
  - Format timestamps
  - **Estimated effort:** 45 minutes

### Phase 3: Integration & Polish
**Goal:** Connect everything and ensure quality

- [ ] **Task 3.1: Integrate CurrencyDetails into Wallet Component**
  - Import CurrencyDetails component
  - Add to RightSidePanel (similar to WalletDetails)
  - Test panel open/close functionality
  - Ensure proper event emitter communication
  - **Estimated effort:** 30 minutes

- [ ] **Task 3.2: Refine Styling & Animations**
  - Ensure panel slide-in animation works
  - Match all colors to Figma design tokens
  - Verify typography matches Figma
  - Test responsive behavior
  - Polish hover states and transitions
  - **Estimated effort:** 45 minutes

- [ ] **Task 3.3: Handle Edge Cases**
  - Add empty state handling (no transactions)
  - Add empty state handling (no operations)
  - Handle missing/invalid currency data gracefully
  - Test with different data scenarios
  - **Estimated effort:** 30 minutes

- [ ] **Task 3.4: Code Quality & Cleanup**
  - Add proper TypeScript types everywhere
  - Remove any console.logs
  - Add comments for complex logic
  - Ensure consistent code style
  - Run linter and fix any issues
  - **Estimated effort:** 30 minutes

### Phase 4: Testing & Documentation
**Goal:** Ensure everything works correctly

- [ ] **Task 4.1: Write Unit Tests**
  - Test CurrencyDetails component rendering
  - Test tab switching functionality
  - Test event listener behavior
  - Test filtering logic for transactions
  - **Estimated effort:** 1.5 hours

- [ ] **Task 4.2: Integration Testing**
  - Test end-to-end flow: click row → panel opens → tabs work → close
  - Test clicking different currency rows
  - Test panel behavior with various data states
  - **Estimated effort:** 1 hour

- [ ] **Task 4.3: Manual Testing**
  - Test all interactions manually in browser
  - Verify visual design matches Figma
  - Test keyboard navigation
  - Test in different viewport sizes
  - **Estimated effort:** 45 minutes

- [ ] **Task 4.4: Update Documentation**
  - Update implementation notes
  - Document any deviations from design
  - Add usage examples in comments
  - **Estimated effort:** 30 minutes

## Dependencies
**What needs to happen in what order?**

### Task Dependencies
- Task 1.2 depends on Task 1.1 (need interfaces before creating mock data)
- Task 2.1 depends on Task 1.1 (need types defined)
- All Task 2.x depend on Task 2.1 (need component shell)
- Task 3.1 depends on all Task 2.x (need complete component)
- Task 3.2 depends on Task 3.1 (need integrated component)
- Task 4.x can start after Task 3.x are complete

### External Dependencies
- No external API dependencies (using mock data)
- No new package dependencies required
- Uses existing UI component library
- Uses existing event emitter system

### Team/Resource Dependencies
- Design review may be needed for Figma accuracy
- Code review before merging to main

## Timeline & Estimates
**When will things be done?**

### Total Estimated Effort: ~12 hours

### Breakdown by Phase:
- **Phase 1: Foundation** → ~2 hours
- **Phase 2: Core Development** → ~4.5 hours
- **Phase 3: Integration & Polish** → ~2 hours
- **Phase 4: Testing & Documentation** → ~3.5 hours

### Target Milestones:
- **Day 1:** Complete Phase 1 & Phase 2 (Tasks 1.1 - 2.6)
- **Day 2:** Complete Phase 3 & Phase 4 (Tasks 3.1 - 4.4)
- **Day 3:** Code review and final adjustments

### Buffer:
- Additional 2 hours for unexpected issues
- Total estimated: 14 hours

## Risks & Mitigation
**What could go wrong?**

### Technical Risks

**Risk 1: Event Emitter Conflicts**
- **Impact:** Medium
- **Probability:** Low
- **Mitigation:** Use unique event names, test thoroughly with both user and currency panels

**Risk 2: Panel Behavior Issues**
- **Impact:** Medium
- **Probability:** Low
- **Mitigation:** Reuse proven pattern from WalletDetails, test edge cases

**Risk 3: Styling Inconsistencies**
- **Impact:** Low
- **Probability:** Medium
- **Mitigation:** Use Figma design tokens, frequent visual comparison with design

**Risk 4: Mock Data Complexity**
- **Impact:** Low
- **Probability:** Low
- **Mitigation:** Keep data structure simple, follow existing patterns

### Resource Risks

**Risk 5: Design Approval Delays**
- **Impact:** Low
- **Probability:** Low
- **Mitigation:** Implementation closely follows Figma, minimal deviation

### Dependency Risks

**Risk 6: Existing Component Limitations**
- **Impact:** Medium
- **Probability:** Low
- **Mitigation:** Components (Table, Badge, etc.) are already battle-tested

## Resources Needed
**What do we need to succeed?**

### Team Members and Roles
- **Developer:** Implement all tasks
- **Designer (optional):** Review final implementation against Figma
- **Reviewer:** Code review before merge

### Tools and Services
- Figma access for design reference
- Local development environment
- Testing tools (Vitest/React Testing Library)
- Browser DevTools for debugging

### Infrastructure
- No new infrastructure needed
- Uses existing development setup

### Documentation/Knowledge
- ✅ Figma designs provided (2 tabs)
- ✅ Existing WalletDetails component as reference
- ✅ Project component library documentation
- ✅ Event emitter pattern documentation

## Success Metrics

### Definition of Done
- [ ] All tasks marked complete
- [ ] Code passes all tests (unit + integration)
- [ ] No linter errors
- [ ] Visual design matches Figma
- [ ] Panel works in all scenarios (open, close, tab switch, row switch)
- [ ] Code review approved
- [ ] Documentation updated

### Quality Gates
- Unit test coverage: 80%+ for new component
- No TypeScript errors
- No console warnings/errors
- Passes accessibility checks
- Works in Chrome, Firefox, Safari

