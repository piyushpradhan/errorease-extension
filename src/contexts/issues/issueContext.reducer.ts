import atypes from "@/contexts/actionTypes";
import { IIssueContextState, IssueReducerActions } from "./issueContext.types";
import { deactivateOtherIssues, getIssuesById, reorderActiveIssue } from "@/lib/utils";
import { Issue, Link } from "@/types/models";
import * as R from "ramda";

export const issueReducer = (
  state: IIssueContextState,
  action: IssueReducerActions,
): IIssueContextState => {
  const { payload, type }: IssueReducerActions = action;

  switch (type) {
    case atypes.UPDATE_ISSUES_REALTIME:
      const { issuesById: byId, activeIssue } = getIssuesById(payload);

      const reorderedIssues = reorderActiveIssue(payload || []);

      return {
        ...state,
        issues: reorderedIssues,
        issuesById: byId,
        activeIssue
      };
    case atypes.SET_USER_ACTION:
      return {
        ...state,
        userAction: payload,
      };
    case atypes.DEACTIVATE_ISSUE:
      const deactivatedIssue = state.issuesById.get(payload);
      if (payload && deactivatedIssue) {
        const updatedIssues = state.issues.map((issue) => {
          if (issue.id === payload) {
            issue.is_active = false;
            deactivatedIssue.is_active = false;
          }
          return issue;
        });

        const updatedIssuesById = state.issuesById;
        updatedIssuesById.set(payload, deactivatedIssue);

        return {
          ...state,
          issues: updatedIssues,
          issuesById: updatedIssuesById,
          activeIssue: null,
        };
      }
      return state;
    case atypes.ACTIVATE_ISSUE:
      const activatedIssue = state.issuesById.get(payload);
      if (payload && activatedIssue) {
        let updatedIssues = state.issues.map((issue) => {
          if (issue.id === payload) {
            issue.is_active = true;
            activatedIssue.is_active = true;
          }
          return issue;
        });

        updatedIssues = reorderActiveIssue(updatedIssues);

        const updatedIssuesById = state.issuesById;
        updatedIssuesById.set(payload, activatedIssue);

        // Deactivate the other issues so that there's only one
        // active issue at a time
        deactivateOtherIssues(payload, updatedIssues, updatedIssuesById);

        return {
          ...state,
          issues: updatedIssues,
          issuesById: updatedIssuesById,
          activeIssue: {
            ...activatedIssue,
            is_active: true,
          },
        };
      }
      return state;
    case atypes.GET_ALL_ISSUES:
      if (payload) {
        const { issuesById, activeIssue } = getIssuesById(payload);
        return {
          ...state,
          issues: reorderActiveIssue(payload),
          issuesById,
          activeIssue,
        };
      }
      return state;
    case atypes.SELECT_ISSUE:
      if (payload) {
        return {
          ...state,
          selectedIssue: payload,
          userAction: "issueDetails",
        };
      }
      return state;
    case atypes.CLEAR_ISSUE:
      return {
        ...state,
        userAction: "searchIssue",
      };
    case atypes.ACTIVATE_CREATE_ISSUE:
      return {
        ...state,
        userAction: "createIssue",
      };
    case atypes.ACTIVATE_ISSUE_VIEW:
      return {
        ...state,
        userAction: "activateIssue",
      };
    case atypes.UNDO_ACTION:
      return payload;
    case atypes.OPTIMISTICALLY_UPDATE_RES_LINKS:
      const links: string[] = payload;
      if (state.activeIssue) {
        const updatedIssue = state.activeIssue;

        const formattedLinks = (links ?? []).map((link, index) => ({
          id: `temp-${index}`,
          url: link,
          issue: state.activeIssue,
        }));

        const updatedLinks: Link[] = [...(state.activeIssue?.links || [])];

        const existingLinkUrls = (state.activeIssue?.links || []).map(
          (link) => link.url,
        );

        formattedLinks.forEach((link) => {
          if (
            !existingLinkUrls.includes(link.url) &&
            !link.url.startsWith("chrome://") &&
            link.url.trim().length > 0
          ) {
            // @ts-ignore - state.activeIssue can't be null here
            updatedLinks.push(link);
          }
        });

        updatedIssue.links = R.uniq(updatedLinks);

        const updatedIssuesById = state.issuesById;
        updatedIssuesById.set(state.activeIssue.id, updatedIssue);

        const updatedIssues = state.issues;
        updatedIssues.map((issue) => {
          if (issue.id === state.activeIssue?.id) {
            return updatedIssue;
          }
          return issue;
        });

        return {
          ...state,
          activeIssue: updatedIssue,
          issuesById: updatedIssuesById,
          issues: reorderActiveIssue(updatedIssues),
        };
      }
      return state;
    case atypes.UPDATE_RES_LINKS:
      const updatedIssue = payload as Issue;
      const updatedIssuesById = state.issuesById;
      const updatedIssues = state.issues.map((issue) => {
        if (issue.id === updatedIssue.id) {
          return updatedIssue;
        }
        return issue;
      });
      updatedIssuesById.set(updatedIssue.id, updatedIssue);

      return {
        ...state,
        issues: reorderActiveIssue(updatedIssues),
        issuesById: updatedIssuesById,
        activeIssue: updatedIssue,
      };
    case atypes.OPTIMISTICALLY_CREATE_ISSUE:
      const temporaryIssue: Issue = {
        id: "temp-issue-id",
        seqNo: -1,
        title: payload,
        is_active: false,
        status: "Open",
        issue_map: "",
        created_at: Date.now().toLocaleString(),
        updated_at: Date.now().toLocaleString(),
        labels: [],
        links: [],
      };

      const issuesById = state.issuesById;
      issuesById.set("temp-issue-id", temporaryIssue);

      return {
        ...state,
        userAction: "searchIssue",
        issuesById,
        issues: reorderActiveIssue([...(state.issues || []), temporaryIssue]),
      };
    case atypes.UPDATE_CREATED_ISSUE:
      const createdIssue = payload as Issue;

      const newIssuesById = state.issuesById;
      newIssuesById.set(createdIssue.id, createdIssue);

      const newIssues = [...state.issues, createdIssue];
      const reordered = reorderActiveIssue(newIssues);

      console.log({ newIssues, reordered, newIssuesById });

      return {
        ...state,
        issuesById: newIssuesById,
        issues: reordered,
      };
    case atypes.REMOVE_LINK: {
      const updatedIssueDetails = state.issuesById;
      let updatedIssue = state.issuesById.get(payload.issueId);
      if (updatedIssue) {
        const updatedLinks: Link[] = (updatedIssue?.links ?? []).filter(link => link.id !== payload.linkId);
        updatedIssue = {
          ...updatedIssue,
          links: [...(updatedLinks ?? [])]
        };
        updatedIssueDetails.set(payload.issueId, updatedIssue);
      }

      return {
        ...state,
        issuesById: updatedIssueDetails
      }
    }

    case atypes.ADD_LABEL_OPTIMISTIC:
      {
        const selectedIssue = state.issuesById.get(payload.issueId);
        if (selectedIssue) {
          selectedIssue.labels = [...selectedIssue.labels, { id: "temp", "name": payload.label }]
          const updatedIssues = state.issues.map(issue => {
            return selectedIssue.id === issue.id ? selectedIssue : issue;
          });
          const updatedIssuesById = state.issuesById;
          updatedIssuesById.set(selectedIssue.id, selectedIssue);

          return {
            ...state,
            issues: updatedIssues,
            issuesById: updatedIssuesById
          }
        }
        return state;
      }
    case atypes.ADD_LABEL:
      {
        const selectedIssue = state.issuesById.get(payload.issueId);
        if (selectedIssue) {
          selectedIssue.labels = selectedIssue.labels.map(label => {
            if (label.id === "temp") {
              return payload.label;
            }
            return label;
          });

          const updatedIssues = state.issues.map(issue => {
            return selectedIssue.id === issue.id ? selectedIssue : issue;
          });
          const updatedIssuesById = state.issuesById;
          updatedIssuesById.set(selectedIssue.id, selectedIssue);

          return {
            ...state,
            issues: updatedIssues,
            issuesById: updatedIssuesById
          }
        }
        return state;
      }
    case atypes.REMOVE_LABEL_OPTIMISTIC:
      {
        const selectedIssue = state.issuesById.get(payload.issueId);
        if (selectedIssue) {
          selectedIssue.labels = selectedIssue.labels.filter(label => label.id !== payload.labelId);
          const updatedIssues = state.issues.map(issue => {
            return selectedIssue.id === issue.id ? selectedIssue : issue
          });
          const updatedIssuesById = state.issuesById;
          updatedIssuesById.set(selectedIssue.id, selectedIssue);

          return {
            ...state,
            issues: updatedIssues,
            issuesById: updatedIssuesById
          }
        }
        return state;
      }
    case atypes.REMOVE_LABEL:
      {
        if (payload.issue) {

          const updatedIssues = state.issues.map(issue => {
            return payload.issue.id === issue.id ? payload.issue : issue
          });
          const updatedIssuesById = state.issuesById;
          updatedIssuesById.set(payload.issue.id, payload.issue);

          return {
            ...state,
            issues: updatedIssues,
            issuesById: updatedIssuesById
          }
        }
        return state;
      }
    default:
      return state;
  }
};
