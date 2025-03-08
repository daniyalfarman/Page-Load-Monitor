// Request load data from the background script
chrome.runtime.sendMessage({ type: "getLoadData" }, (response) => {
  console.log("Response", response);
  if (response) {
    document.getElementById(
      "load-time"
    ).textContent = `${response.loadTime} seconds`;
    document.getElementById("network-type").textContent = response.network.type;
    document.getElementById("network-speed").textContent =
      response.network.speed;
  } else {
    document.getElementById("load-details").innerHTML =
      "<p>No data available.</p>";
  }
});

