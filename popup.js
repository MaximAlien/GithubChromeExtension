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

document.getElementById("markSwiftAsViewedButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "markSwiftAsViewed" });
    });
});

document.getElementById("markSwiftAsNotViewedButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "markSwiftAsNotViewed" });
    });
});

document.getElementById("markKtAsViewedButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "markKtAsViewed" });
    });
});

document.getElementById("markKtAsNotViewedButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "markKtAsNotViewed" });
    });
});

document.getElementById("loadAllDiffsButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "loadAllDiffs" });
    });
});

document.getElementById("expandAllCommentsButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "expandAllComments" });
    });
});

document.getElementById("collapseAllCommentsButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "collapseAllComments" });
    });
});

document.getElementById("expandAllFilesButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "expandAllFiles" });
    });
});

document.getElementById("collapseAllFilesButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "collapseAllFiles" });
    });
});