// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request: { popupMounted: boolean }, _sender, _sendResponse) => {
  // onMessage must return "true" if response is async.
  const isResponseAsync = false;

  if (request.popupMounted) {
    console.log("eventPage notified that Popup.tsx has mounted.");
  }

  return isResponseAsync;
});
