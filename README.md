# YouTube Subscriptions List View

A bookmarklet that restores the classic list view for YouTube subscriptions feed.

## 🚀 Quick Install

### Method 1: Direct Copy (Easiest)

1. **Copy the bookmarklet code below** (click to select all, then Ctrl+C / Cmd+C):

```javascript
javascript:(function(){function t(){try{return"true"===localStorage.getItem("yt-list-view-enabled")}catch(t){return!1}}function e(t){try{localStorage.setItem("yt-list-view-enabled",t?"true":"false")}catch(t){console.warn("Failed to save list view preference")}}function i(t,e=5e3){return new Promise((i,o)=>{if(document.querySelector(t))return i(document.querySelector(t));const n=new MutationObserver(()=>{const e=document.querySelector(t);e&&(n.disconnect(),i(e))});n.observe(document.body,{childList:!0,subtree:!0}),setTimeout(()=>{n.disconnect(),o(new Error(`Timeout waiting for ${t}`))},e)})}function o(t){t.querySelectorAll("a.yt-lockup-metadata-view-model__title, a.yt-lockup-view-model__content-image").forEach(t=>{t.href&&t.href.includes("/watch?v=")&&(t.setAttribute("target","_blank"),t.setAttribute("rel","noopener noreferrer"))})}const n=".yt-list-view-toggle{margin-left:16px;padding:8px 16px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:18px;color:#fff;cursor:pointer;font-size:14px;font-weight:500;transition:all 0.2s ease;display:inline-flex;align-items:center;gap:8px;vertical-align:middle;}.yt-list-view-toggle:hover{background:rgba(255,255,255,0.15);border-color:rgba(255,255,255,0.3);}.yt-list-view-toggle.active{background:#3ea6ff;border-color:#3ea6ff;}.yt-list-view-enabled ytd-rich-grid-renderer #contents{display:flex !important;flex-direction:column !important;gap:0 !important;}.yt-list-view-enabled ytd-rich-item-renderer{width:100% !important;max-width:100% !important;margin:0 !important;}.yt-list-view-enabled .yt-lockup-view-model.yt-lockup-view-model--vertical{display:flex !important;flex-direction:row !important;align-items:flex-start !important;gap:12px !important;padding:12px 0 !important;border-bottom:1px solid rgba(255,255,255,0.1) !important;}.yt-list-view-enabled a.yt-lockup-view-model__content-image{display:none !important;}.yt-list-view-enabled .yt-lockup-view-model__metadata{display:flex !important;flex-direction:row !important;align-items:flex-start !important;gap:12px !important;flex:1 !important;min-width:0 !important;}.yt-list-view-enabled .yt-lockup-metadata-view-model__avatar{flex-shrink:0 !important;}.yt-list-view-enabled yt-avatar-shape,.yt-list-view-enabled .yt-spec-avatar-shape{width:48px !important;height:48px !important;}.yt-list-view-enabled .yt-spec-avatar-shape__image{width:48px !important;height:48px !important;}.yt-list-view-enabled .yt-lockup-metadata-view-model__text-container{flex:1 !important;min-width:0 !important;}.yt-list-view-enabled .yt-lockup-metadata-view-model__title{font-size:14px !important;line-height:1.4 !important;margin-bottom:4px !important;display:block !important;}.yt-list-view-enabled .yt-lockup-metadata-view-model__title span{-webkit-line-clamp:2 !important;display:-webkit-box !important;-webkit-box-orient:vertical !important;overflow:hidden !important;}.yt-list-view-enabled yt-content-metadata-view-model{font-size:12px !important;}.yt-list-view-enabled .yt-content-metadata-view-model__metadata-text{font-size:12px !important;color:#aaa !important;}.yt-list-view-enabled .yt-lockup-metadata-view-model__menu-button{flex-shrink:0 !important;margin-left:auto !important;}.yt-list-view-enabled .yt-lockup-view-model--rich-grid-legacy-margin{margin:0 !important;}.yt-list-view-enabled .yt-lockup-metadata-view-model{flex-direction:row !important;}.yt-list-view-enabled ytd-rich-section-renderer{width:100% !important;}.yt-list-view-enabled ytd-rich-shelf-renderer[is-shorts]{width:100% !important;}.yt-list-view-enabled ytd-rich-shelf-renderer[is-shorts] #contents{display:flex !important;flex-direction:column !important;gap:0 !important;transform:none !important;}.yt-list-view-enabled ytd-rich-shelf-renderer[is-shorts] ytd-rich-item-renderer{width:100% !important;max-width:100% !important;margin:0 !important;}.yt-list-view-enabled ytm-shorts-lockup-view-model-v2,.yt-list-view-enabled ytm-shorts-lockup-view-model{display:flex !important;flex-direction:row !important;align-items:center !important;gap:12px !important;width:100% !important;}.yt-list-view-enabled ytm-shorts-lockup-view-model .shortsLockupViewModelHostThumbnailParentContainer{width:36px !important;height:48px !important;min-width:36px !important;flex-shrink:0 !important;}.yt-list-view-enabled ytm-shorts-lockup-view-model yt-thumbnail-view-model{width:36px !important;height:48px !important;}.yt-list-view-enabled ytm-shorts-lockup-view-model yt-thumbnail-view-model img{width:36px !important;height:48px !important;object-fit:cover !important;}.yt-list-view-enabled ytm-shorts-lockup-view-model .shortsLockupViewModelHostOutsideMetadata{flex:1 !important;display:flex !important;flex-direction:row !important;align-items:center !important;justify-content:space-between !important;padding:12px 0 !important;border-bottom:1px solid rgba(255,255,255,0.1) !important;}.yt-list-view-enabled ytm-shorts-lockup-view-model .shortsLockupViewModelHostMetadataTitle{font-size:14px !important;line-height:1.4 !important;margin-bottom:2px !important;}.yt-list-view-enabled ytm-shorts-lockup-view-model .shortsLockupViewModelHostOutsideMetadataSubhead{font-size:12px !important;color:#aaa !important;}.yt-list-view-enabled ytm-shorts-lockup-view-model .shortsLockupViewModelHostOutsideMetadataMenu{flex-shrink:0 !important;margin-left:12px !important;}";!function(){"use strict";function a(){const t=document.body.classList.toggle("yt-list-view-enabled");e(t);const i=document.getElementById("yt-list-view-toggle");i&&(i.classList.toggle("active",t),i.textContent=t?"☰ List View":"⊞ Grid View"),t&&o(document.body)}window.location.href.includes("youtube.com/feed/subscriptions")?document.getElementById("yt-list-view-toggle")?console.log("List view toggle already exists"):async function(){console.log("🎬 Initializing YouTube List View..."),function(){if(document.getElementById("yt-list-view-styles"))return;const t=document.createElement("style");t.id="yt-list-view-styles",t.textContent=n,document.head.appendChild(t)}(),await async function(){try{const e=await i('a[href="/feed/channels"]');if(!e)return void console.error('Could not find "All subscriptions" link');const o=document.createElement("button");o.id="yt-list-view-toggle",o.className="yt-list-view-toggle",o.textContent=t()?"☰ List View":"⊞ Grid View",t()&&o.classList.add("active"),o.addEventListener("click",a);const n=e.closest("#subscribe-button");n?n.insertAdjacentElement("afterend",o):e.parentElement.insertAdjacentElement("afterend",o)}catch(t){console.error("Failed to create toggle button:",t)}}(),t()&&(document.body.classList.add("yt-list-view-enabled"),o(document.body)),function(){const t=new MutationObserver(t=>{if(document.body.classList.contains("yt-list-view-enabled"))for(const e of t)if(e.addedNodes.length>0){o(document.body);break}}),e=document.querySelector("ytd-rich-grid-renderer #contents");e&&t.observe(e,{childList:!0,subtree:!0})}(),console.log("✅ YouTube List View initialized!")}():alert("This bookmarklet only works on YouTube subscriptions feed!\nNavigate to: https://www.youtube.com/feed/subscriptions")}();})();
```

2. **Create a new bookmark** in your browser:
   - **Chrome/Edge/Brave**: Press `Ctrl+D` (Windows) or `Cmd+D` (Mac), or right-click bookmarks bar → Add page
   - **Firefox**: Press `Ctrl+D` (Windows) or `Cmd+D` (Mac)
   - **Safari**: Press `Cmd+D`

3. **Edit the bookmark**:
   - **Name**: YouTube List View
   - **URL**: Paste the entire code you copied in step 1

4. **Save** the bookmark

5. **Use it**:
   - Go to [youtube.com/feed/subscriptions](https://www.youtube.com/feed/subscriptions)
   - Click your new bookmark
   - A toggle button will appear next to "All subscriptions"
   - Click the toggle to switch between Grid and List view

### Method 2: Via Test Page

1. Open `public/test.html` in your browser
2. Click the "Copy to Clipboard" button
3. Follow steps 2-5 above

## ✨ Features

- 🎯 **Toggle between grid and list view** with one click
- 💾 **Persistent preference** (saved in localStorage)
- 🔄 **Works with dynamic content loading** (infinite scroll)
- 🎨 **Mimics YouTube's old list style layout**
- 🔗 **Opens videos in new tabs** automatically
- 🎭 **Visual toggle indicator**:
  - 🟦 "☰ List View" (blue) = List mode active
  - ⬜ "⊞ Grid View" (gray) = Grid mode active

## 📐 List View Layout

```
[Avatar] [Video Title                          ] [⋮]
         [Channel Name • Views • Time ago      ]
─────────────────────────────────────────────────
[Avatar] [Video Title                          ] [⋮]
         [Channel Name • Views • Time ago      ]
```

- One video per row (full width)
- Avatar thumbnail only (48×48px, no large preview image)
- Clean horizontal layout: Avatar | Title & Metadata | Menu
- All video links open in new tab

## 🔧 Development

### Build Bookmarklet

```bash
npm install
npm run build
```

This generates:
- `dist/bookmarklet.txt` - Minified bookmarklet (ready to use)
- `dist/bookmarklet.js` - Readable version

### Local Development

1. **Add YouTube page HTML/CSS to public folder**
   - Save the full HTML from https://www.youtube.com/feed/subscriptions
   - Save associated CSS files
   - These files are gitignored

2. **Test locally**
   - Open your saved HTML file in browser
   - Open browser console (F12)
   - Paste and run the bookmarklet code

3. **Make changes**
   - Edit files in `src/`
   - Run `npm run build`
   - Test the updated bookmarklet

## 📁 Project Structure

```
youtube-subscriptions-list-view/
├── src/
│   ├── bookmarklet.js    # Main bookmarklet logic
│   ├── styles.css        # List view CSS styles
│   └── utils.js          # Helper functions (localStorage, DOM utils)
├── public/
│   ├── test.html         # Interactive installation page
│   └── README.md         # Instructions for adding test files
├── dist/
│   ├── bookmarklet.txt   # 👈 Minified bookmarklet (copy this!)
│   └── bookmarklet.js    # Readable/debuggable version
├── build.js              # Build script (minifies & packages)
├── USAGE.md              # Comprehensive usage guide
├── PLAN.md               # Implementation plan & architecture
└── README.md             # This file
```

## 🔒 Privacy & Security

This bookmarklet:
- ✅ **100% client-side** - Runs entirely in your browser
- ✅ **No external servers** - Doesn't send data anywhere
- ✅ **No tracking** - Doesn't monitor your activity
- ✅ **Open source** - Full source code available for inspection
- ✅ **Minimal storage** - Only saves your view preference (localStorage)

## 🛠️ Technical Details

- **Approach**: Hybrid (minimal DOM manipulation + CSS transforms)
- **Size**: 5,228 characters (minified)
- **Persistence**: localStorage key `yt-list-view-enabled`
- **Toggle Location**: Next to "All subscriptions" button
- **Compatibility**: YouTube subscriptions feed with dynamic loading
- **Browser Support**: Chrome, Firefox, Safari, Edge, Brave

## 📚 More Documentation

- **[USAGE.md](USAGE.md)** - Comprehensive usage guide, troubleshooting, customization
- **[PLAN.md](PLAN.md)** - Implementation details and architecture decisions
- **`public/test.html`** - Interactive installation and testing page

## 🐛 Troubleshooting

**Toggle button doesn't appear?**
- Make sure you're on `youtube.com/feed/subscriptions`
- Refresh the page and try again
- Check browser console (F12) for errors

**List view looks broken?**
- YouTube may have changed their HTML structure
- Open an issue with details
- Try clearing cache and reloading

**Videos don't open in new tab?**
- Should work automatically - if not, please report an issue

See [USAGE.md](USAGE.md) for more troubleshooting tips.

## 🤝 Contributing

Contributions welcome! To contribute:

1. Fork the repository
2. Make your changes in `src/`
3. Run `npm run build` to rebuild
4. Test the bookmarklet thoroughly
5. Submit a pull request

## 📜 License

ISC

## 🙏 Acknowledgments

Built to restore the classic YouTube subscriptions list view that many users miss. Inspired by the community's desire for better content browsing options.
