import { FilePlus, CreditCard, Settings } from "lucide-react";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Kbd from "../Kbd";
import useIssueContext from "@/contexts/issues/issueContext.hook";
import { Issue } from "@/types/models";
import IssueItem from "./IssueItem";

interface ISearchView {
  handleIssueSelection: (issueId: string) => void;
  handleActivateIssueCreation: () => void;
  enableActivateView: () => void;
}

const SearchView = ({
  handleIssueSelection,
  handleActivateIssueCreation,
  enableActivateView,
}: ISearchView) => {
  const { issuesState } = useIssueContext();

  return (
    <CommandList className="max-h-max">
      <CommandEmpty>No results found.</CommandEmpty>

      <CommandGroup heading="Issues">
        {issuesState.issues.map((issue: Issue) => (
          <IssueItem
            issue={issue}
            handleSelect={() => {
              handleIssueSelection(issue.id);
            }}
          />
        ))}
      </CommandGroup>

      <CommandSeparator />

      <CommandGroup heading="Actions / Commands">
        <CommandItem onSelect={handleActivateIssueCreation}>
          <FilePlus className="mr-2 h-4 w-4" />
          <span>Create issue</span>
          <CommandShortcut>
            <Kbd text="Alt" /> + <Kbd text="⇧" /> + <Kbd text="C" />
          </CommandShortcut>
        </CommandItem>

        <CommandItem onSelect={enableActivateView}>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Activate issue</span>
          <CommandShortcut>
            <Kbd text="Alt" /> + <Kbd text="⇧" /> + <Kbd text="A" />
          </CommandShortcut>
        </CommandItem>

        {/* <CommandItem> */}
        {/*   <Settings className="mr-2 h-4 w-4" /> */}
        {/*   <span>Add resource link</span> */}
        {/*   <CommandShortcut> */}
        {/*     <Kbd text="Alt" /> + <Kbd text="⇧" /> + <Kbd text="R" /> */}
        {/*   </CommandShortcut> */}
        {/* </CommandItem> */}
      </CommandGroup>

      <CommandSeparator />
    </CommandList>
  );
};

export default SearchView;
