import { Link2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import useIssueContext from "@/contexts/issues/issueContext.hook";

export default function IssueDetails() {
  const { issuesState, issuesDispatch } = useIssueContext();
  const selectedIssue = issuesState.issuesById.get(issuesState.selectedIssue);

  if (!selectedIssue) {
    // Show a better looking message
    return <p>Couldn't fetch issue details</p>
  }

  const handleResourceLinkSelection = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <CommandList className="max-h-max">
      <CommandGroup className="p-3">
        <h3 className="mb-2 text-lg font-semibold">
          {selectedIssue.seqNo} =&gt; {selectedIssue.title}
        </h3>

        <div className="flex gap-2">
          {selectedIssue.labels.map(label => (
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
        {selectedIssue.links.map((link) => (
          <CommandItem
            key={link.id}
            onSelect={() => handleResourceLinkSelection(link.url)}
          >
            <Link2 className="mr-2 h-4 w-4 shrink-0" />
            <span className="line-clamp-1">{link.url}</span>
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandEmpty>No such resource links found</CommandEmpty>
    </CommandList>
  );
}
