# How to Use the YouTube List View Bookmarklet

## Quick Start

### 1. Install the Bookmarklet

**Method A: Via Test Page**
1. Open `public/test.html` in your browser
2. Click "Copy to Clipboard" button
3. Create a new bookmark in your browser (Ctrl+D or Cmd+D)
4. Edit the bookmark and paste the copied code as the URL
5. Name it "YouTube List View"

**Method B: Manually**
1. Open `dist/bookmarklet.txt` and copy all the code
2. Create a new bookmark in your browser's bookmarks bar
3. Edit the bookmark:
   - **Name:** YouTube List View
   - **URL:** Paste the entire code from bookmarklet.txt
4. Save the bookmark

### 2. Use the Bookmarklet

1. Navigate to https://www.youtube.com/feed/subscriptions
2. Click your "YouTube List View" bookmark
3. A toggle button will appear next to "All subscriptions"
4. Click the toggle to switch between Grid and List view

## Features

✅ **List View Layout**
- One video per row (full width)
- Avatar on left, title and metadata on right
- Clean, compact design mimicking old YouTube

✅ **Smart Behavior**
- Saves your preference in localStorage
- Auto-applies on page load if enabled
- Works with infinite scroll / dynamic loading
- All video links open in new tab

✅ **Visual Indicator**
- Toggle button shows current state:
  - **"☰ List View"** = List view active (blue background)
  - **"⊞ Grid View"** = Grid view active (gray background)

## Testing

### Local Testing
1. Open your saved YouTube HTML file: `public/(10) Subscriptions - YouTube.html`
2. Open `public/test.html` in another tab
3. Copy the bookmarklet code
4. Go back to the YouTube HTML tab
5. Paste in console or use the test button

### Live Testing
1. Install the bookmarklet (see above)
2. Go to https://www.youtube.com/feed/subscriptions
3. Click the bookmarklet
4. Toggle between views

## Customization

Want to modify the appearance? Edit `src/styles.css` and rebuild:

```bash
npm run build
```

Then update your bookmark with the new code from `dist/bookmarklet.txt`.

### Common Customizations

**Change avatar size:**
```css
.yt-list-view-enabled yt-avatar-shape,
.yt-list-view-enabled .yt-spec-avatar-shape {
  width: 64px !important;  /* Change from 48px */
  height: 64px !important;
}
```

**Adjust spacing between items:**
```css
.yt-list-view-enabled .yt-lockup-view-model.yt-lockup-view-model--vertical {
  padding: 16px 0 !important;  /* Change from 12px */
}
```

**Hide Shorts section:**
```css
.yt-list-view-enabled ytd-rich-section-renderer {
  display: none !important;
}
```

## Troubleshooting

### Toggle button doesn't appear
- Make sure you're on `youtube.com/feed/subscriptions`
- Try refreshing the page
- Check if the bookmarklet code was copied completely
- Open browser console (F12) and look for errors

### List view looks broken
- Clear browser cache
- Make sure you're using the latest build
- YouTube may have changed their HTML structure - file an issue on GitHub

### Videos don't open in new tab
- The bookmarklet should handle this automatically
- If it doesn't work, file an issue with details

### Preference not saving
- Check if localStorage is enabled in your browser
- Make sure you're not in incognito/private mode
- Check browser console for localStorage errors

## Browser Compatibility

Tested on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Brave (latest)

## Limitations

- Only works on `/feed/subscriptions` page
- May break if YouTube significantly changes their HTML structure
- Does not modify the actual YouTube backend, just the display
- Requires re-running bookmarklet after page navigation (not persistent across page changes)

## Privacy

This bookmarklet:
- ✅ Runs entirely in your browser (client-side)
- ✅ Does not send any data to external servers
- ✅ Only stores your view preference in localStorage
- ✅ Does not modify or track your YouTube activity
- ✅ Open source - you can inspect the code

## Updates

To update to the latest version:
1. Pull latest changes from the repository
2. Run `npm run build`
3. Copy new code from `dist/bookmarklet.txt`
4. Update your bookmark with the new code
