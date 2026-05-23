
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const features = [
    {
      title: "Register Student",
      description: "Add a new student to the system",
      link: "/register",
      color: "#4361ee",
    },
    {
      title: "Student Login",
      description: "Login with email and password",
      link: "/login",
      color: "#3a0ca3",
    },
    {
      title: "All Students",
      description: "View all registered students",
      link: "/students",
      color: "#7209b7",
    },
  ];

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Student Management System</h1>
        <p>A simple dashboard to manage student records</p>
      </div>

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
    </div>
  );
}

export default HomePage;
