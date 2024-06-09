import { BACKEND_URL } from "@/lib/utils";
import { axiosInstance } from "@/api";
import { Issue } from "@/types/models";

export async function fetchIssues() {
  const response = await axiosInstance.get(`${BACKEND_URL}/api/issues`);
  return response.data;
}

export async function activateIssue(issueId: string) {
  const response = await axiosInstance.post(`${BACKEND_URL}/api/issues/activate`, {
    id: issueId,
    isActive: true,
  });
  return response.data;
}

export async function deactivateIssue(issueId: string) {
  const response = await axiosInstance.post(`${BACKEND_URL}/api/issues/activate`, {
    id: issueId,
    isActive: false,
  });
  return response.data;
}

export async function createIssue(title: string) {
  try {
    const response = await axiosInstance.post(`${BACKEND_URL}/api/issues/create`, {
      title,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return { data: null };
  }
}

export async function updateIssueLabels(issueId: string, labels: string[]): Promise<{ data: Issue | null }> {
  try {
    const response = await axiosInstance.post(`${BACKEND_URL}/api/issues/update`, {
      id: issueId,
      labels
    });

    return response.data;
  } catch (err) {
    console.error(err);
    return { data: null };
  }
}
