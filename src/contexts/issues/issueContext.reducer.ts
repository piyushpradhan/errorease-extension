import atypes from "@/contexts/actionTypes";
import { IIssueContextState, IssueReducerActions } from "./issueContext.types";

export const issueReducer = (
  state: IIssueContextState,
  action: IssueReducerActions,
): IIssueContextState => {
  const { payload, type }: IssueReducerActions = action;

  switch (type) {
    case atypes.GET_ALL_ISSUES:
      if (payload) {
        return {
          ...state,
          issues: payload,
        };
      }
      return state;
    default:
      return state;
  }
};
