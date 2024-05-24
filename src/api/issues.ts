import { BACKEND_URL } from "@/lib/utils";
import axios from "axios";

export async function fetchIssues() {
  const response = await axios.get(`${BACKEND_URL}/api/issues`);
  return response.data;
}

export async function activateIssue(issueId: string) {
  const response = await axios.post(`${BACKEND_URL}/api/issues/activate`, {
    id: issueId,
    isActive: true,
  });
  return response.data;
}

export async function deactivateIssue(issueId: string) {
  const response = await axios.post(`${BACKEND_URL}/api/issues/activate`, {
    id: issueId,
    isActive: false,
  });
  return response.data;
}

export async function createIssue(title: string) {
  const response = await axios.post(`${BACKEND_URL}/api/issues/create`, {
    title,
  });
  return response.data;
}
