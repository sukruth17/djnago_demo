// ============================================
// Navbar Component
// ============================================
// This is the navigation bar that appears on every page.
// It uses React Router's Link component to navigate without page refresh.

import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* App title / logo */}
      <div className="navbar-brand">
        <Link to="/">🎓 Student Manager</Link>
      </div>

      {/* Navigation links */}
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/students">All Students</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
