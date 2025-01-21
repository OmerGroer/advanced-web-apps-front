import axios, { CanceledError } from "axios";

export { CanceledError };

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    authorization:
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzhiODA5NzIxNzRiMDViY2FlYWJmZTYiLCJyYW5kb20iOiIwLjU5ODI5NTk5Mzk4MjY4MjgiLCJpYXQiOjE3Mzc0ODY4ODMsImV4cCI6MTczNzQ5NzY4M30.YPkE2C1lAJHV-dZloMm0XEw-RMsT34UDLduhOzypWFM",
  },
});

//TODO: not here
export const getLoggedUserId = () => "678b80972174b05bcaeabfe6"

export default apiClient;
