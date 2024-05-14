chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.storage.local.set({ something: "worked" }).then(() => {});
});
