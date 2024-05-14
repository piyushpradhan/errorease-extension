import { createContext, ReactNode, useMemo, useReducer } from "react";

import { localIssues } from "../components/CommandPalette/commandPalette.data";
import { IIssueContext, IIssueContextState } from "../types/issueContext.types";

import { issueReducer } from "./issueContext.reducer";

const initialState: IIssueContextState = {
  action: "searchIssue",
  issues: localIssues,
  selectedIssue: "",
};

export const IssueContext = createContext<IIssueContext>({
  issuesState: initialState,
  issuesDispatch: () => {},
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
