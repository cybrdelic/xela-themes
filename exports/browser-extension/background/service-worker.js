const STORAGE_KEY = 'xela_theme_id';

// When popup saves a new theme, broadcast it to all matching tabs
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'sync' || !changes[STORAGE_KEY]) return;
  const themeId = changes[STORAGE_KEY].newValue;
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      if (!tab.id || !tab.url) continue;
      const matchesSite = [
        'github.com', 'google.com', 'chatgpt.com', 'chat.openai.com', 'linkedin.com'
      ].some(host => tab.url.includes(host));
      if (!matchesSite) continue;
      chrome.tabs.sendMessage(tab.id, { type: 'XELA_SET_THEME', themeId }).catch(() => {});
    }
  });
});
