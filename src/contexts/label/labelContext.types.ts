import { Dispatch } from "react";
import { Label } from "@/types/models";
import atypes from "@/contexts/actionTypes";

export type LabelsById = Map<string, Label | Pick<Label, "name" | "id">>;

export type LabelContextState = {
  labels: Array<Label | Pick<Label, "name" | "id">>;
  labelsById: LabelsById;
};

type ActionTypes = typeof atypes;

// TODO: Update the payload type to handle actions
export type LabelReducerActions = {
  type: keyof ActionTypes;
  payload: any;
};

export type LabelContextType = {
  labelState: LabelContextState;
  labelDispatch: Dispatch<LabelReducerActions>;
};
