// ============================================
// Register Page - Student Registration Form
// ============================================
// This page has a form to register a new student.
// It calls POST /api/students/register/ when submitted.
// Fields: first_name, last_name, email, password, major

import { useState } from "react";
import { registerStudent } from "../services/api";
import "./FormPage.css";

function RegisterPage() {
  // ---- State variables ----
  // Each form field has its own state variable
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");

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
      // Build the data object to send to the API
      const studentData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        major: major,
      };

      // Call the register API
      const response = await registerStudent(studentData);

      // Show success message
      setMessage(`✅ ${response.message} (ID: ${response.student_id})`);

      // Clear the form after successful registration
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setMajor("");
    } catch (err) {
      // Show error message from the backend
      // The backend sends errors in err.response.data.error
      const errorMessage =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      // Stop loading regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1>📝 Register Student</h1>
        <p className="form-subtitle">Fill in the details to register a new student</p>

        {/* Show success message */}
        {message && <div className="alert alert-success">{message}</div>}

        {/* Show error message */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Major (optional) */}
          <div className="form-group">
            <label htmlFor="major">Major (Optional)</label>
            <input
              id="major"
              type="text"
              placeholder="e.g. Computer Science"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Register Student"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
