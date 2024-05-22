import { useState } from "react";
import axios from "axios";
import CommandPalette from "@/components/CommandPalette/CommandPalette";
import { BACKEND_URL } from "@/lib/utils";

interface IApp {
  storage: any;
}

export default function App({ storage }: IApp) {
  const parsedStorage = JSON.parse(JSON.stringify(storage));
  const [cookies, setCookies] = useState<string>(parsedStorage["authCode"]);

  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${cookies}`;
    return config;
  });

  function openGithubLoginPopup() {
    const popupUrl = `${BACKEND_URL}/api/auth/github`;
    const popupWindow = window.open(popupUrl, "_blank", "width=600,height=800");

    window.addEventListener("message", (event) => {
      if (event.source === popupWindow) {
        alert(event.data);
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
