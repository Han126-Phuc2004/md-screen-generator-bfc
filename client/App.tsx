import { Toaster } from "@/components/ui/toaster";
import "./global.css";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FE02Router, { FE02_PATHS } from "./pages/FE02";
import FE03Router, { FE03_PATHS } from "./pages/FE03";

const queryClient = new QueryClient();

const publicPaths = [
  "/",
  "/cac-quy",
  "/cac-quy/quy-hoc-tap",
  "/minh-bach",
  "/giao-dich",
  "/giao-dich/:id",
  "/dong-gop",
  "/dong-gop/thanh-cong",
  "/cong-khai-diem",
  "/log-bat-bien",
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
        <Routes>
          {publicPaths.map((path) => (
            <Route key={path} path={path} element={<Index />} />
          ))}
          {FE02_PATHS.map((path) => (
            <Route key={path} path={path} element={<FE02Router />} />
          ))}
          {FE03_PATHS.map((path) => (
            <Route key={path} path={path} element={<FE03Router />} />
          ))}
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
