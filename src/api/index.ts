import { BACKEND_URL } from "@/lib/utils";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL
});
