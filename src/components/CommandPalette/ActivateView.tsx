import useIssueContext from "@/contexts/issues/issueContext.hook";

import { FileText } from "lucide-react";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Issue } from "@/types/models";
import {
  activateIssue,
  deactivateIssue,
  undoAction,
} from "@/contexts/issues/issueContext.actions";
import {
  activateIssue as activateIssueApi,
  deactivateIssue as deactivateIssueApi,
} from "@/api/issues";
import IssueItem from "./IssueItem";

const ActivateView = () => {
  const { issuesState, issuesDispatch } = useIssueContext();

  const handleIssueActivation = async (issueId: string) => {
    // Optimistically update the store with activated issue
    const beforeUpdate = issuesState;
    issuesDispatch(activateIssue(issueId));
    try {
      await activateIssueApi(issueId);
      await chrome.storage.local.remove("urlList");
    } catch (error) {
      issuesDispatch(undoAction(beforeUpdate));
    }
  };

  const handleIssueDeactivation = async (issueId: string) => {
    // Optimistically update the store with de-activated issue
    const beforeUpdate = issuesState;
    issuesDispatch(deactivateIssue(issueId));
    try {
      await deactivateIssueApi(issueId);
      await chrome.storage.local.remove("urlList");
    } catch (error) {
      issuesDispatch(undoAction(beforeUpdate));
    }
  };

  const handleActivationToggle = async (issueId: string) => {
    if (issuesState.issuesById.get(issueId)?.is_active) {
      handleIssueDeactivation(issueId);
    } else {
      handleIssueActivation(issueId);
    }
  };

  return (
    <CommandList className="max-h-max">
      <CommandEmpty>No issues found.</CommandEmpty>

      <CommandGroup heading="Activate/Deactivate issue">
        {issuesState.issues.map((issue: Issue) => (
          <IssueItem
            issue={issue}
            handleSelect={() => {
              handleActivationToggle(issue.id);
            }}
          />
        ))}
      </CommandGroup>
    </CommandList>
  );
};

export default ActivateView;
