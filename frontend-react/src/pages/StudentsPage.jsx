// ============================================
// Students Page - View All Students
// ============================================
// This page fetches and displays all students in a table.
// It calls GET /api/students/get-all/ when the page loads.
// We use useEffect to fetch data when the component first renders.

import { useState, useEffect } from "react";
import { getAllStudents } from "../services/api";
import "./StudentsPage.css";

function StudentsPage() {
  // ---- State variables ----
  // students: array of student objects from the API
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---- Fetch all students when page loads ----
  // useEffect runs ONCE when the component first renders (because of [])
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch students from the API
  const fetchStudents = async () => {
    setLoading(true);
    setError("");

    try {
      // Call the API to get all students
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      setError("Failed to load students. Make sure the backend is running.");
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="students-page">
      <div className="students-header">
        <h1>📋 All Students</h1>
        <p>
          Showing {students.length} student{students.length !== 1 ? "s" : ""}
        </p>
        {/* Refresh button to re-fetch data */}
        <button className="btn btn-secondary" onClick={fetchStudents}>
          🔄 Refresh
        </button>
      </div>

      {/* Show loading state */}
      {loading && <div className="loading-message">Loading students...</div>}

      {/* Show error state */}
      {error && <div className="alert alert-error">{error}</div>}

      {/* Show the table if we have students */}
      {!loading && !error && students.length > 0 && (
        <div className="table-wrapper">
          <table className="students-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Major</th>
                <th>Enrollment Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through each student and create a table row */}
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.email}</td>
                  <td>{student.major || "—"}</td>
                  <td>{student.enrollment_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show empty state if no students */}
      {!loading && !error && students.length === 0 && (
        <div className="empty-message">
          No students found. Try registering one first!
        </div>
      )}
    </div>
  );
}

export default StudentsPage;
