const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('swaCards', {
  list: () => ipcRenderer.invoke('cards-list'),
  add: (label) => ipcRenderer.invoke('cards-add', label),
  remove: (id) => ipcRenderer.invoke('cards-remove', id),
  switch: (id) => ipcRenderer.invoke('cards-switch', id),
  rename: (id, label) => ipcRenderer.invoke('cards-rename', id, label),
  onChanged: (callback) => {
    ipcRenderer.on('cards-changed', (_event, state) => callback(state));
  },
});
