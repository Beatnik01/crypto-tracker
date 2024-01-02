import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./Router";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { HelmetProvider } from "react-helmet-async";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element!");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
