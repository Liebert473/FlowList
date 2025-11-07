import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { SidebarProvider } from "./contexts/SidebarContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <SidebarProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </SidebarProvider>
    </AuthProvider>
  </StrictMode>
);
