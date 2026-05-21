// ============================================
// Search Page - Find Student by Email
// ============================================
// This page demonstrates TWO different ways to search for a student:
//   Method 1: GET /api/students/get-by-email/<email>/  (email in URL)
//   Method 2: POST /api/students/get-by-email-body/    (email in body)
// Both methods are shown side-by-side for learning purposes.

import { useState } from "react";
import { getStudentByEmail, searchStudentByEmail } from "../services/api";
import "./SearchPage.css";

function SearchPage() {
  // ---- State for Method 1 (URL parameter) ----
  const [emailUrl, setEmailUrl] = useState("");
  const [resultUrl, setResultUrl] = useState(null);
  const [errorUrl, setErrorUrl] = useState("");
  const [loadingUrl, setLoadingUrl] = useState(false);

  // ---- State for Method 2 (Request body) ----
  const [emailBody, setEmailBody] = useState("");
  const [resultBody, setResultBody] = useState(null);
  const [errorBody, setErrorBody] = useState("");
  const [loadingBody, setLoadingBody] = useState(false);

  // ---- Method 1: Search using URL parameter ----
  const handleSearchByUrl = async (event) => {
    event.preventDefault();
    setResultUrl(null);
    setErrorUrl("");
    setLoadingUrl(true);

    try {
      // Calls GET /api/students/get-by-email/{email}/
      const data = await getStudentByEmail(emailUrl);
      setResultUrl(data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Student not found or server error.";
      setErrorUrl(errorMessage);
    } finally {
      setLoadingUrl(false);
    }
  };

  // ---- Method 2: Search using request body ----
  const handleSearchByBody = async (event) => {
    event.preventDefault();
    setResultBody(null);
    setErrorBody("");
    setLoadingBody(true);

    try {
      // Calls POST /api/students/get-by-email-body/
      const data = await searchStudentByEmail(emailBody);
      setResultBody(data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Student not found or server error.";
      setErrorBody(errorMessage);
    } finally {
      setLoadingBody(false);
    }
  };

  // ---- Helper: Render a student details card ----
  const renderStudentCard = (student) => (
    <div className="student-card">
      <h3>Student Found ✅</h3>
      <div className="student-details">
        {student.id && (
          <p>
            <strong>ID:</strong> {student.id}
          </p>
        )}
        <p>
          <strong>Name:</strong> {student.first_name} {student.last_name}
        </p>
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        <p>
          <strong>Major:</strong> {student.major || "—"}
        </p>
        <p>
          <strong>Enrollment Date:</strong> {student.enrollment_date}
        </p>
      </div>
    </div>
  );

  return (
    <div className="search-page">
      <h1>🔍 Search Student by Email</h1>
      <p className="search-subtitle">
        This page demonstrates two different ways to search — both call the
        backend but use different HTTP methods.
      </p>

      <div className="search-grid">
        {/* ---- Method 1: URL Parameter ---- */}
        <div className="search-method">
          <div className="method-header">
            <h2>Method 1: URL Parameter</h2>
            <code>GET /get-by-email/&lt;email&gt;/</code>
          </div>
          <p className="method-explanation">
            The email is sent as part of the URL. This is the common REST
            approach for fetching a specific resource.
          </p>

          <form onSubmit={handleSearchByUrl}>
            <div className="form-group">
              <label htmlFor="emailUrl">Email Address</label>
              <input
                id="emailUrl"
                type="email"
                placeholder="Enter student email"
                value={emailUrl}
                onChange={(e) => setEmailUrl(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loadingUrl}
            >
              {loadingUrl ? "Searching..." : "Search (URL Method)"}
            </button>
          </form>

          {errorUrl && <div className="alert alert-error">{errorUrl}</div>}
          {resultUrl && renderStudentCard(resultUrl)}
        </div>

        {/* ---- Method 2: Request Body ---- */}
        <div className="search-method">
          <div className="method-header">
            <h2>Method 2: Request Body</h2>
            <code>POST /get-by-email-body/</code>
          </div>
          <p className="method-explanation">
            The email is sent inside the request body as JSON. This is useful
            when you don't want to expose data in the URL.
          </p>

          <form onSubmit={handleSearchByBody}>
            <div className="form-group">
              <label htmlFor="emailBody">Email Address</label>
              <input
                id="emailBody"
                type="email"
                placeholder="Enter student email"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loadingBody}
            >
              {loadingBody ? "Searching..." : "Search (Body Method)"}
            </button>
          </form>

          {errorBody && <div className="alert alert-error">{errorBody}</div>}
          {resultBody && renderStudentCard(resultBody)}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
