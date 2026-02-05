# Implementation Plan: YouTube Subscriptions List View

## Overview
Create a bookmarklet that toggles between grid and list view on YouTube subscriptions feed, mimicking the old YouTube list style.

## Requirements Summary

### Visual Design
- ✅ One video per row (full width)
- ✅ Hide main thumbnail/ghost image
- ✅ Show only: avatar, title, channel name, link
- ✅ Links open in new tab (target="_blank")
- ✅ Mimic old YouTube list style

### Functionality
- ✅ Toggle button next to element with `href="/feed/channels"`
- ✅ Persistent state via localStorage
- ✅ Work with dynamic loading (infinite scroll)
- ✅ Hybrid approach: minimal DOM changes + CSS

## Implementation Phases

### Phase 1: Investigation & Analysis
**Goal**: Understand YouTube's current DOM structure

1. ✅ Create project structure (public, src, dist folders)
2. ⏳ Receive HTML/CSS files from user
3. ⏳ Analyze DOM structure:
   - Identify video grid container selector
   - Identify individual video card elements
   - Identify thumbnail, avatar, title, channel name selectors
   - Locate the channels link (`href="/feed/channels"`) for toggle placement

### Phase 2: Core Functionality
**Goal**: Build the bookmarklet logic

1. ⏳ Create `src/utils.js`:
   - localStorage management (get/set list view preference)
   - DOM selector utilities
   - MutationObserver setup for dynamic content

2. ⏳ Create `src/styles.css`:
   - List view CSS rules
   - Hide main thumbnails
   - Reflow layout: one per row
   - Position avatar, title, channel name
   - Responsive adjustments

3. ⏳ Create `src/bookmarklet.js`:
   - Inject toggle button next to channels link
   - Toggle list view on/off
   - Apply/remove CSS classes
   - Handle target="_blank" for links
   - Set up MutationObserver for new content

### Phase 3: Build System
**Goal**: Minify and package bookmarklet

1. ⏳ Update `package.json` with build scripts
2. ⏳ Install build dependencies (terser, clean-css-cli)
3. ⏳ Create build script:
   - Minify JS
   - Minify CSS
   - Inline CSS into JS
   - Generate bookmarklet format: `javascript:(function(){...})();`
   - Output to `dist/bookmarklet.txt`

### Phase 4: Testing & Refinement
**Goal**: Ensure it works properly

1. ⏳ Test on local HTML file
2. ⏳ Test on live YouTube subscriptions feed
3. ⏳ Test dynamic loading (scroll and load more)
4. ⏳ Test persistence (refresh page, check state)
5. ⏳ Test toggle button placement and styling
6. ⏳ Refine CSS for edge cases

## Technical Decisions

### DOM Manipulation Strategy (Option C: Hybrid)
- **CSS-based transformation** for visual changes (preferred for performance)
- **Minimal JS DOM changes**:
  - Add class to container: `yt-list-view-enabled`
  - Modify `<a>` tags: add `target="_blank"`
  - Inject toggle button

### localStorage Schema
```javascript
{
  "yt-list-view-enabled": "true" | "false"
}
```

### MutationObserver Strategy
- Watch for new video cards added to DOM (infinite scroll)
- Apply target="_blank" to new links
- Re-apply list view class if enabled

### CSS Architecture
```css
/* Hide thumbnails in list view */
.yt-list-view-enabled ytd-thumbnail.ytd-rich-item-renderer {}

/* Reflow to list layout */
.yt-list-view-enabled #contents.ytd-rich-grid-renderer {}

/* Style individual items */
.yt-list-view-enabled ytd-rich-item-renderer {}
```

## Next Steps

1. **USER ACTION REQUIRED**:
   - Save YouTube subscriptions page HTML/CSS to `public/` folder
   - Let me know when files are ready

2. **Once HTML provided**:
   - I'll analyze the DOM structure
   - Identify exact selectors
   - Build the bookmarklet
   - Test and iterate

## Questions for Future Consideration
- Should the toggle button have an icon or just text?
- Any specific styling for the toggle button?
- Should there be any animation when switching views?
