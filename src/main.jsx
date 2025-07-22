import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import { AuthProvider } from "./context/Authcontext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ TanStack
const queryClient = new QueryClient(); // ✅ Create a Query Client

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/* ✅ Add this */}
      <AuthProvider>
        <div className="font-urbanist max-w-7xl mx-auto">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
