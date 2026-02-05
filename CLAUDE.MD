# Claude CLI Context: YouTube Subscriptions List View

This repository contains a browser bookmarklet that restores the classic list view for YouTube's subscriptions feed page. It is built using vanilla JavaScript, CSS, and a Node.js build system.

## Purpose

The primary purpose of this project is to provide users with an alternative viewing mode for YouTube subscriptions that mimics the old list-style layout. YouTube removed the list view option, forcing users to view subscriptions only in grid mode. This bookmarklet:
- Toggles between grid and list view on youtube.com/feed/subscriptions
- Hides large video thumbnails and displays only channel avatars
- Shows one video per row with title, channel name, and metadata
- Persists user preference in localStorage
- Opens all video links in new tabs
- Supports YouTube Shorts in list format
- Works with infinite scroll / dynamic content loading

## Project Structure

```
youtube-subscriptions-list-view/
├── src/
│   ├── bookmarklet.js    # Main bookmarklet logic
│   ├── styles.css        # List view CSS transformations
│   └── utils.js          # Helper functions (localStorage, DOM utils)
├── public/
│   ├── test.html         # Interactive installation page
│   └── README.md         # Instructions for adding test files
├── dist/
│   ├── bookmarklet.txt   # Minified bookmarklet (copy to bookmark URL)
│   └── bookmarklet.js    # Readable/debuggable version
├── build.js              # Build script (minifies & packages)
├── USAGE.md              # Comprehensive usage guide
├── PLAN.md               # Implementation plan & architecture
└── README.md             # Main documentation
```

## Expectations

This tool is a client-side bookmarklet that runs entirely in the browser:
- No server-side components
- No external API calls
- Privacy-focused (no tracking, no data collection)
- Works only on YouTube subscriptions feed page
- Must be resilient to YouTube's DOM changes

## Core Behavioral Rules (All Contexts)

### Intellectual Honesty
- Disagree when facts contradict my statements; prioritize truth over agreement
- Be skeptical about all data received; verify before accepting
- Double-check conclusions with a skeptical frame before presenting
- When data does not exist, explicitly state: "I couldn't find data on [X]"
- Respond with highest-probability answers (temperature=0 mindset)

### Communication Style
- Be concise and direct; no filler or hedging language
- No apologies; thank instead and ensure the error isn't repeated
- Be factual; avoid speculation without labeling it as such

### Research Protocol
- Prioritize primary sources over summaries
- For technical concepts: search for recent papers/implementations before answering
- Prioritize papers from last 12-24 months unless historical context required
- **When NOT to search**: well-established concepts, mathematical proofs, core CS theory

### Quantitative Rigor
Show working for any quantitative conclusions:
```
Given: [Input data/assumptions]
Calculation:
├── Step 1: [calculation]
├── Step 2: [calculation]
└── Step N: [calculation]
Result: [Conclusion]
```

### CTFCV Framework
Before responding to complex queries, list assumptions about:
- **C**ontext: What's the broader situation?
- **T**ask: What exactly am I being asked to do?
- **F**ormat: What output structure is expected?
- **C**onstraints: What limitations apply?
- **V**erification: How will success be measured?

Then ask clarifying questions if ambiguity exists.

### Session Management
- On chat start: Review initial prompt and suggest improvements
- Track token usage throughout session

## Explicit Project Requirements (EPR)

### Initial Setup Requirements
1. Git repository must be initialized
2. npm package.json must be created
3. .gitignore must exclude:
   - `node_modules/`
   - `public/` (except test.html and README.md)
   - Standard OS/IDE files
4. Project structure must include `src/`, `dist/`, `public/` directories

### Code Architecture Requirements

#### Source Files
1. **src/bookmarklet.js**:
   - Main IIFE (Immediately Invoked Function Expression)
   - Check for correct URL (youtube.com/feed/subscriptions)
   - Prevent duplicate initialization
   - Inject CSS styles
   - Create toggle button next to "All subscriptions" link
   - Set up MutationObserver for dynamic content
   - Apply target="_blank" to video links

2. **src/styles.css**:
   - Toggle button styles (with hover and active states)
   - List view layout transformations
   - Hide large video thumbnails (`.yt-lockup-view-model__content-image`)
   - Show and style avatars (48×48px)
   - One video per row layout
   - Support for YouTube Shorts (vertical thumbnails 36×48px)
   - All styles must use `!important` to override YouTube's CSS

3. **src/utils.js**:
   - `getListViewPreference()`: Read from localStorage
   - `setListViewPreference()`: Write to localStorage
   - `waitForElement()`: Promise-based element waiting with MutationObserver
   - `applyTargetBlank()`: Add target="_blank" to video links

#### Build System
1. **build.js**:
   - Read all source files
   - Minify CSS (remove comments, collapse whitespace)
   - Inline CSS into JS as string constant
   - Minify JS using Terser
   - Wrap in bookmarklet format: `javascript:(function(){...})();`
   - Output to `dist/bookmarklet.txt` and `dist/bookmarklet.js`

### DOM Selectors (Critical - Must Match YouTube's Structure)

#### Regular Videos
- Container: `ytd-rich-grid-renderer #contents`
- Video items: `ytd-rich-item-renderer`
- Video card: `.yt-lockup-view-model.yt-lockup-view-model--vertical`
- Large thumbnail (hide): `a.yt-lockup-view-model__content-image`
- Avatar: `yt-avatar-shape`, `.yt-spec-avatar-shape`
- Title: `.yt-lockup-metadata-view-model__title`
- Channel name: `.yt-core-attributed-string__link`
- Metadata: `yt-content-metadata-view-model`

#### YouTube Shorts
- Container: `ytd-rich-shelf-renderer[is-shorts] #contents`
- Shorts items: `ytd-rich-shelf-renderer[is-shorts] ytd-rich-item-renderer`
- Shorts lockup: `ytm-shorts-lockup-view-model`, `ytm-shorts-lockup-view-model-v2`
- Thumbnail container: `.shortsLockupViewModelHostThumbnailParentContainer`
- Metadata: `.shortsLockupViewModelHostOutsideMetadata`
- Title: `.shortsLockupViewModelHostMetadataTitle`

#### Toggle Button Placement
- Find element: `a[href="/feed/channels"]` (relative path, not full URL)
- Insert after: `#subscribe-button` container

### Functionality Requirements

#### Toggle Behavior
1. Button must show current state:
   - Grid mode: "⊞ Grid View" (gray background)
   - List mode: "☰ List View" (blue background #3ea6ff)
2. Clicking toggles `yt-list-view-enabled` class on `<body>`
3. State saved to `localStorage` key: `yt-list-view-enabled`
4. Preference auto-applied on page load

#### List View Layout
1. One video per row (full width)
2. Horizontal flex layout: `[Avatar] [Title + Metadata] [Menu]`
3. Avatar: 48×48px, left-aligned
4. Large thumbnail: hidden completely
5. Title: 14px font, 2-line clamp
6. Metadata: 12px font, gray color (#aaa)
7. Border separator: 1px solid rgba(255,255,255,0.1)

#### Shorts Handling
1. Display in list format (not grid)
2. Vertical thumbnail: 36×48px (matches aspect ratio)
3. Horizontal layout with metadata inline
4. Same styling as regular videos

#### Dynamic Content Support
1. MutationObserver watches `ytd-rich-grid-renderer #contents`
2. When new nodes added, re-apply target="_blank" to new links
3. Only observe when list view is enabled

#### Link Behavior
1. All video links must have `target="_blank"`
2. Add `rel="noopener noreferrer"` for security
3. Apply to selectors:
   - `a.yt-lockup-metadata-view-model__title`
   - `a.yt-lockup-view-model__content-image`

### Development Workflow

#### Making Changes
1. Edit files in `src/`
2. Run `npm run build` to regenerate bookmarklet
3. Test on saved HTML file or live YouTube
4. Update bookmark with new code from `dist/bookmarklet.txt`

#### Testing Protocol
1. Save YouTube subscriptions page HTML to `public/` (gitignored)
2. Open saved HTML in browser
3. Paste bookmarklet code in console
4. Verify toggle button appears
5. Verify list view layout
6. Verify grid view toggle back
7. Test on live YouTube site

#### Git Commit Guidelines
1. Use semantic commit messages
2. Include "Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
3. Update README with new bookmarklet code when changed
4. Always rebuild before committing

### Documentation Requirements

#### README.md Must Include
1. Full bookmarklet code in first section (easy copy)
2. Step-by-step installation instructions
3. Visual layout example
4. Features list
5. Privacy & security section
6. Browser compatibility
7. Troubleshooting tips

#### USAGE.md Must Include
1. Detailed usage instructions
2. Customization examples
3. Common modifications
4. Troubleshooting guide
5. Testing procedures

### Troubleshooting Common Issues

#### Issue: Toggle button doesn't appear
**Root causes:**
- Selector for "All subscriptions" link changed
- YouTube uses full URL in saved HTML, relative path in live site
- Element not yet loaded when script runs

**Solutions:**
- Use relative path: `a[href="/feed/channels"]` (not full URL)
- Increase `waitForElement` timeout
- Check console for errors

#### Issue: Shorts display oversized
**Root causes:**
- Shorts use different elements: `ytm-shorts-lockup-view-model`
- Grid layout not overridden for shorts container

**Solutions:**
- Target `ytd-rich-shelf-renderer[is-shorts]`
- Override `#contents` display to column
- Constrain thumbnail size (36×48px)

#### Issue: List view doesn't apply
**Root causes:**
- CSS specificity too low
- YouTube's styles override bookmarklet
- Wrong selectors for current YouTube structure

**Solutions:**
- Use `!important` on all CSS rules
- Inspect live YouTube DOM for current selectors
- Test on live site, not just saved HTML

### Security Considerations

1. **No external requests**: Bookmarklet runs entirely client-side
2. **No data collection**: Only localStorage for user preference
3. **Content Security Policy**: Bookmarklet must not violate CSP
4. **XSS prevention**: No eval(), no innerHTML with user input
5. **Link safety**: Add `rel="noopener noreferrer"` to all external links

### Performance Considerations

1. **Minification**: Keep bookmarklet size under 10KB
2. **CSS injection**: Only inject once, check for existing style element
3. **MutationObserver**: Only observe when list view enabled
4. **Debouncing**: Not required for MutationObserver (YouTube handles efficiently)

### Code Quality Standards

1. **ES6+**: Use modern JavaScript (arrow functions, const/let, template literals)
2. **Error handling**: Try-catch for localStorage operations
3. **Graceful degradation**: Alert user if not on subscriptions page
4. **No dependencies**: Pure vanilla JS, no libraries
5. **Readability**: Readable version in `dist/bookmarklet.js` for debugging

## Session Archival Protocol

### User Command
When the user requests to "store this session" or "save this conversation", follow this protocol to create a comprehensive session archive file.

### Archive File Naming
Format: `[YYYY-MM-DD]-CLAUDE-[subject].md`

Example: `2026-02-05-CLAUDE-youtube-list-view-bookmarklet-implementation.md`

### Required Content Structure

Generate a complete session archive file with the following sections:

#### 1. Header Metadata
- Date (YYYY-MM-DD)
- Session Subject (descriptive title)
- Duration estimate
- Status (Completed/In Progress)
- Completeness indicator (100% - All conversation + technical details)

#### 2. Conversation Flow Section
For each user message, include:
- **User Request**: Exact user message text in blockquote format
- **Claude Response**: Summary of what Claude responded
- **Actions Taken**: Bullet list of what was executed
- **Sample Results**: Key outputs or file changes

#### 3. Technical Execution Details Section
For each major action/file modification, include:
- **File Path**: Absolute path to the file
- **File Details**: Total lines, language, type
- **Original Content**: Code/text before changes (in code blocks)
- **New Content**: Code/text after changes (in code blocks)
- **Changes Made**: Bullet list of modifications
- **Status**: ✅/❌ indicator

#### 4. Tool Calls & Outputs Section
For each bash/tool command executed:
- **Command**: Exact command with proper formatting
- **Output**: Complete command output
- **Exit Code**: Success/failure indicator
- **Impact**: What changed as a result

#### 5. Git History Section (if applicable)
- Commit hashes
- Commit messages
- Files changed
- Insertions/deletions
- Push status and results

#### 6. Summary & Metrics Section
Include:
- Table of all actions performed with status
- File statistics (paths, lines, actions)
- Total counts (files modified, created, renamed)
- Timeline breakdown by phase
- Key achievements checklist

#### 7. Code Review Notes (if applicable)
- Security considerations
- Performance impacts
- Testing coverage
- Breaking changes

#### 8. Complete File Listing (if applicable)
For bulk operations (file renames, creations):
- Complete numbered list of all files
- Before/after names for renames
- Status for each file

#### 9. Timeline Section
Table with columns:
- Step/Phase
- Action description
- Duration
- Status

### Quality Standards

**Completeness**: ✅ Must include ALL conversation details and technical execution
- No summarization that omits details
- Full code diffs for every edit
- Complete command outputs
- All user questions and Claude responses

**Accuracy**: ✅ All information must be factual
- Exact file paths (not approximations)
- Actual code snippets (not paraphrased)
- Real command outputs (not examples)
- Correct timestamps and dates
- Actual line numbers and file lengths

**Organization**: ✅ Logical, easy-to-navigate structure
- Clear section headings
- Numbered or bulleted lists
- Code blocks with syntax highlighting
- Tables for metrics and comparisons
- Proper markdown formatting

**Comprehensiveness**: ✅ Nothing important is left out
- Every file edited is documented
- Every command executed is shown
- Every user interaction is captured
- Full before/after for all changes
- All git operations logged

### Minimum Sections Required
1. ✅ Conversation flow with all user messages
2. ✅ Detailed technical execution for each major action
3. ✅ Complete code/content changes with diffs
4. ✅ All command outputs and results
5. ✅ Git history (if applicable)
6. ✅ Summary metrics and timeline
7. ✅ Complete status indicators

### Trigger Phrases
Create session archive when user says:
- "save this conversation"
- "store this session"
- "archive this conversation"
- "save this to conversations"
- "create a session file"
- "store this in [folder]"
- "store this session as epr instructions" (update CLAUDE.MD EPR section)

### Special Instructions
- **Timestamps**: Include session date (today's date in YYYY-MM-DD format)
- **Tool Calls**: Show every bash command, read operation, edit operation
- **Outputs**: Capture actual tool outputs, not summaries
- **Code Context**: Show surrounding code and file context when possible
- **Security**: Highlight any security considerations or patterns
- **Completeness Check**: Verify every action in conversation is documented

---
