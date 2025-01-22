import axios, { CanceledError } from "axios";

export { CanceledError };

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    authorization:
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzhiODA5NzIxNzRiMDViY2FlYWJmZTYiLCJyYW5kb20iOiIwLjA1MDg5MzY3NDgzMjkxOTQiLCJpYXQiOjE3Mzc1NDQ1MjgsImV4cCI6MTczNzU1NTMyOH0.9n0NIxqntD5BrD05ZDNfgRy0wbE1isAHZ8C_CFb41Zw",
  },
});

//TODO: not here
export const getLoggedUserId = () => "678b80972174b05bcaeabfe6"

export default apiClient;
