import useIssueContext from "@/contexts/issues/issueContext.hook";
import CreateView from "./CreateView";
import ActivateView from "./ActivateView";
import IssueDetails from "../IssueDetails";
import SearchView from "./SearchView";

interface ICommandView {
  handleIssueSelection: (issueId: string) => void;
  handleActivateIssueCreation: () => void;
  enableActivateView: () => void;
}

const CommandView = ({
  handleIssueSelection,
  handleActivateIssueCreation,
  enableActivateView,
}: ICommandView) => {
  const { issuesState } = useIssueContext();
  switch (issuesState.userAction) {
    case "searchIssue":
      return (
        <SearchView
          handleIssueSelection={handleIssueSelection}
          handleActivateIssueCreation={handleActivateIssueCreation}
          enableActivateView={enableActivateView}
        />
      );
    case "activateIssue":
      return <ActivateView />;

    case "createIssue":
      return <CreateView />;
    case "issueDetails":
      return <IssueDetails />;
  }
};

export default CommandView;
