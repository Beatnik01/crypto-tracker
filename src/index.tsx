import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router";
import router from "./Router";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
