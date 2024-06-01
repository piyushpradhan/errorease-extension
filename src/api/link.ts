import { BACKEND_URL } from "@/lib/utils";
import { axiosInstance } from ".";

export async function updateLinks(issueId: string, links: string[]) {
  const response = await axiosInstance.post(`${BACKEND_URL}/api/links/update`, {
    issueId,
    links,
  });

  return response.data;
}

export async function removeLink(issueId: string, linkId: string) {
  const response = await axiosInstance.delete(`${BACKEND_URL}/api/links/remove?issue=${issueId}&link=${linkId}`);

  return response.data;
}
