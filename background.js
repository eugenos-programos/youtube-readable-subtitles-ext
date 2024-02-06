// This script listens for clicks on the browser action icon and opens the popup.
chrome.action.onClicked.addListener((tab) => {
    chrome.action.openPopup();
  });
  