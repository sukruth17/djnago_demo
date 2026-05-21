// ============================================
// main.jsx - Entry Point
// ============================================
// This is the very first file that runs.
// It takes our App component and renders it into the HTML page.
// The "root" div is in index.html.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

// Find the root element in index.html and render our App inside it
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
