import axios from "axios";
// Local dev talks to the local Spring Boot server; production builds use the deployed API.
// Override either with REACT_APP_API_URL.
const DEPLOYED = "https://ecommerce-server-production-6592.up.railway.app";
const LOCALHOST = "http://localhost:5454";

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || (process.env.NODE_ENV === "development" ? LOCALHOST : DEPLOYED);

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Read the token on every request so it is picked up right after login/logout
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
