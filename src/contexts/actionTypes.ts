const GET_ALL_ISSUES = "GET_ALL_ISSUES";
const GET_ISSUE_DETAILS = "GET_ISSUE_DETAILS";
const SELECT_ISSUE = "SELECT_ISSUE";
const CLEAR_ISSUE = "CLEAR_ISSUE";
const ACTIVATE_CREATE_ISSUE = "ACTIVATE_CREATE_ISSUE";
const CREATE_ISSUE = "CREATE_ISSUE";
const ACTIVATE_ISSUE = "ACTIVATE_ISSUE";
const DEACTIVATE_ISSUE = "DEACTIVATE_ISSUE";
const ACTIVATE_ISSUE_VIEW = "ACTIVATE_ISSUE_VIEW";
const UNDO_ACTION = "UNDO_ACTION";

export default {
  GET_ALL_ISSUES,
  GET_ISSUE_DETAILS,
  SELECT_ISSUE,
  CLEAR_ISSUE,
  ACTIVATE_CREATE_ISSUE,
  CREATE_ISSUE,
  ACTIVATE_ISSUE,
  DEACTIVATE_ISSUE,
  ACTIVATE_ISSUE_VIEW,
  UNDO_ACTION
} as const;
