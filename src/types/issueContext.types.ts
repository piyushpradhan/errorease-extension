import { Dispatch } from "react";

export interface IIssueContextState {
  action: "searchIssue" | "createIssue" | "issueDetails";
  issues: {
    id: `${string}-${string}-${string}-${string}-${string}`;
    title: string;
    resourceLinks: {
      id: `${string}-${string}-${string}-${string}-${string}`;
      link: string;
    }[];
    labels: string[];
    status: string;
  }[];
  selectedIssue: string;
}

export interface ISelectIssueAction {
  type: "SELECT_ISSUE";
  payload: string;
}

export interface IClearIssueAction {
  type: "CLEAR_ISSUE";
  payload: null;
}

export interface IActivateCreateIssueAction {
  type: "ACTIVATE_CREATE_ISSUE";
  payload: null;
}

export interface ICreateIssueAction {
  type: "CREATE_ISSUE";
  payload: string;
}

export type TIssueReducerActions =
  | ISelectIssueAction
  | IClearIssueAction
  | IActivateCreateIssueAction
  | ICreateIssueAction;

export interface IIssueContext {
  issuesState: IIssueContextState;
  issuesDispatch: Dispatch<TIssueReducerActions>;
}
