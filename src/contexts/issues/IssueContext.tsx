import { createContext, ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";

import { issueReducer } from "./issueContext.reducer";
import { IssueContextType, IIssueContextState } from "./issueContext.types";
import { Issue } from "@/types/models";
import { undoAction } from "./issueContext.actions";

const initialState: IIssueContextState = {
  userAction: "searchIssue",
  issues: [],
  issuesById: new Map<string, Issue>(),
  selectedIssue: "",
  activeIssue: null,
};

export const IssueContext = createContext<IssueContextType>({
  issuesState: initialState,
  issuesDispatch: () => { },
});

// To be used later to persist data across tabs
// const loadInitialState = async (state: IIssueContextState): Promise<IIssueContextState> => {
//   return new Promise((resolve) => {
//     chrome.storage.local.get('issueContextState', (result) => {
//       if (result.issueContextState && state.issuesById.get(result.issueContextState)) {
//         resolve({
//           ...state,
//           activeIssue: state.issuesById.get(result.issueContextState) || null,
//         });
//       } else {
//         resolve({
//           userAction: "searchIssue",
//           issues: [],
//           issuesById: new Map<string, Issue>(),
//           selectedIssue: "",
//           activeIssue: null,
//         });
//       }
//     });
//   });
// };


export default function IssueProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(issueReducer, initialState);

  // To be used later to persist data across tabs
  // const saveState = useCallback((state: IIssueContextState) => {
  //   chrome.storage.local.set({ issueContextState: state.activeIssue?.id || null });
  // }, []);

  // useEffect(() => {
  //   loadInitialState(state).then((result) => {
  //     dispatch(undoAction(result));
  //   });
  // }, []);
  //
  // useEffect(() => {
  //   saveState(state);
  // }, [state]);

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
