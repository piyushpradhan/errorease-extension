import {
  IIssueContextState,
  TIssueReducerActions,
} from "../types/issueContext.types";

export const issueReducer = (
  state: IIssueContextState,
  action: TIssueReducerActions,
): IIssueContextState => {
  const { payload, type }: TIssueReducerActions = action;

  switch (type) {
    case "SELECT_ISSUE":
      return {
        ...state,
        selectedIssue: payload,
        action: "issueDetails",
      };

    case "CLEAR_ISSUE":
      return {
        ...state,
        selectedIssue: "",
        action: "searchIssue",
      };

    case "ACTIVATE_CREATE_ISSUE":
      return {
        ...state,
        action: "createIssue",
      };

    case "CREATE_ISSUE":
      return {
        ...state,
        action: "createIssue",
        issues: [
          {
            id: crypto.randomUUID(),
            title: payload,
            resourceLinks: [
              {
                id: crypto.randomUUID(),
                link: "https://github.com/pacocoursey/cmdk",
              },
              {
                id: crypto.randomUUID(),
                link: "https://github.com/pacocoursey/cmdk",
              },
              {
                id: crypto.randomUUID(),
                link: "https://github.com/pacocoursey/cmdk",
              },
            ],
            labels: ["css", "react"],
            status: "active",
          },
          ...state.issues,
        ],
      };

    default:
      return state;
  }
};
