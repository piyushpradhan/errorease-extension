import { BACKEND_URL } from "@/lib/utils";
import axios from "axios";

export async function updateLinks(issueId: string, links: string[]) {
  const response = await axios.post(`${BACKEND_URL}/api/links/update`, {
    issueId,
    links,
  });

  return response.data;
}
