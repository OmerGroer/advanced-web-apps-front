import axios, { CanceledError } from "axios";

export { CanceledError };

export interface Page<T> {
  min: string;
  max: string;
  data: T[];
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["authorization"] = `JWT ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
