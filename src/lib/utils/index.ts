import { IssuesById } from "@/contexts/issues/issueContext.types";
import { LabelsById } from "@/contexts/label/labelContext.types";
import { Issue, Label } from "@/types/models";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// TODO: Change this to the hosted backend url
//export const BACKEND_URL = "https://errorease-backend.onrender.com";
export const BACKEND_URL = "http://localhost:3000";

export const getIssuesById = (
  issues: Issue[],
): { issuesById: IssuesById; activeIssue: Issue | null } => {
  const issuesById = new Map<string, Issue>();
  let activeIssue = null;
  issues.map((issue) => {
    if (issue.is_active) {
      activeIssue = issue;
    }
    issuesById.set(issue.id, issue);
  });

  return { issuesById, activeIssue };
};

export const getLabelsById = (
  labels: Label[]
): LabelsById => {
  const labelsById = new Map<string, Label>();
  labels.map((label) => {
    labelsById.set(label.id, label);
  });

  return labelsById;
}

export const deactivateOtherIssues = (
  issueId: string,
  issues: Issue[],
  issuesById: IssuesById,
) => {
  // Update the issues in the Map
  issuesById.forEach((issue, id) => {
    if (id !== issueId) {
      issue.is_active = false;
    }
  });

  // Update the issues in the array
  issues.forEach((issue) => {
    if (issue.id !== issueId) {
      issue.is_active = false;
    }
  });
};

export const undoDeactivateIssues = (
  issueId: string,
  issues: Issue[],
  issuesById: IssuesById,
) => {
  // Update the issues in the Map
  issuesById.forEach((issue, id) => {
    if (id === issueId) {
      issue.is_active = false;
    }
  });

  // Update the issues in the array
  issues.forEach((issue) => {
    if (issue.id === issueId) {
      issue.is_active = false;
    }
  });
};

export const reorderActiveIssue = (issues: Issue[]) => {
  let reordered = issues;
  issues.forEach((issue, index) => {
    if (issue.is_active) {
      const temp = issues[0];
      reordered[0] = issue;
      reordered[index] = temp;
    }
  })

  return reordered;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
