import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";
import { ToastProvider } from "@/context/toast/toast";
import { Landing } from "@/containers/Landing/Landing";
import { Main } from "@/layout/Main";
import { Publisher } from "./containers/Publisher/Publisher";
import { Campaign } from "./containers/Campaign/Campaign";
import { ReportsPublishers } from "./containers/Reports/ReportsPublishers";
import { ReportsCampaigns } from "./containers/Reports/ReportsCampaigns";
import { Transactions } from "./containers/Transactions/Transactions";
import { Wallet } from "./containers/Wallet/Wallet";
import { Settings } from "./containers/Settings/Settings";
import { IncomePerTier } from "./containers/IncomePerTier/IncomePerTier";
import { CampaignCreate } from "./containers/Campaign/CampaignCreate";
import { Notifications } from "./containers/Notifications/Notifications";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Main />}>
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
              <Route path="reports">
                <Route
                  index
                  element={
                    <Navigate to="/dashboard/reports/publishers" replace />
                  }
                />
                <Route path="publishers" element={<ReportsPublishers />} />
                <Route path="campaigns" element={<ReportsCampaigns />} />
              </Route>
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
