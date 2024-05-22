import { Issue } from "@/types/models";
import atypes from "../actionTypes";
import { IIssueContextState, IssueReducerActions } from "./issueContext.types";

export const populateAllIssues = (payload: Issue[]): IssueReducerActions => ({
  type: atypes.GET_ALL_ISSUES,
  payload,
});

export const setSelectedIssue = (payload: string): IssueReducerActions => ({
  type: atypes.SELECT_ISSUE,
  payload,
});

export const activateIssue = (payload: string): IssueReducerActions => ({
  type: atypes.ACTIVATE_ISSUE,
  payload,
});

export const deactivateIssue = (payload: string): IssueReducerActions => ({
  type: atypes.DEACTIVATE_ISSUE,
  payload,
});

export const activateIssueView = (): IssueReducerActions => ({
  type: atypes.ACTIVATE_ISSUE_VIEW,
  payload: {},
});

export const activateCreateView = (): IssueReducerActions => ({
  type: atypes.ACTIVATE_CREATE_ISSUE,
  payload: {},
});

export const clearIssue = (): IssueReducerActions => ({
  type: atypes.CLEAR_ISSUE,
  payload: {},
});

export const undoAction = (payload: IIssueContextState): IssueReducerActions => ({
  type: atypes.UNDO_ACTION,
  payload
});
