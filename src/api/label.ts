import { BACKEND_URL } from "@/lib/utils";
import { axiosInstance } from ".";

export async function fetchAllLabels(token: string) {
  try {
    const response = await axiosInstance.get(`${BACKEND_URL}/api/labels`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    console.error("Failed to fetch all labels: ", err);
    return null;
  }
}

export async function removeLabel(issueId: string, labelId: string) {
  try {
    const response = await axiosInstance.post(`${BACKEND_URL}/api/labels/remove`, {
      issueId,
      labelId
    });

    return response.data;
  } catch (err) {
    console.error("Failed to remove label: ", err);
    return null;
  }
}
