import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://fakestoreapi.com' //your API base URL
  // You can add default headers or other config here
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Example: Add auth token if available
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    // You can add more custom logic here
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // You can process the response here if needed
    return response;
  },
  (error) => {
    // Handle errors globally
    // Example: Log out user on 401 Unauthorized
    // if (error.response && error.response.status === 401) {
    //   // Handle unauthorized error
    // }
    return Promise.reject(error);
  }
);

/**
 * Extracts a user-friendly error message from an Axios error or any error thrown during an API call.
 */
export function getAxiosErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with a status code outside 2xx
      const data = error.response.data;
      if (typeof data === 'string') return data;
      if (data && typeof data === 'object' && data !== null && 'message' in data && typeof (data as { message?: unknown }).message === 'string') {
        return (data as { message: string }).message;
      }
      return `Request failed with status ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      return 'No response received from server.';
    } else {
      // Something happened in setting up the request
      return error.message;
    }
  }
  // Not an Axios error
  if (error instanceof Error) return error.message;
  return 'An unknown error occurred.';
}

export default api;