/* eslint-disable no-nested-ternary */
import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  FilePlus,
  FileText,
  Settings,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Kbd from "../Kbd";

import useIssueContext from "@/contexts/issues/issueContext.hook";
import IssueDetails from "../IssueDetails";
import { fetchIssues } from "@/api/issues";
import atypes from "@/contexts/actionTypes";
import { populateAllIssues, setSelectedIssue } from "@/contexts/issues/issueContext.actions";
import type { Issue as IssueType } from "@/types/models";

export default function CommandPalette() {
  const [issues, setIssues] = useState<{ id: string; title: string }[]>([]);
  const { issuesState, issuesDispatch } = useIssueContext();

  useEffect(() => {
    // Populate issues from backend
    fetchIssues().then((response) => {
      issuesDispatch(populateAllIssues(response.data || []));
    });
  }, []);

  const [value, setValue] = useState<string>("");

  const [keyPressed, setKeyPressed] =
    useState<KeyboardEvent<HTMLInputElement>>();

  const handleCommand = (event: KeyboardEvent<HTMLInputElement>) => {
    setKeyPressed(event);
  };

  // Set selected issue
  const handleIssueSelection = (issueId: string) => {
    issuesDispatch(setSelectedIssue(issueId));
    setValue("");
    setKeyPressed(undefined);
  };

  const handleClearIssueSelection = useCallback(() => {
    issuesDispatch({ type: atypes.CLEAR_ISSUE, payload: null });
    setValue("");
    setKeyPressed(undefined);
  }, [issuesDispatch]);

  const handleActivateIssueCreation = useCallback(() => {
    issuesDispatch({ type: atypes.ACTIVATE_CREATE_ISSUE, payload: null });
    setValue("");
    setKeyPressed(undefined);
  }, [issuesDispatch]);

  useEffect(() => {
    // To clear issue selection and go back to search
    if (
      (issuesState?.userAction === "createIssue" ||
        issuesState?.userAction === "issueDetails") &&
      keyPressed?.key === "Backspace" &&
      value === ""
    ) {
      handleClearIssueSelection();
    }

    // To activate issue creation using typing
    if (
      issuesState?.userAction !== "createIssue" &&
      value === "create" &&
      keyPressed?.key === ":"
    ) {
      handleActivateIssueCreation();
    }

    // To activate issue creation using shortcut (Alt + Shift + C)
    if (
      issuesState?.userAction !== "createIssue" &&
      keyPressed?.key === "C" &&
      keyPressed?.altKey &&
      keyPressed?.shiftKey
    ) {
      handleActivateIssueCreation();
    }

    // To create issue
    if (
      issuesState?.userAction === "createIssue" &&
      keyPressed?.key === "Enter" &&
      value !== ""
    ) {
      issuesDispatch({ type: atypes.CREATE_ISSUE, payload: value });

      handleClearIssueSelection();
    } else {
      setKeyPressed(undefined);
    }
  }, [
    issuesState?.userAction,
    value,
    keyPressed,
    issuesDispatch,
    handleClearIssueSelection,
    handleActivateIssueCreation,
  ]);

  return (
    <Command
      className="h-[400px] w-[600px] rounded-lg border shadow-md"
      onKeyDown={handleCommand}
    >
      <CommandInput
        placeholder={
          issuesState?.userAction === "createIssue"
            ? "Title for your issue"
            : issuesState?.userAction === "issueDetails"
              ? "Press backspace to go back or search resource links"
              : "Type a command or search..."
        }
        icon={
          issuesState?.userAction === "issueDetails"
            ? ArrowLeft
            : issuesState?.userAction === "createIssue"
              ? FilePlus
              : undefined
        }
        onIconClick={handleClearIssueSelection}
        value={value}
        onValueChange={(searchValue) => {
          setValue(searchValue);
        }}
        command={
          issuesState?.userAction === "createIssue" ? "create" : undefined
        }
      />

      {issuesState?.userAction === "searchIssue" ? (
        <CommandList className="max-h-max">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Issues">
            {issuesState.issues.map((issue: IssueType) => (
              <CommandItem
                key={issue.id}
                onSelect={() => {
                  handleIssueSelection(issue.id);
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                <span>{issue.title}</span>
              </CommandItem>
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

            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Activate issue</span>
              <CommandShortcut>
                <Kbd text="Alt" /> + <Kbd text="⇧" /> + <Kbd text="A" />
              </CommandShortcut>
            </CommandItem>

            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Add resource link</span>
              <CommandShortcut>
                <Kbd text="Alt" /> + <Kbd text="⇧" /> + <Kbd text="R" />
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
        </CommandList>
      ) : issuesState?.userAction === "createIssue" ? (
        <CommandList className="max-h-max">
          <CommandEmpty>You are creating an issue</CommandEmpty>
        </CommandList>
      ) : (
        <IssueDetails />
      )}
    </Command>
  );
}
