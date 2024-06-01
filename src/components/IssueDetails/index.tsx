import { Link2, Trash } from "lucide-react";
import { MouseEvent } from "react";

import { Badge } from "@/components/ui/badge";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import useIssueContext from "@/contexts/issues/issueContext.hook";
import { Link } from "@/types/models";
import { removeLink, undoAction } from "@/contexts/issues/issueContext.actions";
import { removeLink as removeLinkApi } from "@/api/link";

export default function IssueDetails() {
  const { issuesState, issuesDispatch } = useIssueContext();
  const selectedIssueId = issuesState.selectedIssue;
  const selectedIssueDetails = issuesState.issuesById.get(selectedIssueId);

  if (!selectedIssueDetails) {
    // Show a better looking message
    return <p>Couldn't fetch issue details</p>;
  }

  const handleResourceLinkSelection = (url: string) => {
    window.open(url, "_blank");
  };

  const handleRemoveLink = async (e: any, link: Link) => {
    e.stopPropagation();

    const beforeUpdate = issuesState;
    issuesDispatch(removeLink({
      issueId: selectedIssueId,
      linkId: link.id
    }));

    try {
      await removeLinkApi(selectedIssueId, link.id);
    } catch (err) {
      console.error(err);
      issuesDispatch(undoAction(beforeUpdate));
    }
  }

  return (
    <CommandList className="max-h-max">
      <CommandGroup className="p-3">
        <h3 className="mb-2 text-lg font-semibold">
          {selectedIssueDetails.seqNo} =&gt; {selectedIssueDetails.title}
        </h3>

        <div className="flex gap-2">
          {selectedIssueDetails.labels.map((label) => (
            <Badge
              variant="outline"
              className="cursor-pointer border border-primary bg-background text-xs"
            >
              {label.name}
            </Badge>
          ))}
        </div>
      </CommandGroup>

      <CommandSeparator />

      <CommandGroup heading="Resource links">
        {selectedIssueDetails.links.map((link) => (
          <CommandItem
            key={link.id}
            className="flex flex-row justify-between group"
            onSelect={() => handleResourceLinkSelection(link.url)}
          >
            <div className="flex flex-row items-center overflow-hidden">
              <Link2 className="mr-2 h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{link.url}</span>
            </div>
            <Trash className="h-4 w-4 shrink-0 hidden group-hover:block cursor-pointer" onClick={(e) => {
              handleRemoveLink(e, link)
            }} />
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandEmpty>No such resource links found</CommandEmpty>
    </CommandList>
  );
}
