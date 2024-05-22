import { Link2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { issueResourceLinks } from "./issueDetails.data";

export default function IssueDetails() {
  const handleResourceLinkSelection = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <CommandList className="max-h-max">
      <CommandGroup className="p-3">
        <h3 className="mb-2 text-lg font-semibold">
          #1 =&gt; Vercel 404 not found error
        </h3>

        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="cursor-pointer border border-primary bg-background text-xs"
          >
            css
          </Badge>

          <Badge
            variant="outline"
            className="cursor-pointer border border-primary bg-background text-xs"
          >
            react
          </Badge>
        </div>
      </CommandGroup>

      <CommandSeparator />

      <CommandGroup heading="Resource links">
        {issueResourceLinks?.map((issue) => (
          <CommandItem
            key={issue.id}
            onSelect={() => handleResourceLinkSelection(issue.link)}
          >
            <Link2 className="mr-2 h-4 w-4 shrink-0" />
            <span className="line-clamp-1">{issue.link}</span>
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandEmpty>No such resource links found</CommandEmpty>
    </CommandList>
  );
}
