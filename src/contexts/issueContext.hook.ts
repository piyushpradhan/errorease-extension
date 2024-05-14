import { useContext } from "react";

import { IssueContext } from "./IssueContext";

export default function useIssueContext() {
  return useContext(IssueContext);
}
