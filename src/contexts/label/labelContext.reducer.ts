import atypes from "@/contexts/actionTypes";
import { getLabelsById } from "@/lib/utils";
import { LabelContextState, LabelReducerActions } from "./labelContext.types";

export const labelReducer = (
  state: LabelContextState,
  action: LabelReducerActions,
): LabelContextState => {
  const { payload, type }: LabelReducerActions = action;

  switch (type) {
    case atypes.GET_ALL_LABELS:
      if (payload) {
        const labelsById = getLabelsById(payload);
        return {
          ...state,
          labels: payload,
          labelsById
        };
      }
      return state;
    case atypes.ADD_LABEL_OPTIMISTIC:
      const newLabel = { id: "temp", name: payload.label };
      const updatedLabelsById = state.labelsById;
      updatedLabelsById.set('temp', newLabel);
      return {
        ...state,
        labels: [...state.labels, newLabel],
        labelsById: updatedLabelsById
      }
    case atypes.ADD_LABEL:
      {
        const updatedLabels = state.labels.map(label => {
          if (label.id === "temp") {
            return payload.label;
          }
          return label;
        });
        const updatedLabelsById = state.labelsById;
        updatedLabelsById.set(payload.label.id, payload.label);
        updatedLabelsById.delete("temp");
        return {
          ...state,
          labels: updatedLabels,
          labelsById: updatedLabelsById
        }
      }
    case atypes.UNDO_ACTION:
      return payload;
    default:
      return state;
  }
};
