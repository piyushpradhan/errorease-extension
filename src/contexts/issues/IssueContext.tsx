import { createContext, ReactNode, useMemo, useReducer } from "react";

import { issueReducer } from "./issueContext.reducer";
import { IssueContextType, IIssueContextState } from "./issueContext.types";
import { Issue } from "@/types/models";

const initialState: IIssueContextState = {
  userAction: "searchIssue",
  issues: [],
  issuesById: new Map<string, Issue>(),
  selectedIssue: "",
};

export const IssueContext = createContext<IssueContextType>({
  issuesState: initialState,
  issuesDispatch: () => { },
});

export default function IssueProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(issueReducer, initialState);

  const issueContextValues = useMemo(
    () => ({ issuesState: state, issuesDispatch: dispatch }),
    [state],
  );

  return (
    <IssueContext.Provider value={issueContextValues}>
      {children}
    </IssueContext.Provider>
  );
}