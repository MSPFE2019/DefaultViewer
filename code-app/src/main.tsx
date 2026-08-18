import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { PowerProvider } from "./PowerProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PowerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PowerProvider>
  </StrictMode>,
);
