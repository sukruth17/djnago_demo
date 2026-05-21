// ============================================
// Login Page - Student Login Form
// ============================================
// This page has a login form with email and password.
// It calls POST /api/students/login/ when submitted.

import { useState } from "react";
import { loginStudent } from "../services/api";
import "./FormPage.css";

function LoginPage() {
  // ---- State variables ----
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // For showing messages and loading spinner
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---- Handle form submission ----
  const handleSubmit = async (event) => {
    // Prevent the page from refreshing
    event.preventDefault();

    // Clear any previous messages
    setMessage("");
    setError("");
    setLoading(true);

    try {
      // Build the credentials object
      const credentials = {
        email: email,
        password: password,
      };

      // Call the login API
      const response = await loginStudent(credentials);

      // Show success message with student ID
      setMessage(`✅ ${response.message} (Student ID: ${response.student_id})`);
    } catch (err) {
      // Show error message from the backend
      const errorMessage =
        err.response?.data?.error || "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>🔑 Student Login</h1>
        <p className="form-subtitle">Enter your credentials to log in</p>

        {/* Show success message */}
        {message && <div className="alert alert-success">{message}</div>}

        {/* Show error message */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input
              id="loginPassword"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
