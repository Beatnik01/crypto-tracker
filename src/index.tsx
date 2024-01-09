import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./Router";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element!");
const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
