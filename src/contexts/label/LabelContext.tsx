import { createContext, ReactNode, useMemo, useReducer } from "react";

import { labelReducer } from "./labelContext.reducer";
import { LabelContextType, LabelContextState } from "./labelContext.types";
import { Label } from "@/types/models";

const initialState: LabelContextState = {
  labels: [],
  labelsById: new Map<string, Label>(),
};

export const LabelContext = createContext<LabelContextType>({
  labelState: initialState,
  labelDispatch: () => { },
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


export default function LabelProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(labelReducer, initialState);

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

  const labelContextValues = useMemo(
    () => ({ labelState: state, labelDispatch: dispatch }),
    [state],
  );

  return (
    <LabelContext.Provider value={labelContextValues}>
      {children}
    </LabelContext.Provider>
  );
}
