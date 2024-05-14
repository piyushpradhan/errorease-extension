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
  Kbd,
} from "@repo/ui";

import useIssueContext from "../../contexts/issueContext.hook";
import Issue from "../IssueDetails/IssueDetails";

interface ICommandPalette {
  storage: any;
}

export default function CommandPalette({ storage }: ICommandPalette) {
  // eslint-disable-next-line no-alert
  alert(JSON.stringify(storage));
  const { issuesState, issuesDispatch } = useIssueContext();

  const [value, setValue] = useState<string>("");

  const [keyPressed, setKeyPressed] =
    useState<KeyboardEvent<HTMLInputElement>>();

  const handleCommand = (event: KeyboardEvent<HTMLInputElement>) => {
    setKeyPressed(event);
  };

  const handleIssueSelection = (issueId: string) => {
    issuesDispatch({ type: "SELECT_ISSUE", payload: issueId });
    setValue("");
    setKeyPressed(undefined);
  };

  const handleClearIssueSelection = useCallback(() => {
    issuesDispatch({ type: "CLEAR_ISSUE", payload: null });
    setValue("");
    setKeyPressed(undefined);
  }, [issuesDispatch]);

  const handleActivateIssueCreation = useCallback(() => {
    issuesDispatch({ type: "ACTIVATE_CREATE_ISSUE", payload: null });
    setValue("");
    setKeyPressed(undefined);
  }, [issuesDispatch]);

  useEffect(() => {
    // To clear issue selection and go back to search
    if (
      (issuesState?.action === "createIssue" ||
        issuesState?.action === "issueDetails") &&
      keyPressed?.key === "Backspace" &&
      value === ""
    ) {
      handleClearIssueSelection();
    }

    // To activate issue creation using typing
    if (
      issuesState?.action !== "createIssue" &&
      value === "create" &&
      keyPressed?.key === ":"
    ) {
      handleActivateIssueCreation();
    }

    // To activate issue creation using shortcut (Alt + Shift + C)
    if (
      issuesState?.action !== "createIssue" &&
      keyPressed?.key === "C" &&
      keyPressed?.altKey &&
      keyPressed?.shiftKey
    ) {
      handleActivateIssueCreation();
    }

    // To create issue
    if (
      issuesState?.action === "createIssue" &&
      keyPressed?.key === "Enter" &&
      value !== ""
    ) {
      issuesDispatch({ type: "CREATE_ISSUE", payload: value });

      handleClearIssueSelection();
    } else {
      setKeyPressed(undefined);
    }
  }, [
    issuesState?.action,
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
          issuesState?.action === "createIssue"
            ? "Title for your issue"
            : issuesState?.action === "issueDetails"
              ? "Press backspace to go back or search resource links"
              : "Type a command or search..."
        }
        icon={
          issuesState?.action === "issueDetails"
            ? ArrowLeft
            : issuesState?.action === "createIssue"
              ? FilePlus
              : undefined
        }
        onIconClick={handleClearIssueSelection}
        value={value}
        onValueChange={(searchValue) => setValue(searchValue)}
        command={issuesState?.action === "createIssue" ? "create" : undefined}
      />

      {issuesState?.action === "searchIssue" ? (
        <CommandList className="max-h-max">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Issues">
            {issuesState?.issues?.map((issue) => (
              <CommandItem
                key={issue.id}
                onSelect={() => handleIssueSelection(issue.id)}
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
      ) : issuesState?.action === "createIssue" ? (
        <CommandList className="max-h-max">
          <CommandEmpty>You are creating an issue</CommandEmpty>
        </CommandList>
      ) : (
        <Issue />
      )}
    </Command>
  );
}
