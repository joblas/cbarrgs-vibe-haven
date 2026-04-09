import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";

// Eager load the main page for fast initial render
import Index from "./pages/Index";

// Lazy load secondary pages - rarely visited, reduces initial bundle
const Promo = lazy(() => import("./pages/Promo"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback for lazy routes
const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-white/50 font-light tracking-wider animate-pulse">
      Loading...
    </div>
  </div>
);

const App = () => {
  return (
    <LazyMotion features={domAnimation}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/new" element={<Promo />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LazyMotion>
  );
};

export default App;
