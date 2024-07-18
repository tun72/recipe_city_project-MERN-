import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx"
import Route from "./routes/Index.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Route />
    </AuthProvider>
  </React.StrictMode>
);
