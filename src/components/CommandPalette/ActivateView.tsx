import useIssueContext from "@/contexts/issues/issueContext.hook";

import { FileText } from "lucide-react";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
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

const ActivateView = () => {
  const { issuesState, issuesDispatch } = useIssueContext();

  const handleIssueActivation = async (issueId: string) => {
    // Optimistically update the store with activated issue
    const beforeUpdate = issuesState;
    issuesDispatch(activateIssue(issueId));
    try {
      await activateIssueApi(issueId);
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

      <CommandGroup heading="Issues">
        {issuesState.issues.map((issue: Issue) => (
          <CommandItem
            className={
              issue.is_active
                ? "border border-green-500 border-opacity-50"
                : ""
            }
            key={issue.id}
            onSelect={() => {
              handleActivationToggle(issue.id);
            }}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>{issue.title}</span>
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  );
};

export default ActivateView;
