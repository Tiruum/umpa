import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"

import "@umpa/ui/globals.css"
import { BrowserRouter } from "react-router"
import { ThemeProvider } from "@umpa/ui"
import { AppShell } from "./app/app-shell"
import { queryClient } from "./lib/query-client.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
