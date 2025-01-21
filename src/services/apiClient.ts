import axios, { CanceledError } from "axios";

export { CanceledError };

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    authorization:
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzhiODA5NzIxNzRiMDViY2FlYWJmZTYiLCJyYW5kb20iOiIwLjE5OTA4NjY5MzMzNzkzMzM4IiwiaWF0IjoxNzM3NDc2MDUzLCJleHAiOjE3Mzc0ODY4NTN9.NVwqp2OeX-UeHtDxtknULJ2g4n5nj8yhiU_iAGxUktU",
  },
});

export default apiClient;
