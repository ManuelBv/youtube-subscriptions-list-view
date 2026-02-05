// YouTube List View Bookmarklet
// Main execution code

(function() {
  'use strict';

  // Check if we're on YouTube subscriptions feed
  if (!window.location.href.includes('youtube.com/feed/subscriptions')) {
    alert('This bookmarklet only works on YouTube subscriptions feed!\nNavigate to: https://www.youtube.com/feed/subscriptions');
    return;
  }

  // Check if already initialized
  if (document.getElementById('yt-list-view-toggle')) {
    console.log('List view toggle already exists');
    return;
  }

  /**
   * Inject CSS styles
   */
  function injectStyles() {
    if (document.getElementById('yt-list-view-styles')) {
      return;
    }

    const styleEl = document.createElement('style');
    styleEl.id = 'yt-list-view-styles';
    styleEl.textContent = CSS_STYLES;
    document.head.appendChild(styleEl);
  }

  /**
   * Toggle list view on/off
   */
  function toggleListView() {
    const isEnabled = document.body.classList.toggle('yt-list-view-enabled');
    setListViewPreference(isEnabled);

    const toggleBtn = document.getElementById('yt-list-view-toggle');
    if (toggleBtn) {
      toggleBtn.classList.toggle('active', isEnabled);
      toggleBtn.textContent = isEnabled ? '☰ List View' : '⊞ Grid View';
    }

    // Apply target="_blank" to all video links
    if (isEnabled) {
      applyTargetBlank(document.body);
    }
  }

  /**
   * Create and inject toggle button
   */
  async function createToggleButton() {
    try {
      // Wait for the channels link to appear
      // TODO: Update selector based on actual YouTube DOM
      const channelsLink = await waitForElement('a[href="/feed/channels"]');

      if (!channelsLink) {
        console.error('Could not find channels link');
        return;
      }

      // Create toggle button
      const toggleBtn = document.createElement('button');
      toggleBtn.id = 'yt-list-view-toggle';
      toggleBtn.className = 'yt-list-view-toggle';
      toggleBtn.textContent = getListViewPreference() ? '☰ List View' : '⊞ Grid View';

      if (getListViewPreference()) {
        toggleBtn.classList.add('active');
      }

      toggleBtn.addEventListener('click', toggleListView);

      // Insert button next to channels link
      channelsLink.parentElement.insertAdjacentElement('afterend', toggleBtn);

    } catch (error) {
      console.error('Failed to create toggle button:', error);
    }
  }

  /**
   * Set up MutationObserver for dynamic content
   */
  function observeDynamicContent() {
    const observer = new MutationObserver((mutations) => {
      if (!document.body.classList.contains('yt-list-view-enabled')) {
        return;
      }

      // Check if new video items were added
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          applyTargetBlank(document.body);
          break;
        }
      }
    });

    // Observe the main content container
    // TODO: Update selector based on actual YouTube DOM
    const contentContainer = document.querySelector('#contents.ytd-rich-grid-renderer');
    if (contentContainer) {
      observer.observe(contentContainer, {
        childList: true,
        subtree: true
      });
    }
  }

  /**
   * Initialize
   */
  async function init() {
    console.log('🎬 Initializing YouTube List View...');

    // Inject CSS
    injectStyles();

    // Create toggle button
    await createToggleButton();

    // Apply saved preference
    const savedPreference = getListViewPreference();
    if (savedPreference) {
      document.body.classList.add('yt-list-view-enabled');
      applyTargetBlank(document.body);
    }

    // Set up observer for dynamic content
    observeDynamicContent();

    console.log('✅ YouTube List View initialized!');
  }

  // Run initialization
  init();

})();
