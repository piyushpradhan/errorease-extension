import { useEffect, useState } from "react";
import axios from "axios";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommandPalette from "@/components/CommandPalette";
import { BACKEND_URL } from "@/lib/utils";
import useIssueContext from "./contexts/issues/issueContext.hook";
import {
  optimisticallyUpdateResourceLinks,
  setUpdatedResourceLinks,
  undoAction,
} from "./contexts/issues/issueContext.actions";
import { updateLinks } from "./api/link";

interface IApp {
  storage: any;
}

export default function App({ storage }: IApp) {
  const parsedStorage = JSON.parse(JSON.stringify(storage));
  const [resourceLinks, setResourceLinks] = useState([]);
  const [cookies, setCookies] = useState<string>(parsedStorage["authCode"]);

  const { issuesState, issuesDispatch } = useIssueContext();

  const activeIssueId = issuesState.activeIssue?.id || null;

  axios.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${cookies}`;
    return config;
  });

  useEffect(() => {
    const updateResourceLinks = async () => {
      if (issuesState.activeIssue) {
        const { urlList } = await chrome.storage.local.get(["urlList"]);
        setResourceLinks(urlList);
        const beforeUpdate = issuesState;
        issuesDispatch(optimisticallyUpdateResourceLinks(urlList));
        try {
          // activeIssue can't be null here
          const response = await updateLinks(
            issuesState.activeIssue?.id || "",
            urlList,
          );

          const updatedIssue = response?.data;

          issuesDispatch(setUpdatedResourceLinks(updatedIssue));
        } catch (err) {
          console.error(err);
          issuesDispatch(undoAction(beforeUpdate));
        }
      }
    };

    updateResourceLinks().then(() => { });
  }, [JSON.stringify(resourceLinks), activeIssueId]);

  function openGithubLoginPopup() {
    const popupUrl = `${BACKEND_URL}/api/auth/github`;
    const popupWindow = window.open(popupUrl, "_blank", "width=600,height=800");

    window.addEventListener("message", (event) => {
      if (event.source === popupWindow) {
        chrome.storage.local.set({ authCode: event.data }).then(() => {
          console.log("cookies", event.data);
          setCookies(event.data);
          popupWindow?.close();
        });
      }
    });
  }

  const handleSignInWithPopup = () => {
    openGithubLoginPopup();
  };

  console.log({ cookies });

  if (!cookies || cookies?.length === 0) {
    return (
      <div className="pattern-dots flex h-screen w-full items-center justify-center pattern-bg-transparent pattern-[#dadada] pattern-opacity-100 pattern-size-4">
        <Button onClick={handleSignInWithPopup}>
          <Github className="mr-2 h-4 w-4" /> Login with Github
        </Button>
      </div>
    );
  }

  return <CommandPalette />;
}
