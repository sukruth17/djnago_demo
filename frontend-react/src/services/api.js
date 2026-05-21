// ============================================
// API Service - All backend API calls go here
// ============================================
// This file uses Axios to make HTTP requests to the Django backend.
// All API functions are defined here so we can reuse them in any page.

import axios from "axios";

// ============================================
// 🔧 BASE URL CONFIGURATION
// ============================================
// Change this URL to match your Django backend server address.
// By default, Django runs on http://localhost:8000
// The "/api/students/" part comes from your Django urls.py
const BASE_URL = "http://localhost:8000/api/students/";

// Create an Axios instance with the base URL
// This way, we don't have to type the full URL every time
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================
// API FUNCTION 1: Register a new student
// ============================================
// Sends: POST /api/students/register/
// Body: { first_name, last_name, email, password, major }
// Returns: { message, student_id } on success
export const registerStudent = async (studentData) => {
  const response = await api.post("register/", studentData);
  return response.data;
};

// ============================================
// API FUNCTION 2: Login a student
// ============================================
// Sends: POST /api/students/login/
// Body: { email, password }
// Returns: { message, student_id } on success
export const loginStudent = async (credentials) => {
  const response = await api.post("login/", credentials);
  return response.data;
};

// ============================================
// API FUNCTION 3: Get all students
// ============================================
// Sends: GET /api/students/get-all/
// Returns: Array of student objects
export const getAllStudents = async () => {
  const response = await api.get("get-all/");
  return response.data;
};

// ============================================
// API FUNCTION 4: Get student by email (URL parameter)
// ============================================
// Sends: GET /api/students/get-by-email/{email}/
// The email is passed directly in the URL
// Returns: { first_name, last_name, email, major, enrollment_date }
export const getStudentByEmail = async (email) => {
  const response = await api.get(`get-by-email/${email}/`);
  return response.data;
};

// ============================================
// API FUNCTION 5: Get student by email (request body)
// ============================================
// Sends: POST /api/students/get-by-email-body/
// Body: { email }
// Returns: { id, first_name, last_name, email, major, enrollment_date }
export const searchStudentByEmail = async (email) => {
  const response = await api.post("get-by-email-body/", { email });
  return response.data;
};
