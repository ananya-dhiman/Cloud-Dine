// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ Import the App component
import "./index.css";    // (optional) keep your global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />  {/* ✅ This renders your whole app with routes */}
  </React.StrictMode>
);
