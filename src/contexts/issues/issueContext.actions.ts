import { Issue } from "@/types/models";
import atypes from "../actionTypes";
import {
  IIssueContextState,
  IssueReducerActions,
  UserAction,
} from "./issueContext.types";
import { LabelContextState } from "../label/labelContext.types";

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

export const undoAction = (
  payload: IIssueContextState | LabelContextState,
): IssueReducerActions => ({
  type: atypes.UNDO_ACTION,
  payload,
});

export const setUpdatedResourceLinks = (
  payload: Issue,
): IssueReducerActions => ({
  type: atypes.UPDATE_RES_LINKS,
  payload,
});

export const optimisticallyUpdateResourceLinks = (
  payload: string[],
): IssueReducerActions => ({
  type: atypes.OPTIMISTICALLY_UPDATE_RES_LINKS,
  payload,
});

export const optimisticallyCreateIssue = (
  payload: string,
): IssueReducerActions => ({
  type: atypes.OPTIMISTICALLY_CREATE_ISSUE,
  payload,
});

export const updateCreatedIssue = (payload: Issue): IssueReducerActions => ({
  type: atypes.UPDATE_CREATED_ISSUE,
  payload,
});

export const setUserAction = (payload: UserAction): IssueReducerActions => ({
  type: atypes.SET_USER_ACTION,
  payload,
});

export const updateIssuesInRealtime = (payload: Issue[]): IssueReducerActions => ({
  type: atypes.UPDATE_ISSUES_REALTIME,
  payload
});

export const removeLink = (payload: { issueId: string, linkId: string }): IssueReducerActions => ({
  type: atypes.REMOVE_LINK,
  payload
});
