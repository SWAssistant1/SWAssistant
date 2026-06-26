const { app, BrowserWindow, ipcMain, protocol, net } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const url = require('node:url');

// Must match CONTENT_SCRIPT_WORLD_ID in electron/preload-game.js.
const CONTENT_SCRIPT_WORLD_ID = 999;

const SWA_DIR = path.join(__dirname, '..', 'SWA');
const GAME_URL = 'https://shinobiworld.pl/';
const STORAGE_FILE = path.join(app.getPath('userData'), 'swa-storage.json');

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'swa',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
    },
  },
]);

function readStorage() {
  try {
    return JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function writeStorage(data) {
  fs.mkdirSync(path.dirname(STORAGE_FILE), { recursive: true });
  fs.writeFileSync(STORAGE_FILE, JSON.stringify(data));
}

function registerSwaProtocol() {
  protocol.handle('swa', (request) => {
    const requestUrl = new url.URL(request.url);
    const filePath = path.join(SWA_DIR, decodeURIComponent(requestUrl.pathname));

    if (!filePath.startsWith(SWA_DIR)) {
      return new Response('Forbidden', { status: 403 });
    }

    return net.fetch(url.pathToFileURL(filePath).toString());
  });
}

function registerIpcHandlers(gameWin) {
  ipcMain.handle('chrome-storage-get', (_event, keys) => {
    const storage = readStorage();

    if (!keys) {
      return storage;
    }

    const keyList = Array.isArray(keys) ? keys : [keys];
    const result = {};
    keyList.forEach((key) => {
      if (key in storage) {
        result[key] = storage[key];
      }
    });
    return result;
  });

  ipcMain.handle('chrome-storage-set', (_event, items) => {
    const storage = readStorage();
    writeStorage({ ...storage, ...items });
  });

  ipcMain.handle('chrome-tabs-query', () => [{ id: gameWin.webContents.id }]);

  ipcMain.handle('chrome-scripting-executeScript', (_event, { funcSrc, args }) => {
    const serializedArgs = args.map((arg) => JSON.stringify(arg)).join(', ');
    return gameWin.webContents.executeJavaScript(`(${funcSrc})(${serializedArgs})`);
  });
}

function injectContentScripts(gameWin) {
  const contentScript = fs.readFileSync(path.join(SWA_DIR, 'content-script.js'), 'utf8');
  const jquery = fs.readFileSync(path.join(SWA_DIR, 'jquery.js'), 'utf8');
  const customStyles = fs.readFileSync(path.join(SWA_DIR, 'custom_styles.css'), 'utf8');

  // Run in an isolated world (like a real Chrome content script) so this
  // jQuery copy never clobbers window.$ for the game's own page scripts.
  // window.chrome already exists in every world, so the preload exposes its
  // shim as chromeShim and we graft the pieces content-script.js needs.
  gameWin.webContents.executeJavaScriptInIsolatedWorld(CONTENT_SCRIPT_WORLD_ID, [
    {
      code:
        'window.chrome.storage = window.chromeShim.storage;' +
        'window.chrome.runtime = window.chromeShim.runtime;',
    },
    { code: jquery },
    { code: contentScript },
  ]).catch(() => {});
  gameWin.webContents.insertCSS(customStyles);
}

function createWindows() {
  const gameWin = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload-game.js'),
      contextIsolation: true,
      backgroundThrottling: false,
    },
  });

  gameWin.webContents.on('did-finish-load', () => injectContentScripts(gameWin));
  gameWin.loadURL(GAME_URL);

  const popupWin = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload-popup.js'),
      contextIsolation: false,
    },
  });

  popupWin.loadURL('swa://app/popup.html');

  registerIpcHandlers(gameWin);
}

app.whenReady().then(() => {
  registerSwaProtocol();
  createWindows();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
