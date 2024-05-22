import { FileText } from "lucide-react";
import { CommandItem } from "@/components/ui/command";
import { Issue } from "@/types/models";

interface IIssueItem {
  issue: Issue,
  handleSelect: (value: string) => void
}

const IssueItem = ({ issue, handleSelect }: IIssueItem) => {
  return (
    <CommandItem
      className={
        issue.is_active
          ? "border-2 border-green-500"
          : "border-2 border-transparent"
      }
      key={issue.id}
      onSelect={handleSelect}
    >
      {issue.is_active && <div className="absolute right-0 top-0">
        <div className="absolute bg-green-500 w-2 h-2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="absolute bg-green-500/60 w-4 h-4 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
      </div>}
      <FileText className="mr-2 h-4 w-4" />
      <span>{issue.title}</span>
    </CommandItem>

  )
}

export default IssueItem;
