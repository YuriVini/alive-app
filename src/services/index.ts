import axios from "axios";
import { API_STOCK } from "./consts";

export const adgrowthAPI = axios.create({
  baseURL: API_STOCK,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
