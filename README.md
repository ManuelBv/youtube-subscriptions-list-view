# YouTube Subscriptions List View

A bookmarklet that restores the classic list view for YouTube subscriptions feed.

## Features

- 🎯 Toggle between grid and list view on YouTube subscriptions feed
- 💾 Persistent preference (saved in localStorage)
- 🔄 Works with dynamic content loading (infinite scroll)
- 🎨 Mimics YouTube's old list style layout
- 🔗 Opens videos in new tabs

## List View Layout

- One video per row
- Avatar thumbnail only (no large preview image)
- Clean layout: Avatar | Title | Channel Name
- Link opens in new tab

## Development Setup

1. **Add YouTube page HTML/CSS to public folder**
   - Save the full HTML from https://www.youtube.com/feed/subscriptions
   - Save associated CSS files
   - These files are gitignored

2. **Test locally**
   - Open `public/index.html` (or your saved HTML file) in browser
   - Use browser console to test the bookmarklet code

3. **Build bookmarklet**
   ```bash
   npm run build
   ```

## Usage

1. Create a new bookmark in your browser
2. Copy the bookmarklet code from `dist/bookmarklet.txt`
3. Paste as the URL of the bookmark
4. Navigate to https://www.youtube.com/feed/subscriptions
5. Click the bookmark to toggle list view

## Project Structure

```
├── src/
│   ├── bookmarklet.js    # Main bookmarklet code
│   ├── styles.css        # List view styles
│   └── utils.js          # Helper functions
├── public/               # Local testing files (gitignored)
├── dist/                 # Built bookmarklet output
└── README.md
```

## Technical Details

- **Approach**: Hybrid (minimal DOM manipulation + CSS)
- **Persistence**: localStorage key `yt-list-view-enabled`
- **Toggle Location**: Next to "Channels" link in navigation
- **Compatibility**: YouTube subscriptions feed with dynamic loading
