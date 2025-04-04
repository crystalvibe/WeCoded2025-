/**
 * Main Application Component
 * This is the root component that sets up the core structure of the application.
 * It includes:
 * - React Query for data fetching
 * - Toast notifications (both Toaster and Sonner)
 * - Tooltips
 * - Routing setup
 */

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a React Query client for managing API data and caching
const queryClient = new QueryClient();

/**
 * App Component
 * Sets up the application with the following features:
 * 1. Strict Mode - Helps catch common bugs and warnings
 * 2. Query Client - Handles API data fetching and caching
 * 3. Tooltip Provider - Manages tooltips throughout the app
 * 4. Toast Notifications - Two types of toast notifications (Toaster and Sonner)
 * 5. Router Setup - Handles page navigation with the following routes:
 *    - "/" -> Home page
 *    - "*" -> 404 Not Found page (catches all undefined routes)
 */
const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
