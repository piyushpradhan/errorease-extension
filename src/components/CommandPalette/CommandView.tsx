import useIssueContext from "@/contexts/issues/issueContext.hook";
import {
  CommandEmpty,
  CommandList,
} from "@/components/ui/command";
import ActivateView from "./ActivateView";
import IssueDetails from "../IssueDetails";
import SearchView from "./SearchView";

interface ICommandView {
  handleIssueSelection: (issueId: string) => void;
  handleActivateIssueCreation: () => void;
}

const CommandView = ({
  handleIssueSelection,
  handleActivateIssueCreation,
}: ICommandView) => {
  const { issuesState } = useIssueContext();
  switch (issuesState.userAction) {
    case "searchIssue":
      return <SearchView handleIssueSelection={handleIssueSelection} handleActivateIssueCreation={handleActivateIssueCreation} />
    case "activateIssue":
      return <ActivateView />;

    case "createIssue":
      return (
        <CommandList className="max-h-max">
          <CommandEmpty>You are creating an issue</CommandEmpty>
        </CommandList>
      );
    case "issueDetails":
      return <IssueDetails />;
  }
};

export default CommandView;
