---
phase: requirements
title: Requirements & Problem Understanding - Wallet Currency Details Panel
description: Right-side panel showing detailed currency information and operation history when clicking on currency rows
---

# Requirements & Problem Understanding

## Problem Statement
**What problem are we solving?**

- Currently, the Wallet page has a Currency tab that displays a table of different currencies (USDT, ROI, OKT) with their balances
- Users cannot view detailed information about a specific currency or see the operation history for that currency
- There's no way to see who made changes to withdrawal/deposit status or when those changes occurred
- Transaction history for a specific currency is not accessible from the currency view

**Who is affected by this problem?**
- Admin users who need to monitor and manage currency wallets
- Support staff investigating currency-related issues
- Finance team tracking currency operations and changes

**What is the current situation/workaround?**
- Users can only see summarized currency data in the table
- No visibility into operation history or detailed currency information
- Manual tracking or checking logs for operation history

## Goals & Objectives
**What do we want to achieve?**

**Primary goals:**
- Provide detailed view of individual currency wallets when clicking on currency rows
- Display comprehensive currency information including withdrawal status, balances, and transaction history
- Show operation history with who made changes, what changes were made, and when
- Maintain consistency with existing wallet user details panel design patterns

**Secondary goals:**
- Enable quick access to currency-specific information without leaving the wallet page
- Improve admin efficiency in managing and monitoring currency operations
- Provide audit trail for currency-related administrative actions

**Non-goals (what's explicitly out of scope):**
- Editing currency settings directly from the panel (view-only in this phase)
- Real-time updates/notifications for currency changes
- Exporting currency data or operation history
- Filtering/searching within the panel tabs

## User Stories & Use Cases
**How will users interact with the solution?**

**User Story 1: View Currency Details**
- As an admin user, I want to click on a currency row in the Currency tab
- So that I can see detailed information about that currency including total balance, available amount, locked amount, and withdrawal status

**User Story 2: Review Transaction History**
- As an admin user, I want to view the transaction history for a specific currency
- So that I can track all transactions (deposits, withdrawals, adjustments) for that currency

**User Story 3: Audit Operation Changes**
- As an admin user, I want to see the operation history for a currency
- So that I can know who enabled/disabled withdrawals or deposits and when those changes occurred

**Key workflows:**
1. User navigates to Wallet → Currency tab
2. User clicks on any currency row (e.g., Tether USDT)
3. Right panel slides in showing "Chi tiết ví tổng" (Currency Wallet Details)
4. Default view shows "Thông tin" (Information) tab with:
   - Withdrawal status toggle (view-only)
   - Currency name and total balance
   - Balance breakdown table (Total, Available, Locked, USDT value)
   - Transaction history table with filtering options
5. User can switch to "Lịch sử thao tác" (Operation History) tab to see:
   - Table showing person who performed action, the action taken, and timestamp

**Edge cases to consider:**
- Empty transaction history
- Empty operation history
- Very long transaction lists (pagination/scrolling)
- Currency with no operations recorded yet
- Clicking on the same currency row again (should keep panel open)

## Success Criteria
**How will we know when we're done?**

**Measurable outcomes:**
- Users can successfully open currency details panel by clicking on any currency row
- Panel displays correct information for the selected currency
- Both tabs (Information and Operation History) are functional and display appropriate data
- Panel can be closed using the X button
- Panel design matches Figma specifications

**Acceptance criteria:**
- ✅ Currency row click triggers right panel to open
- ✅ Panel shows "Chi tiết ví tổng" as header with currency name
- ✅ Information tab displays:
  - Withdrawal status indicator (e.g., "Khoá rút" with red toggle)
  - Currency details (name, ticker)
  - Balance breakdown in a table format
  - Transaction history with columns: #, Tx ID, Bên gửi/Bên nhận, Loại giao dịch, Số lượng, Số dư sau GD, Nội dung giao dịch, Trạng thái
  - Transaction type filter dropdown
- ✅ Operation History tab displays:
  - Table with columns: Người thao tác (with email), Thao tác (action description with before→after), Thời gian thao tác
- ✅ Tab switching works smoothly between Information and Operation History
- ✅ Close button (X) closes the panel
- ✅ Panel styling matches existing WalletDetails component patterns
- ✅ All text labels are in Vietnamese and match Figma

**Performance benchmarks:**
- Panel opens within 100ms of row click
- Tab switching is instantaneous
- Smooth animations for panel slide-in/out

## Constraints & Assumptions
**What limitations do we need to work within?**

**Technical constraints:**
- Must reuse existing RightSidePanel component
- Must follow existing pattern used in WalletDetails component
- Must use existing Table, Badge, Select, and other UI components
- Must maintain existing event emitter pattern for panel communication

**Business constraints:**
- View-only functionality (no editing in this phase)
- Must maintain consistency with existing user wallet details panel
- Vietnamese language only for labels

**Time/budget constraints:**
- Should be implemented using existing components and patterns
- Minimal new component creation (maximize reuse)

**Assumptions we're making:**
- Currency data structure will include operation history
- Mock data is acceptable for initial implementation
- Transaction and operation history can be stored in the same mock data structure
- Panel width should be consistent with existing WalletDetails panel (600px)

## Questions & Open Items
**What do we still need to clarify?**

**Unresolved questions:**
- Should the withdrawal status toggle be interactive or display-only?
  - **Resolution:** Display-only for now (matches Figma)
- What is the maximum number of transactions/operations to display?
  - **Resolution:** Show all, use scrolling (no pagination in panel)
- Should the panel close when clicking on a different currency row?
  - **Resolution:** No, should update to show the new currency's data

**Items requiring stakeholder input:**
- Confirm exact data structure for operation history from backend
- Verify if currency icons need to be actual logos or colored circles are acceptable

**Research needed:**
- Review existing mock data structure for currencies
- Identify where to add operation history data
- Determine if any new icons are needed

