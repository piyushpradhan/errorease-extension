import { BACKEND_URL } from "@/lib/utils";
import axios from "axios";

export async function fetchIssues() {
  const response = await axios.get(`${BACKEND_URL}/api/issues`);
  return response.data;
}
