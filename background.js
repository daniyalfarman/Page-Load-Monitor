const GOOGLE_SCRIPT_URL =
  "https://script.google.com/a/macros/arbisoft.com/s/AKfycbyoQdHOl51i-khSMKbyGz0ycUK4CobC_099dkhIeFoWU--X8PK66UKeofV3-9H4rJI0nA/exec";

export function logToGoogleSheets(data) {
  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(
          "Failed to log data to Google Sheets:",
          response.statusText
        );
      } else {
        console.log("Data logged to Google Sheets successfully.");
      }
    })
    .catch((error) => {
      console.error("Error logging data to Google Sheets:", error);
    });
}
// Store load times by tab ID
const loadData = {};

// Update badge text when the user switches tabs
chrome.tabs.onActivated.addListener((activeInfo) => {
  const tabId = activeInfo.tabId;

  if (loadData[tabId]) {
    const { loadTime } = loadData[tabId];
    chrome.action.setBadgeText({ tabId, text: `${loadTime}` });
    chrome.action.setBadgeTextColor({ tabId, color: "#FFFFFF" });
    chrome.action.setBadgeBackgroundColor({ tabId, color: "#4CAF50" });
  } else {
    // Clear the badge if no data is available for the tab
    chrome.action.setBadgeText({ tabId, text: "" });
  }
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background script:", message);

  if (message.type === "pageLoadAlert" || message.type === "normalLoadTime") {
    const { loadTime, url, network } = message;
    const { type, speed } = network;
    const networkShow = `${type} (${speed})`;
    const tabId = sender.tab.id;

    // Store load time for the tab
    loadData[tabId] = { loadTime, url, network };

    // Update the badge for the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      if (activeTabId === tabId) {
        chrome.action.setBadgeText({ tabId, text: `${loadTime}` });
        chrome.action.setBadgeTextColor({ tabId, color: "#FFFFFF" });
        chrome.action.setBadgeBackgroundColor({ tabId, color: "#4CAF50" });
      }
    });
    if (message.type === "pageLoadAlert") {
      chrome.notifications.create(
        {
          type: "basic",
          iconUrl: "icon.png",
          title: "Page Load Alert",
          message: `Load time for ${url} was ${loadTime}s \nNetwork: ${network.type} (${network.speed})`,
        },
        (notificationId) => {
          if (chrome.runtime.lastError) {
            console.error(
              "Failed to create notification:",
              chrome.runtime.lastError
            );
          } else {
            console.log("Notification created with ID:", notificationId);
          }
        }
      );
      logToGoogleSheets({url, loadTime, networkShow});
    }

    // Send a response (if needed)
    sendResponse({ status: "success" });
  }

  // Respond to popup requests for load data
  if (message.type === "getLoadData") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      sendResponse(loadData[tabId] || null);
    });
    return true; // Required for async sendResponse
  }

  // Return true to indicate async response
  return true;
});
