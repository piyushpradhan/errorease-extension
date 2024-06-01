/* eslint-disable no-nested-ternary */
import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { ArrowLeft, FilePlus } from "lucide-react";

import { Command, CommandInput } from "@/components/ui/command";

import useIssueContext from "@/contexts/issues/issueContext.hook";
import { createIssue, fetchIssues } from "@/api/issues";
import {
  activateCreateView,
  activateIssueView,
  clearIssue,
  populateAllIssues,
  setSelectedIssue,
  setUserAction,
  updateCreatedIssue,
} from "@/contexts/issues/issueContext.actions";
import CommandView from "./CommandView";
import { Skeleton } from "../ui/skeleton";

interface ICommandPalette {
  cookies: string;
};

export default function CommandPalette({ cookies }: ICommandPalette) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { issuesState, issuesDispatch } = useIssueContext();

  useEffect(() => {
    if (cookies?.length > 0) {
      setIsLoading(true);
      // Populate issues from backend
      fetchIssues(cookies).then((response) => {
        issuesDispatch(populateAllIssues(response.data || []));
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [cookies]);

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
    issuesDispatch(clearIssue());
    setValue("");
    setKeyPressed(undefined);
  }, [issuesDispatch]);

  const handleActivateIssueCreation = useCallback(() => {
    issuesDispatch(activateCreateView());
    setValue("");
    setKeyPressed(undefined);
  }, [issuesDispatch]);

  const enableActivateView = useCallback(() => {
    issuesDispatch(activateIssueView());
    setValue("");
    setKeyPressed(undefined);
  }, [issuesDispatch]);

  useEffect(() => {
    // To clear issue selection and go back to search
    if (
      (issuesState?.userAction === "createIssue" ||
        issuesState?.userAction === "issueDetails" ||
        issuesState?.userAction === "activateIssue") &&
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

    if (
      issuesState?.userAction !== "activateIssue" &&
      value === "activate" &&
      keyPressed?.key === ":"
    ) {
      enableActivateView();
    }

    // To activate issue creation using shortcut (Alt + Shift + C)
    if (
      issuesState?.userAction !== "activateIssue" &&
      keyPressed?.key === "A" &&
      keyPressed?.altKey &&
      keyPressed?.shiftKey
    ) {
      enableActivateView();
    }
  }, [
    issuesState?.userAction,
    value,
    keyPressed,
    issuesDispatch,
    handleClearIssueSelection,
    handleActivateIssueCreation,
  ]);

  const handleSubmit = async (event: KeyboardEvent) => {
    if (issuesState.userAction === "createIssue" && event.key === "Enter") {
      // const beforeCreation = issuesState;
      // issuesDispatch(optimisticallyCreateIssue(value));
      try {
        const response = await createIssue(value);
        issuesDispatch(updateCreatedIssue(response.data));
      } catch (err) {
        console.error(err);
        // issuesDispatch(undoAction(beforeCreation));
      } finally {
        setValue("");
        issuesDispatch(setUserAction("searchIssue"));
        setKeyPressed(undefined);
      }
    }
  };

  const getCommand = () => {
    switch (issuesState.userAction) {
      case "createIssue":
        return "create";
      case "activateIssue":
        return "activate";
      default:
        return undefined;
    }
  };

  return (
    <Command
      className="h-[400px] w-[600px] rounded-lg border shadow-md"
      onKeyDown={handleCommand}
    >
      <CommandInput
        autoFocus={true}
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
        onKeyDown={handleSubmit}
        command={getCommand()}
      />

      {isLoading ? (
        <div className="flex flex-col w-full p-1 py-2 gap-2">
          {Array.from({ length: 12 }).map(() => (
            <Skeleton className="h-8 rounded-sm mx-4" />
          ))}
        </div>
      ) : (
        <CommandView
          handleIssueSelection={handleIssueSelection}
          handleActivateIssueCreation={handleActivateIssueCreation}
          enableActivateView={enableActivateView}
        />
      )}
    </Command>
  );
}
