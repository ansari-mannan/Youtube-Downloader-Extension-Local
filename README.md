# Youtube-Downloader-Extension-Local

A local browser extension + background server that allows you to download the current page URL using `yt-dlp` with one click.

It supports:
- MP3 downloads (audio extraction)
- MP4 downloads (best video + audio merge)
- Running fully locally (no deployment, no external API)
- Background execution via Windows Service or Linux systemd

---

## What This Project Does

When you click the extension button:

1. It extracts the current tab URL.
2. Sends it to a local Node.js server.
3. The server runs `yt-dlp`.
4. The file is saved directly to your Downloads folder.

Everything runs locally on your machine.

---

# Requirements

- Node.js (installed and in PATH)
- `yt-dlp.exe` (Windows) or `yt-dlp` (Linux) installed and in PATH
- Chromium-based browser (Chrome, Edge, Opera) or Firefox
- NSSM (Windows only, for background service)

---

# Installation

## 1. Extract the Project

Download the project ZIP and extract it to a permanent location.

Important:
Place it somewhere you do not plan to move later.  
Example:

```

C:\Users\YourName\Apps\yt-dlp-local

```

Do NOT place it in:
- Desktop
- Temporary folders
- Downloads (if you clean it regularly)

If you move it later, your Windows service will break.

---

## 2. Install Node Dependencies

Open Command Prompt inside the project folder:

```

npm install

```

---

## 3. Test the Server Manually

Run:

```

node server.js

```

If it starts successfully, stop it (Ctrl + C).  
Next step is setting up background execution.

---

# Running as Background Service

---

# Windows (Using NSSM)

## Step 1 – Install the Service

Open Command Prompt as Administrator.

Run:

```

nssm install YTDLPService

```

Fill in:

Path:
```

C:\Program Files\nodejs\node.exe

```

Startup directory:
```

C:\Path\To\Your\Project

```

Arguments:
```

server.js

```

Click "Install Service".

---

## Step 2 – Start the Service

```

net start YTDLPService

```

To verify:

```

services.msc

```

You should see `YTDLPService` running.

It will now:
- Start automatically on boot
- Run in the background
- Not require a visible CMD window

---

## Updating the Service Location

If you move the folder:

```

nssm edit YTDLPService

```

Update the paths accordingly.

---

# Linux (systemd Service)

## Step 1 – Create Service File

Create:

```

/etc/systemd/system/ytdlp.service

```

Paste:

```

[Unit]
Description=Local yt-dlp Server
After=network.target

[Service]
Type=simple
User=yourusername
WorkingDirectory=/home/yourusername/yt-dlp-local
ExecStart=/usr/bin/node server.js
Restart=always

[Install]
WantedBy=multi-user.target

```

Replace:
- `yourusername`
- project path
- node path if different

---

## Step 2 – Enable + Start

```

sudo systemctl daemon-reload
sudo systemctl enable ytdlp.service
sudo systemctl start ytdlp.service

```

Check status:

```

sudo systemctl status ytdlp.service

```

It will now:
- Start automatically on boot
- Run silently in the background

---

# Installing the Browser Extension

---

## Chromium Browsers (Chrome, Edge, Opera)

1. Open Extensions page:

   Chrome:
```

chrome://extensions/

```

Edge:
```

edge://extensions/

```

Opera:
```

opera://extensions/

```

2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the extension folder inside the project

The extension is now installed locally.

---

## Firefox

1. Open:
```

about:debugging

```
2. Click **This Firefox**
3. Click **Load Temporary Add-on**
4. Select the `manifest.json` file

Note:
Temporary add-ons are removed when Firefox restarts unless you package and sign it.

---

# Usage

1. Open a supported video page.
2. Click the extension icon.
3. Choose:
- Download MP3
- Download MP4
4. File appears in your Downloads folder.

---

# Commands Used Internally

MP3:
```

yt-dlp -f bestaudio --extract-audio --audio-format mp3 <URL>

```

MP4:
```

yt-dlp -f "bv*+ba/b" --merge-output-format mp4 <URL>

```

---

# Updating yt-dlp

If using standalone executable:

```

yt-dlp -U

```

If using pip version:

```

pip install -U yt-dlp

```

---

# Security Notes

- Server runs locally only.
- No external API calls.
- No cloud deployment.
- Files are saved directly to your system.

---

# Troubleshooting

If downloads fail:

1. Check that `yt-dlp` works from command line.
2. Check that the service is running.
3. Check logs if enabled in `server.js`.

---

# Project Structure

```

/extension
/server.js
/package.json
README.md

```

---

This project is intended for local automation and learning purposes.
