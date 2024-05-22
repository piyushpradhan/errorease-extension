export type Label = {
  id: string;
  name: string;
  owner: User;
  issue: Issue[];
};

export type User = {
  id: string;
  displayName: string;
  email: string;
  uid: string;
  username: string;
  issues: Issue[];
  labels: Label[];
};

export type Issue = {
  id: string;
  description?: string;
  is_active: boolean;
  issue_map: string;
  title: string;
  created_at: string;
  updated_at: string;
  seqNo: number;
  status: "Closed" | "Open";
  labels: Pick<Label, "name" | "id">[];
};
