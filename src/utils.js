// Utility functions for YouTube List View bookmarklet

/**
 * Get list view preference from localStorage
 */
function getListViewPreference() {
  try {
    return localStorage.getItem('yt-list-view-enabled') === 'true';
  } catch (e) {
    return false;
  }
}

/**
 * Set list view preference in localStorage
 */
function setListViewPreference(enabled) {
  try {
    localStorage.setItem('yt-list-view-enabled', enabled ? 'true' : 'false');
  } catch (e) {
    console.warn('Failed to save list view preference');
  }
}

/**
 * Wait for element to appear in DOM
 */
function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Timeout waiting for ${selector}`));
    }, timeout);
  });
}

/**
 * Apply target="_blank" to video links
 */
function applyTargetBlank(container) {
  // Target video title links in the new YouTube structure
  const links = container.querySelectorAll('a.yt-lockup-metadata-view-model__title, a.yt-lockup-view-model__content-image');
  links.forEach(link => {
    if (link.href && link.href.includes('/watch?v=')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}
