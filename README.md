# Load Monitor Chrome Extension

The **Load Monitor** Chrome extension is designed to monitor the load times of web pages, capture network information, and display the details in a user-friendly popup interface. It is particularly useful for developers and performance enthusiasts who want to track page performance metrics in real-time.

---

## Features

- **Page Load Monitoring**: Tracks the load time of the current web page.
- **Network Information**: Captures and displays the network type (e.g., 4G, Wi-Fi) and speed.
- **Popup Interface**: Displays load time and network details in a clean and intuitive popup.
- **Real-Time Updates**: Updates the popup dynamically as you navigate between pages.

---

## Installation

1. **Download the Extension**:
   - Clone or download this repository to your local machine.

2. **Load the Extension in Chrome**:
   - Open Chrome and go to `chrome://extensions/`.
   - Enable **Developer Mode** (toggle in the top-right corner).
   - Click **Load unpacked** and select the folder containing the extension.

---

## Usage

1. **Navigate to a Web Page**:
   - Open any web page in your browser.

2. **Open the Popup**:
   - Click the **Load Monitor** extension icon in the Chrome toolbar.
   - The popup will display the following details for the current page:
     - **Load Time**: The time taken to load the page (in seconds).
     - **Network Type**: The type of network connection (e.g., 4G, Wi-Fi).
     - **Network Speed**: The speed of the network connection (e.g., 10 Mbps).

3. **Monitor Performance**:
   - As you navigate to different pages, the popup will automatically update to reflect the load time and network details for the new page.

---

## Popup Interface

The popup interface is designed to be simple and user-friendly. Here’s what it includes:

- **Load Time**: Displays the time taken to load the current page.
- **Network Type**: Shows the type of network connection (e.g., 4G, Wi-Fi).
- **Network Speed**: Displays the speed of the network connection (e.g., 10 Mbps).

### Example Popup

```
Load Monitor
-----------------------------
Load Time:    2.34s
Network Type: 4G
Network Speed: 10 Mbps
```

---

## Code Overview

### `popup.html`
- Defines the structure of the popup interface.
- Includes placeholders for load time, network type, and network speed.

### `popup.js`
- Fetches load time and network details from the background script.
- Updates the popup interface dynamically.

### `background.js`
- Monitors page load times and network information.
- Communicates with the popup to provide real-time updates.

---

## Troubleshooting

- **Popup Not Displaying Data**:
  - Ensure the extension is loaded correctly in `chrome://extensions/`.
  - Check the Chrome console for errors (`Ctrl + Shift + J`).

- **Incorrect or Missing Data**:
  - Verify that the page has fully loaded.
  - Ensure the network connection is active and stable.

---

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request.

---

## Support

If you have any questions or need help, please open an issue in this repository or contact the maintainer.

---

Enjoy using the **Load Monitor** Chrome extension! 🚀

---
