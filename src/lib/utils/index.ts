import { IssuesById } from "@/contexts/issues/issueContext.types";
import { Issue } from "@/types/models";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// TODO: Change this to the hosted backend url
export const BACKEND_URL = "http://localhost:3000";

export const getIssuesById = (issues: Issue[]): IssuesById => {
  const issuesById = new Map<string, Issue>();
  issues.map(issue => {
    issuesById.set(issue.id, issue);
  });

  return issuesById;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
