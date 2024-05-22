import atypes from "@/contexts/actionTypes";
import { IIssueContextState, IssueReducerActions } from "./issueContext.types";
import { deactivateOtherIssues, getIssuesById } from "@/lib/utils";
import { Issue } from "@/types/models";

export const issueReducer = (
  state: IIssueContextState,
  action: IssueReducerActions,
): IIssueContextState => {
  const { payload, type }: IssueReducerActions = action;

  switch (type) {
    case atypes.DEACTIVATE_ISSUE:
      const deactivatedIssue = state.issuesById.get(payload);
      if (payload && deactivatedIssue) {
        const updatedIssues = state.issues.map((issue) => {
          if (issue.id === payload) {
            issue.is_active = false;
            deactivatedIssue.is_active = false;
          }
          return issue;
        });

        const updatedIssuesById = state.issuesById;
        updatedIssuesById.set(payload, deactivatedIssue);

        return {
          ...state,
          issues: updatedIssues,
          issuesById: updatedIssuesById,
        };
      }
      return state;
    case atypes.ACTIVATE_ISSUE:
      const activatedIssue = state.issuesById.get(payload);
      if (payload && activatedIssue) {
        const updatedIssues = state.issues.map((issue) => {
          if (issue.id === payload) {
            issue.is_active = true;
            activatedIssue.is_active = true;
          }
          return issue;
        });

        const updatedIssuesById = state.issuesById;
        updatedIssuesById.set(payload, activatedIssue);

        // Deactivate the other issues so that there's only one 
        // active issue at a time
        deactivateOtherIssues(payload, updatedIssues, updatedIssuesById);

        return {
          ...state,
          issues: updatedIssues,
          issuesById: updatedIssuesById,
        };
      }
      return state;
    case atypes.GET_ALL_ISSUES:
      if (payload) {
        const issuesById = getIssuesById(payload);
        return {
          ...state,
          issues: payload,
          issuesById,
        };
      }
      return state;
    case atypes.SELECT_ISSUE:
      if (payload) {
        return {
          ...state,
          selectedIssue: payload,
          userAction: "issueDetails",
        };
      }
      return state;
    case atypes.CLEAR_ISSUE:
      return {
        ...state,
        userAction: "searchIssue",
      };
    case atypes.ACTIVATE_CREATE_ISSUE:
      return {
        ...state,
        userAction: "createIssue",
      };
    case atypes.ACTIVATE_ISSUE_VIEW:
      return {
        ...state,
        userAction: "activateIssue",
      };
    case atypes.UNDO_ACTION:
      return payload;
    default:
      return state;
  }
};
