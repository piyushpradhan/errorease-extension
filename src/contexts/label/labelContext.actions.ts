import { Label } from "@/types/models";
import atypes from "../actionTypes";
import {
  LabelReducerActions,
} from "./labelContext.types";

export const populateAllLabels = (payload: Label[]): LabelReducerActions => ({
  type: atypes.GET_ALL_LABELS,
  payload,
});

export const addLabelOptimistic = (issueId: string, label: string): LabelReducerActions => ({
  type: atypes.ADD_LABEL_OPTIMISTIC,
  payload: {
    issueId,
    label
  }
});

export const addLabel = (issueId: string, label: Pick<Label, "name" | "id">): LabelReducerActions => ({
  type: atypes.ADD_LABEL,
  payload: {
    issueId,
    label
  }
});

export const removeLabelOptimistic = (issueId: string, labelId: string) => ({
  type: atypes.REMOVE_LABEL_OPTIMISTIC,
  payload: {
    issueId,
    labelId
  }
});
