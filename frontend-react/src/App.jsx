// ============================================
// App.jsx - Main Application Component
// ============================================
// This is the root component of our React app.
// It sets up:
//   1. React Router for navigation between pages
//   2. Navbar that appears on every page
//   3. Routes that map URLs to page components

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import StudentsPage from "./pages/StudentsPage";
import SearchPage from "./pages/SearchPage";
import "./App.css";

function App() {
  return (
    // BrowserRouter enables client-side routing (no page refresh)
    <BrowserRouter>
      {/* Navbar is outside Routes, so it shows on every page */}
      <Navbar />

      {/* Main content area */}
      <main className="main-content">
        {/* Routes define which page component to show for each URL */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
