import { Dispatch } from "react";
import { Issue } from "@/types/models";
import atypes from "@/contexts/actionTypes";

export type IIssueContextState = {
  userAction: "searchIssue" | "createIssue" | "issueDetails";
  issues: Issue[];
  selectedIssue: string;
};

type ActionTypes = typeof atypes;

// TODO: Update the payload type to handle actions
export type IssueReducerActions = {
  type: keyof ActionTypes;
  payload: any;
};

export type IssueContextType = {
  issuesState: IIssueContextState;
  issuesDispatch: Dispatch<IssueReducerActions>;
};
