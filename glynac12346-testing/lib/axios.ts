import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_URL || ""

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// Add a request interceptor for CSRF token
api.interceptors.request.use(
  async (config) => {
    // Get CSRF token from cookie if it exists
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1]

    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error

    // Handle session expiration
    if (response?.status === 401) {
      window.location.href = "/signin"
    }

    return Promise.reject(error)
  },
)

