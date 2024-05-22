import React from "react";
import ReactDOM from "react-dom";

import IFrame from "@uiw/react-iframe";

import IssueProvider from "@/contexts/issues/IssueContext";
import App from "./App";

import "./index.css";

chrome.storage.local
  .get(["authToken", "something", "authCode"])
  .then((result) => {
    ReactDOM.render(
      <React.StrictMode>
        <IFrame
          width="600px"
          height="400px"
          style={{
            width: "600px",
            height: "400px",
            border: "none",
            borderRadius: "0.5em",
            overflow: "hidden",
          }}
          head={[
            <link
              key="0"
              type="text/css"
              rel="stylesheet"
              href={chrome.runtime.getURL("/react/index.css")}
            />,
          ]}
        >
          <IssueProvider>
            <App storage={result} />
          </IssueProvider>
        </IFrame>
      </React.StrictMode>,
      document.getElementById("extension-root"),
    );
  });
