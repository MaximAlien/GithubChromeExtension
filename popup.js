document.getElementById("markAllAsViewedButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "markAllAsViewed" });
    });
});

document.getElementById("markAllAsNotViewedButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "markAllAsNotViewed" });
    });
});