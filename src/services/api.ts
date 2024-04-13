import axios from "axios";

export const api = axios.create({
  baseURL: "https://novosigeve-production.up.railway.app",
  // baseURL: "http://localhost:8081",
});
