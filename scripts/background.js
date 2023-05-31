chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if(tab.url && tab.url.includes("intranet.alxswe.com/planning/me")){
        chrome.tabs.sendMessage(tabId, {
            type: "alx",
            isCalender: true
        })
    }
})