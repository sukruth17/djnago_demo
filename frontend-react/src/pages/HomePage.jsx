// ============================================
// Home Page - Dashboard
// ============================================
// This is the landing page. It shows 4 cards that link to each feature.
// No API calls are made here - it's just for navigation.

import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  // Each card represents a feature in our app
  const features = [
    {
      title: "📝 Register Student",
      description: "Add a new student to the system",
      link: "/register",
      color: "#4361ee",
    },
    {
      title: "🔑 Student Login",
      description: "Login with email and password",
      link: "/login",
      color: "#3a0ca3",
    },
    {
      title: "📋 All Students",
      description: "View all registered students",
      link: "/students",
      color: "#7209b7",
    },
    {
      title: "🔍 Search Student",
      description: "Find a student by their email",
      link: "/search",
      color: "#f72585",
    },
  ];

  return (
    <div className="home-page">
      {/* Page title */}
      <div className="home-header">
        <h1>Student Management System</h1>
        <p>A simple dashboard to manage student records</p>
      </div>

      {/* Feature cards grid */}
      <div className="cards-grid">
        {features.map((feature, index) => (
          <Link to={feature.link} key={index} className="feature-card" style={{ borderTopColor: feature.color }}>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
            <span className="card-arrow" style={{ color: feature.color }}>
              Go →
            </span>
          </Link>
        ))}
      </div>

      {/* API info box */}
      <div className="api-info">
        <h3>📡 Connected APIs</h3>
        <ul>
          <li><code>POST /api/students/register/</code> — Register a student</li>
          <li><code>POST /api/students/login/</code> — Student login</li>
          <li><code>GET /api/students/get-all/</code> — Get all students</li>
          <li><code>GET /api/students/get-by-email/&lt;email&gt;/</code> — Search by email (URL)</li>
          <li><code>POST /api/students/get-by-email-body/</code> — Search by email (body)</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
