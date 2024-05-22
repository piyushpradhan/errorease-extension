import atypes from "@/contexts/actionTypes";
import { IIssueContextState, IssueReducerActions } from "./issueContext.types";
import { getIssuesById } from "@/lib/utils";

export const issueReducer = (
  state: IIssueContextState,
  action: IssueReducerActions,
): IIssueContextState => {
  const { payload, type }: IssueReducerActions = action;

  switch (type) {
    case atypes.GET_ALL_ISSUES:
      if (payload) {
        const issuesById = getIssuesById(payload);
        return {
          ...state,
          issues: payload,
          issuesById
        };
      }
      return state;
    case atypes.SELECT_ISSUE:
      if (payload) {
        return {
          ...state,
          selectedIssue: payload,
          userAction: "issueDetails"
        }
      }
      return state;
    case atypes.CLEAR_ISSUE:
      return {
        ...state,
        userAction: "searchIssue"
      }
    case atypes.ACTIVATE_CREATE_ISSUE:
      return {
        ...state,
        userAction: "createIssue"
      }
    default:
      return state;
  }
};
