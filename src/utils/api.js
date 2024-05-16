import axios from "axios";

// const baseURL = "http://localhost:5000/api";
// const baseURL = "http://13.60.49.46:5000/api";
const baseURL = "https://imbs-backend.onrender.com/api";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle 401 error (e.g., redirect to login)
      console.log("Unauthorized. Redirecting to login page.");
      // Redirect to the login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
