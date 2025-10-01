import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import PageErrorBoundary from "./components/PageErrorBoundary";
import TestsPage from "./pages/TestsPage";
import RecorderPage from "./pages/RecorderPage";
import ResultsPage from "./pages/ResultsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route 
                path="/" 
                element={
                  <PageErrorBoundary pageName="Tests">
                    <TestsPage />
                  </PageErrorBoundary>
                } 
              />
              <Route 
                path="/recorder" 
                element={
                  <PageErrorBoundary pageName="Recorder">
                    <RecorderPage />
                  </PageErrorBoundary>
                } 
              />
              <Route 
                path="/results" 
                element={
                  <PageErrorBoundary pageName="Results">
                    <ResultsPage />
                  </PageErrorBoundary>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <PageErrorBoundary pageName="Settings">
                    <SettingsPage />
                  </PageErrorBoundary>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
