import { useContext } from "react";

import { LabelContext } from "./LabelContext";

export default function useLabelContext() {
  return useContext(LabelContext);
}
