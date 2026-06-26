const { ipcRenderer } = require('electron');

window.chrome = window.chrome || {};

window.chrome.tabs = {
  query: (_queryInfo) => ipcRenderer.invoke('chrome-tabs-query'),
};

window.chrome.scripting = {
  executeScript: ({ func, args }) =>
    ipcRenderer.invoke('chrome-scripting-executeScript', {
      funcSrc: func.toString(),
      args,
    }),
};

window.chrome.runtime = {
  getURL: (path) => `swa://app/${String(path).replace(/^\/+/, '')}`,
};

window.chrome.storage = {
  local: {
    get: (keys, callback) => {
      ipcRenderer.invoke('chrome-storage-get', keys).then(callback);
    },
    set: (items) => ipcRenderer.invoke('chrome-storage-set', items),
  },
};
