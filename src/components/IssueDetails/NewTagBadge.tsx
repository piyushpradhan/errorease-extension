import { useCallback, useState, ChangeEvent } from "react";
import useLabelContext from "@/contexts/label/labelContext.hook";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addLabel, addLabelOptimistic } from "@/contexts/label/labelContext.actions";
import useIssueContext from "@/contexts/issues/issueContext.hook";
import { Input } from "../ui/input";
import { updateIssueLabels } from '@/api/issues';
import { undoAction } from '@/contexts/issues/issueContext.actions';

const NewTagBadge = () => {
  const { labelState, labelDispatch } = useLabelContext();
  const { issuesState, issuesDispatch } = useIssueContext();
  const allLabels = labelState.labels;
  const currentIssueId = issuesState.selectedIssue;
  const currentIssue = issuesState.issuesById.get(currentIssueId);

  const issueLabelIds = (currentIssue?.labels || []).map(label => label.id);

  const filteredLabels = allLabels.filter(label => !issueLabelIds.includes(label.name));
  const [labelSearchValue, setLabelSearchValue] = useState("");
  const [labelSearchResults, setLabelSearchResults] = useState(filteredLabels);

  const handleLabelUpdate = async () => {
    const issuesBefore = issuesState;
    const labelsBefore = labelState;
    // Update the store
    labelDispatch(addLabelOptimistic(currentIssueId, labelSearchValue));
    issuesDispatch(addLabelOptimistic(currentIssueId, labelSearchValue));
    const existingLabels = (currentIssue?.labels || []).map(label => label.name);
    // Make the API call
    const { data: updatedIssue } = await updateIssueLabels(currentIssueId, [...existingLabels, labelSearchValue]);
    // Update the store with the actual value
    if (updatedIssue) {
      const newLabel = (updatedIssue.labels || []).filter(label => label.name === labelSearchValue);
      issuesDispatch(addLabel(currentIssueId, newLabel[0]));
      setLabelSearchValue("");
    } else {
      labelDispatch(undoAction(labelsBefore));
      issuesDispatch(undoAction(issuesBefore));
    }
  }

  const handleLabelSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const filtered = allLabels.filter((label) => {
      if (label.name.includes(e.target.value)) {
        return true;
      }
      return false;
    })

    setLabelSearchValue(e.target.value);
    setLabelSearchResults(filtered);
  }, []);

  return (
    <Select onValueChange={(e) => {
      // We get the labelID here
      console.log("value changed", e);
      if (e === "create") {
        handleLabelUpdate();
      }
    }}>
      <SelectTrigger className="w-auto text-xs px-2.5 py-0.5 h-auto outline-none rounded-full bg-primary text-white">
        <SelectValue placeholder="Add tags" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <Input
            type="text"
            className="w-auto h-auto py-1.5 text-sm outline-none focus:outline-none rounded-sm"
            onChange={handleLabelSearch}
            placeholder="Search tags"
            autoFocus={true} />
          {labelSearchResults.map(label => (
            <SelectItem key={label.id} value={label.id}>{label.name}</SelectItem>
          ))}
          {labelSearchResults.length === 0 && <SelectItem value="create">Create new tag</SelectItem>}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default NewTagBadge;
