chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    const url = tab.url;
    chrome.storage.local.get(["urlList"]).then((result) => {
      const urlList = result.urlList || [];
      if (!urlList.includes(url)) {
        urlList.push(url);
      }
      chrome.storage.local.set({ urlList: urlList }).then(() => {});
    });
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    const url = tab.url;
    chrome.storage.local.get(["urlList"]).then((result) => {
      const urlList = result.urlList || [];
      if (!urlList.includes(url)) {
        urlList.push(url);
      }
      chrome.storage.local.set({ urlList: urlList }).then(() => {});
    });
  }
});
