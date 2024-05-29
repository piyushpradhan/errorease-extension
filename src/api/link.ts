import { BACKEND_URL } from "@/lib/utils";
import { axiosInstance } from ".";

export async function updateLinks(issueId: string, links: string[]) {
  const response = await axiosInstance.post(`${BACKEND_URL}/api/links/update`, {
    issueId,
    links,
  });

  return response.data;
}
