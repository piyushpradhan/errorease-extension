import { Issue } from "@/types/models";
import atypes from "../actionTypes";
import { IssueReducerActions } from "./issueContext.types";

export const populateAllIssues = (payload: Issue[]): IssueReducerActions => ({
  type: atypes.GET_ALL_ISSUES,
  payload,
});
