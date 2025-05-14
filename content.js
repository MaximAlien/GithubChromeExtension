chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "markAllAsViewed") {
        document.querySelectorAll('.js-reviewed-checkbox').forEach(e => e.checked || e.click());
    } else if (request.action === "markAllAsNotViewed") {
        document.querySelectorAll('.js-reviewed-checkbox').forEach(e => !e.checked || e.click());
    }
});

// document.querySelectorAll('.js-resolvable-timeline-thread-container').forEach(e => { e.setAttribute('open', ''); })
  