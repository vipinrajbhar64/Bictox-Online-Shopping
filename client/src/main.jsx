import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 2500,

        success: {
          style: {
            background: "#06b6d4",
            color: "#fff",
          },
        },

        error: {
          style: {
            background: "#ef4444",
            color: "#fff",
          },
        },
      }}
    />
  </StrictMode>,
);
