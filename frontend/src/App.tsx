import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { setupAccessibilityDetection } from "@/lib/accessibility";
import Index from "./pages/Index";
import Create from "./pages/Create";
import Preview from "./pages/Preview";

const queryClient = new QueryClient();

const App = () => {
  // Configurar detecção de acessibilidade na montagem do componente
  useEffect(() => {
    setupAccessibilityDetection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Anunciadores para leitores de tela */}
        <div id="a11y-announcer-polite" className="sr-only" aria-live="polite" aria-atomic="true"></div>
        <div id="a11y-announcer-assertive" className="sr-only" aria-live="assertive" aria-atomic="true"></div>
        
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/create" element={<Create />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;