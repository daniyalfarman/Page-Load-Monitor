window.addEventListener("load", function () {
  // Get the PerformanceNavigationTiming entry
  const navigationEntries = window.performance.getEntriesByType("navigation");

  // Check if navigation entry exists
  if (navigationEntries.length > 0) {
    const navigationEntry = navigationEntries[0];
    // Calculate the load time
    
    const loadTimeInMs =
      navigationEntry.domComplete - navigationEntry.startTime;

    // Convert milliseconds to seconds
    const loadTime = (loadTimeInMs / 1000).toFixed(2);
    const schoolgramUrl = new URL(window.location.href);

    if (window.location.href.includes("test.schoolgram.io")) {
      return;
    }
    const baseUrl = schoolgramUrl.hostname;

    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    const networkType = connection ? connection.effectiveType : "unknown";
    const networkSpeed = connection ? connection.downlink + " Mbps" : "unknown";

    // Threshold in seconds
    const threshold = 3;

    if (baseUrl.includes("schoolgram") && loadTime > threshold) {
      console.log("Load time exceeded threshold. Sending message...");
      // Send a message to the background script with the load time and page details
      chrome.runtime.sendMessage({
        type: "pageLoadAlert",
        loadTime: loadTime,
        url: window.location.href,
        network: {
          type: networkType,
          speed: networkSpeed,
        },
      });
    }
     chrome.runtime.sendMessage({
       type: "normalLoadTime",
       loadTime: loadTime,
       url: window.location.href,
       network: {
         type: networkType,
         speed: networkSpeed,
       },
     });

    // Log details to the console for debugging
    console.log("Page URL:", window.location.href);
    console.log("Load Time:", loadTime);
  } else {
    console.error("No navigation timing entry found.");
  }
});
