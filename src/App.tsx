import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";
import { ToastProvider } from "@/context/toast/toast";
import { Landing } from "@/pages/Landing";
import { Dashboard } from "@/pages/Dashboard";
import { Publisher } from "./pages/Publisher";
import { Campaign } from "./pages/Campaign";
import { Reports } from "./pages/Reports";
import { Transactions } from "./pages/Transactions";
import { Wallet } from "./pages/Wallet";
import { Settings } from "./pages/Settings";
import { IncomePerTier } from "./pages/IncomePerTier";
import { CampaignCreate } from "./pages/CampaignCreate";
import { Notifications } from "./pages/Notifications";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route
                index
                element={<Navigate to="/dashboard/publishers" replace />}
              />
              <Route path="publishers">
                <Route index element={<Publisher />} />
              </Route>
              <Route path="campaigns">
                <Route index element={<Campaign />} />
                <Route path="create" element={<CampaignCreate />} />
                {/* <Route path=":campaignId" element={<CampaignDetail />} /> */}
              </Route>
              <Route path="reports" element={<Reports />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings">
                <Route index element={<Settings />} />
                <Route path="income-per-tier" element={<IncomePerTier />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
