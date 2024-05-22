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
          ? "border border-green-500 border-opacity-50"
          : ""
      }
      key={issue.id}
      onSelect={handleSelect}
    >
      <FileText className="mr-2 h-4 w-4" />
      <span>{issue.title}</span>
    </CommandItem>

  )
}

export default IssueItem;
