import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/sonner";
import { Landing } from "@/pages/Landing";
import { Dashboard } from "@/pages/Dashboard";
import { Users } from "@/pages/Users";
import { UserDetail } from "@/pages/UserDetail";
import { Campaigns } from "@/pages/Campaigns";
import { CampaignDetail } from "@/pages/CampaignDetail";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="/dashboard/users" replace />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="campaigns/:id" element={<CampaignDetail />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        expand={true}
        richColors={true}
        closeButton={true}
        offset="20px"
        style={{ zIndex: 9999 }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
