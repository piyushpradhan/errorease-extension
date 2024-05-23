import { useEffect, useState } from "react";
import axios from "axios";
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

  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${cookies}`;
    return config;
  });

  useEffect(() => {
    const updateResourceLinks = async () => {
      if (issuesState.activeIssue) {
        const { urlList } = await chrome.storage.local.get(["urlList"]);
        setResourceLinks(urlList);
        console.log("urlList", { urlList });
        const beforeUpdate = issuesState;
        issuesDispatch(optimisticallyUpdateResourceLinks(urlList));
        try {
          // activeIssue can't be null here
          const updatedIssue = await updateLinks(
            issuesState.activeIssue?.id || "",
            urlList,
          );
          issuesDispatch(setUpdatedResourceLinks(updatedIssue));
        } catch (err) {
          console.error(err);
          issuesDispatch(undoAction(beforeUpdate));
        }
      }
    };

    updateResourceLinks().then(() => {});
  }, [JSON.stringify(resourceLinks), issuesState.activeIssue]);

  function openGithubLoginPopup() {
    const popupUrl = `${BACKEND_URL}/api/auth/github`;
    const popupWindow = window.open(popupUrl, "_blank", "width=600,height=800");

    window.addEventListener("message", (event) => {
      if (event.source === popupWindow) {
        chrome.storage.local.set({ authCode: event.data }).then(() => {
          setCookies(event.data);
          popupWindow?.close();
        });
      }
    });
  }

  if (!cookies || cookies?.length === 0) {
    return (
      <button
        onClick={() => {
          openGithubLoginPopup();
        }}
      >
        Sign in with GitHub
      </button>
    );
  }

  return <CommandPalette />;
}
