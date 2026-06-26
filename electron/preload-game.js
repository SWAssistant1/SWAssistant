const { contextBridge, ipcRenderer } = require('electron');

// Matches the isolated world used for executeJavaScriptInIsolatedWorld in
// electron/main.js, so content-script.js sees a real chrome.* shim without
// touching (and breaking) the page's own globals like jQuery.
const CONTENT_SCRIPT_WORLD_ID = 999;

contextBridge.exposeInIsolatedWorld(CONTENT_SCRIPT_WORLD_ID, 'chromeShim', {
  storage: {
    local: {
      get: (keys, callback) => {
        ipcRenderer.invoke('chrome-storage-get', keys).then(callback);
      },
    },
  },
  runtime: {
    getURL: (path) => `swa://app/${String(path).replace(/^\/+/, '')}`,
  },
});
