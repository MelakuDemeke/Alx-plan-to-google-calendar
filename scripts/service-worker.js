// Background script (service worker)
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Process the received message
    console.log("Message received in service worker:", message);
  
    // Send a response back to the content script if needed
    sendResponse({ response: "Message received successfully!" });
  });
  