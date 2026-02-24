// server.js
const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Fixed Downloads folder
const downloadsPath = "C:/Users/lenovo/Downloads"; // forward slashes to avoid escape issues

// Route to download MP3 or MP4
app.post("/download", (req, res) => {
    const { url, format } = req.body;

    if (!url) return res.status(400).send("No URL provided");

    // Use standalone yt-dlp.exe commands
    const command =
        format === "mp3"
            ? `yt-dlp.exe -f bestaudio --extract-audio --audio-format mp3 -o "${downloadsPath}/%(title).100s.%(ext)s" "${url}"`
            : `yt-dlp.exe -f "bv*+ba/b" --merge-output-format mp4 -o "${downloadsPath}/%(title).100s.%(ext)s" "${url}"`;

    // Respond immediately so extension is not blocked
    res.send("Download started");

    // Run yt-dlp asynchronously
    exec(command, (error, stdout, stderr) => {
        if (error) console.error("Download failed:", error);
        else console.log(stdout);
    });
});

// Route to safely update yt-dlp
app.post("/update", (req, res) => {
    // Respond immediately
    res.send("Updating yt-dlp...");

    // Run yt-dlp.exe -U asynchronously
    exec("yt-dlp.exe -U", (error, stdout, stderr) => {
        if (error) console.error("Update failed:", error);
        else console.log("yt-dlp updated:\n", stdout);
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});