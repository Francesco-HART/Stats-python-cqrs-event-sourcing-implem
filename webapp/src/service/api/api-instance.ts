import axios from "axios";

export const API_URL = "http://localhost:8080";

export const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});
