---
phase: implementation
title: Implementation Guide - Wallet Currency Details Panel
description: Technical implementation notes and code patterns for currency details feature
---

# Implementation Guide

## Development Setup
**How do we get started?**

### Prerequisites and Dependencies
- No new dependencies required
- Uses existing project setup
- Ensure Figma MCP tools are configured

### Environment Setup Steps
1. Pull latest code from main branch
2. Install dependencies: `yarn install`
3. Start development server: `yarn dev`
4. Start mock API server: `cd mock-api && node server.js`

### Configuration Needed
- No additional configuration required
- Uses existing event emitter setup
- Uses existing component library

## Code Structure
**How is the code organized?**

### Directory Structure
```
src/
├── containers/
│   └── Wallet/
│       ├── Wallet.tsx                 # Main wallet container (modified)
│       ├── WalletDetails.tsx          # User wallet details (existing)
│       ├── CurrencyDetails.tsx        # NEW: Currency wallet details
│       └── index.ts                   # Exports (modified)
├── components/
│   ├── ui/
│   │   ├── Table.tsx                  # Reused
│   │   ├── Badge.tsx                  # Reused
│   │   ├── Select.tsx                 # Reused
│   │   └── ...
│   └── features/
│       └── RightSidePanel.tsx         # Reused
└── types.ts                           # Extended with new interfaces
```

### Module Organization
- **Wallet Container**: Orchestrates tabs and panels
- **CurrencyDetails Component**: Self-contained currency details logic
- **Shared Types**: Centralized in types.ts or local interfaces
- **Mock Data**: Embedded in component or separate mock file

### Naming Conventions
- Component: `CurrencyDetails` (PascalCase)
- Props Interface: `CurrencyDetailsProps`
- State Interface: `CurrencyDetailsState`
- Mock Data: `mockCurrencyDetails` or `mockCurrencyData`
- Event Names: `"show-currency-panel"`, `"hide-right-panel"`

## Implementation Notes
**Key technical details to remember:**

### Core Features

#### Feature 1: Currency Row Click Handler
```typescript
// In WalletCurrency component (Wallet.tsx)

const handleCurrencyClick = (currencyId: number) => {
  publish("show-currency-panel", currencyId.toString());
};

// Add to currency table row
<TableRow 
  key={asset.id} 
  onClick={() => handleCurrencyClick(asset.id)}
  className="h-14 cursor-pointer hover:bg-gray-50"
>
  {/* Table cells */}
</TableRow>
```

#### Feature 2: Event Listener Setup
```typescript
// In CurrencyDetails component

const [selectedCurrencyId, setSelectedCurrencyId] = useState<number | null>(null);
const [activeTab, setActiveTab] = useState<"information" | "operations">("information");

useEventListener<string>("show-currency-panel", (currencyId) => {
  setSelectedCurrencyId(Number(currencyId));
  setActiveTab("information"); // Always start with information tab
});
```

#### Feature 3: Tab Switcher UI (Segment Style)
```typescript
// Segment-style tabs matching Figma

<div className="bg-[#edf2fd] flex h-8 items-center justify-center px-0.5 py-0 rounded-md">
  <button
    onClick={() => setActiveTab("information")}
    className={cn(
      "flex gap-2.5 h-7 items-center justify-center px-2 py-1.5 rounded-[5px] transition-colors",
      activeTab === "information"
        ? "bg-white text-[#021337] font-medium"
        : "bg-transparent text-[#677187] font-normal hover:text-[#021337]"
    )}
  >
    <span className="text-xs leading-4">Thông tin</span>
  </button>
  <button
    onClick={() => setActiveTab("operations")}
    className={cn(
      "flex gap-2.5 h-7 items-center justify-center px-2 py-1.5 rounded-[5px] transition-colors",
      activeTab === "operations"
        ? "bg-white text-[#021337] font-medium"
        : "bg-transparent text-[#677187] font-normal hover:text-[#021337]"
    )}
  >
    <span className="text-xs leading-4">Lịch sử thao tác</span>
  </button>
</div>
```

#### Feature 4: Withdrawal Status Display
```typescript
// Display-only withdrawal status indicator

<div className="flex flex-col gap-1">
  <p className="text-xs text-[#677187] leading-4">Trạng thái rút</p>
  <div className="flex items-center gap-2">
    <div className="w-11 h-6 bg-[#ff3b34] rounded-full p-0.5 flex items-start">
      <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
    </div>
    <span className="text-sm text-[#021337] leading-5">Khoá rút</span>
  </div>
</div>
```

#### Feature 5: Balance Breakdown Table
```typescript
// Single-row table showing currency balance details

<Table>
  <TableHead>
    <TableRow className="bg-white">
      <TableHeaderCell align="left">Tên tài sản</TableHeaderCell>
      <TableHeaderCell align="right">Tổng tài sản</TableHeaderCell>
      <TableHeaderCell align="right">Khả dụng</TableHeaderCell>
      <TableHeaderCell align="right">Đang khoá</TableHeaderCell>
      <TableHeaderCell align="right">Tổng tài sản quy đổi USDT</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell align="left">
        <div className="flex items-center gap-2">
          {getCryptoIcon(currency.icon)}
          <span className="font-medium">{currency.name}</span>
          <span className="text-[#777e90]">{currency.ticker}</span>
        </div>
      </TableCell>
      <TableCell align="right">{currency.totalAssets}</TableCell>
      <TableCell align="right">{currency.available}</TableCell>
      <TableCell align="right">{currency.locked}</TableCell>
      <TableCell align="right">{currency.usdtValue}</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Feature 6: Transaction History with Filtering
```typescript
// Transaction type filter

const [transactionTypeFilter, setTransactionTypeFilter] = useState("");

const transactionTypeOptions = [
  { value: "", label: "Loại giao dịch" },
  { value: "Giao dịch", label: "Giao dịch" },
  { value: "Điều chỉnh", label: "Điều chỉnh" },
];

const filteredTransactions = transactionTypeFilter
  ? currency.transactions.filter((t) => t.type === transactionTypeFilter)
  : currency.transactions;

// Render filter
<Select
  value={transactionTypeFilter}
  onChange={setTransactionTypeFilter}
  placeholder="Loại giao dịch"
  options={transactionTypeOptions}
/>

// Transaction table
<Table>
  <TableHead>
    <TableRow>
      <TableHeaderCell align="center">#</TableHeaderCell>
      <TableHeaderCell align="left">Tx ID</TableHeaderCell>
      <TableHeaderCell align="left">Bên gửi/ Bên nhận</TableHeaderCell>
      <TableHeaderCell align="left">Loại giao dịch</TableHeaderCell>
      <TableHeaderCell align="right">Số lượng</TableHeaderCell>
      <TableHeaderCell align="right">Số dư sau GD</TableHeaderCell>
      <TableHeaderCell align="left">Nội dung giao dịch</TableHeaderCell>
      <TableHeaderCell align="left">Trạng thái</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {filteredTransactions.map((tx, index) => (
      <TableRow key={tx.id}>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="left">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-[#677187]">{tx.datetime}</span>
            <span className="text-xs text-[#3273F1] font-medium">{tx.txId}</span>
          </div>
        </TableCell>
        <TableCell align="left">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium">{tx.senderName}</span>
            <span className="text-xs">{tx.senderEmail || tx.receiverEmail}</span>
          </div>
        </TableCell>
        <TableCell align="left">{tx.type}</TableCell>
        <TableCell 
          align="right"
          className={cn(
            "font-medium",
            tx.amount.startsWith("+") ? "text-[#00a349]" : "text-[#e5240c]"
          )}
        >
          {tx.amount}
        </TableCell>
        <TableCell align="right">{tx.balanceAfter}</TableCell>
        <TableCell align="left">{tx.description}</TableCell>
        <TableCell align="left">
          {getTransactionStatusBadge(tx.status)}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

#### Feature 7: Operation History Table
```typescript
// Operation history table (3 columns)

<Table>
  <TableHead>
    <TableRow>
      <TableHeaderCell align="left">Người thao tác</TableHeaderCell>
      <TableHeaderCell align="left">Thao tác</TableHeaderCell>
      <TableHeaderCell align="left">Thời gian thao tác</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {currency.operations.map((op) => (
      <TableRow key={op.id}>
        <TableCell align="left">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-normal">{op.operatorName}</span>
            <span className="text-[10px]">{op.operatorEmail}</span>
          </div>
        </TableCell>
        <TableCell align="left">
          <div className="flex flex-col gap-0">
            <span className="text-sm">{op.actionDescription}</span>
            <span className="text-sm font-medium">
              {op.previousStatus} → {op.newStatus}
            </span>
          </div>
        </TableCell>
        <TableCell align="left">
          <span className="text-sm">{op.datetime}</span>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Patterns & Best Practices

#### 1. Component Structure Pattern
```typescript
// Follow existing pattern from WalletDetails

export function CurrencyDetails() {
  // 1. Hooks
  const { publish } = useEventEmitter();
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"information" | "operations">("information");
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("");

  // 2. Event listeners
  useEventListener<string>("show-currency-panel", (currencyId) => {
    setSelectedCurrencyId(Number(currencyId));
    setActiveTab("information");
  });

  // 3. Handlers
  const handleClose = () => {
    publish("hide-right-panel");
    setSelectedCurrencyId(null);
  };

  // 4. Data lookup
  const currencyData = selectedCurrencyId ? mockCurrencyData[selectedCurrencyId] : null;

  // 5. Early return for no data
  if (!currencyData) {
    return null;
  }

  // 6. Helper functions
  const getTransactionStatusBadge = (status: string) => { /* ... */ };
  const getCryptoIcon = (icon: string) => { /* ... */ };

  // 7. Render
  return (
    <div className="bg-white h-full flex flex-col rounded-tl-3xl rounded-bl-3xl overflow-hidden w-full md:w-[600px]">
      {/* Header */}
      {/* Tabs */}
      {/* Tab Content */}
    </div>
  );
}
```

#### 2. Code Reuse Pattern
```typescript
// Reuse helper functions from WalletDetails if applicable

const getCryptoIcon = (icon: string) => {
  const colors: Record<string, string> = {
    usdt: "bg-[#26A17B]",
    roi: "bg-[#5B4FE9]",
    okt: "bg-[#1C315C]",
  };
  return (
    <div
      className={`w-8 h-8 rounded-full ${
        colors[icon] || "bg-gray-400"
      } flex items-center justify-center text-white text-xs font-semibold`}
    >
      {icon.substring(0, 2).toUpperCase()}
    </div>
  );
};

// Consider extracting to shared utility if used in multiple places
```

#### 3. Mock Data Pattern
```typescript
// Mock data structure embedded in component or separate file

const mockCurrencyDetails: Record<number, CurrencyDetailsData> = {
  1: {
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
      // More transactions...
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
      // More operations...
    ],
  },
  // More currencies...
};
```

## Integration Points
**How do pieces connect?**

### Event Emitter Integration
```typescript
// In Wallet.tsx - Currency row click
const handleCurrencyClick = (currencyId: number) => {
  publish("show-currency-panel", currencyId.toString());
};

// In CurrencyDetails.tsx - Listen for event
useEventListener<string>("show-currency-panel", (currencyId) => {
  setSelectedCurrencyId(Number(currencyId));
  setActiveTab("information");
});

// Close panel
const handleClose = () => {
  publish("hide-right-panel");
  setSelectedCurrencyId(null);
};
```

### RightSidePanel Integration
```typescript
// In Wallet.tsx

<RightSidePanel>
  <WalletDetails />      {/* Existing - for user wallets */}
  <CurrencyDetails />    {/* New - for currency details */}
</RightSidePanel>

// Both listen to different events:
// - WalletDetails listens to "show-right-panel" (user ID)
// - CurrencyDetails listens to "show-currency-panel" (currency ID)
// - Both can be closed with "hide-right-panel"
```

## Error Handling
**How do we handle failures?**

### Error Handling Strategy
```typescript
// Graceful handling of missing data
if (!currencyData) {
  return null; // Component doesn't render if no currency selected
}

// Empty state handling
{filteredTransactions.length === 0 && (
  <div className="p-4 text-center text-[#677187]">
    Không có giao dịch nào
  </div>
)}

{currency.operations.length === 0 && (
  <div className="p-4 text-center text-[#677187]">
    Chưa có lịch sử thao tác
  </div>
)}
```

### Logging Approach
- No console.logs in production code
- Use debugger for development
- Consider adding error boundaries for component isolation

## Performance Considerations
**How do we keep it fast?**

### Optimization Strategies
```typescript
// Memoize filtered transactions
const filteredTransactions = useMemo(
  () => transactionTypeFilter
    ? currency.transactions.filter((t) => t.type === transactionTypeFilter)
    : currency.transactions,
  [currency.transactions, transactionTypeFilter]
);

// Memoize expensive icon rendering if needed
const MemoizedCryptoIcon = memo(({ icon }: { icon: string }) => {
  return getCryptoIcon(icon);
});
```

### Resource Management
- Keep mock data reasonable size (< 100 transactions per currency)
- Consider lazy loading for large transaction lists (future enhancement)
- Use proper cleanup in useEffect hooks if any are added

## Security Notes
**What security measures are in place?**

### Authentication/Authorization
- Relies on existing app-level authentication
- No additional auth checks needed (admin-only feature)

### Input Validation
- All data is mock data (no user input in this phase)
- Currency ID type checking (Number conversion)

### Data Protection
- Display-only (no data modification)
- No sensitive data in console logs
- No localStorage/sessionStorage usage

## Testing Considerations

### Unit Test Examples
```typescript
describe('CurrencyDetails', () => {
  it('should render null when no currency is selected', () => {
    // Test initial state
  });

  it('should display Information tab by default', () => {
    // Test default tab
  });

  it('should switch to Operations tab when clicked', () => {
    // Test tab switching
  });

  it('should filter transactions by type', () => {
    // Test filtering logic
  });

  it('should close panel when X is clicked', () => {
    // Test close functionality
  });
});
```

### Integration Test Scenarios
- Click currency row → panel opens with correct data
- Switch tabs → content updates correctly
- Click different currency → data updates
- Close panel → panel disappears

## Common Pitfalls & Solutions

### Pitfall 1: Event Name Conflicts
**Problem:** Using same event name for both user and currency panels
**Solution:** Use distinct event names: `"show-right-panel"` vs `"show-currency-panel"`

### Pitfall 2: Stale State
**Problem:** Panel shows old currency data when switching
**Solution:** Always reset state when new currency is selected

### Pitfall 3: Styling Inconsistencies
**Problem:** Colors/spacing don't match Figma
**Solution:** Use exact hex values from Figma, measure spacing carefully

### Pitfall 4: Table Overflow
**Problem:** Long transaction lists cause layout issues
**Solution:** Use proper overflow-y-auto on scrollable container

