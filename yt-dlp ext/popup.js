// Get current active tab URL
async function getCurrentTabUrl() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab.url;
}

// Send download request to server
async function sendDownload(format) {
    const url = await getCurrentTabUrl();
    if (!url) {
        showStatus("No URL detected!");
        return;
    }

    showStatus(`Starting ${format.toUpperCase()} download...`);

    try {
        await fetch("http://localhost:3000/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, format })
        });
        showStatus(`${format.toUpperCase()} download started! Check Downloads folder.`);
    } catch (err) {
        showStatus(`Download failed: ${err}`);
        console.error(err);
    }
}

// Send update request to server
async function updateYtDlp() {
    showStatus("Updating yt-dlp...");

    try {
        await fetch("http://localhost:3000/update", { method: "POST" });
        showStatus("Update started. Check logs for progress.");
    } catch (err) {
        showStatus(`Update failed: ${err}`);
        console.error(err);
    }
}

// Display status messages in popup
function showStatus(message) {
    const statusDiv = document.getElementById("status");
    statusDiv.textContent = message;
}

// Event listeners
document.getElementById("mp3").addEventListener("click", () => sendDownload("mp3"));
document.getElementById("mp4").addEventListener("click", () => sendDownload("mp4"));
document.getElementById("update").addEventListener("click", updateYtDlp);