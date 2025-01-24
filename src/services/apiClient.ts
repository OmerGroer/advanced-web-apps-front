import axios, { CanceledError } from "axios";

export { CanceledError };

export interface Page<T> {
  min: string;
  max: string;
  data: T[]
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    authorization:
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzhiODA5NzIxNzRiMDViY2FlYWJmZTYiLCJyYW5kb20iOiIwLjg4NzI2Mzc4NzMzOTQ0MDIiLCJpYXQiOjE3Mzc2NjAyNjcsImV4cCI6MTczNzY3MTA2N30.zY8A34rzVMv9vKr1XNFgCyTjJgfgfLGRzstwbd-wAX0",
  },
});

export default apiClient;
