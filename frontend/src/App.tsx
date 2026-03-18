import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocaleProvider } from "@/hooks/useLocale";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import ShopPage from "./pages/ShopPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import TrackingPage from "./pages/TrackingPage.tsx";
import FloatingTrackingBar from "./components/tracking/FloatingTrackingBar.tsx";

const queryClient = new QueryClient();

const HomeOnlyTrackingBar = () => {
  const location = useLocation();
  if (location.pathname !== '/') return null;
  return <FloatingTrackingBar />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocaleProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/track-order" element={<TrackingPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <HomeOnlyTrackingBar />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LocaleProvider>
  </QueryClientProvider>
);

export default App;
