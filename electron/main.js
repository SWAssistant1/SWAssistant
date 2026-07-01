const { app, BrowserWindow, WebContentsView, ipcMain, protocol, net, session, Menu, globalShortcut } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const url = require('node:url');
const crypto = require('node:crypto');

// Must match CONTENT_SCRIPT_WORLD_ID in electron/preload-game.js.
const CONTENT_SCRIPT_WORLD_ID = 999;

const SWA_DIR = path.join(__dirname, '..', 'SWA');
const GAME_URL = 'https://shinobiworld.pl/';
const STORAGE_FILE = path.join(app.getPath('userData'), 'swa-storage.json');
const CARDS_FILE = path.join(app.getPath('userData'), 'swa-cards.json');
const TAB_BAR_HEIGHT = 38;
const LOGIN_POLL_INTERVAL_MS = 2000;

let mainWindow;
let popupWin;
/** @type {Map<string, { id: string, label: string, autoLabel: boolean, view: WebContentsView, loginPollTimer: NodeJS.Timeout|null }>} */
const cards = new Map();
let activeCardId = null;
let splitCardId = null;

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

function loadCardsConfig() {
  try {
    const data = JSON.parse(fs.readFileSync(CARDS_FILE, 'utf8'));
    if (Array.isArray(data.cards) && data.cards.length) {
      return data;
    }
  } catch {
    // fall through to default below
  }
  return { cards: [{ id: crypto.randomUUID(), label: 'Konto 1', autoLabel: true }], activeId: null };
}

function saveCardsConfig() {
  const data = {
    cards: [...cards.values()].map(({ id, label, autoLabel }) => ({ id, label, autoLabel })),
    activeId: activeCardId,
    splitId: splitCardId,
  };
  fs.mkdirSync(path.dirname(CARDS_FILE), { recursive: true });
  fs.writeFileSync(CARDS_FILE, JSON.stringify(data));
}

function handleSwaRequest(request) {
  const requestUrl = new url.URL(request.url);
  const filePath = path.join(SWA_DIR, decodeURIComponent(requestUrl.pathname));

  if (!filePath.startsWith(SWA_DIR)) {
    return new Response('Forbidden', { status: 403 });
  }

  return net.fetch(url.pathToFileURL(filePath).toString());
}

// protocol.handle() only registers on session.defaultSession; each card has
// its own partitioned session (for isolated logins), so the swa:// handler
// used by the popup and by the game's content-loader bootstrap must be
// registered on every card session too, not just the default one.
function registerSwaProtocol(sess) {
  sess.protocol.handle('swa', handleSwaRequest);
}

function injectContentScripts(webContents) {
  const contentScript = fs.readFileSync(path.join(SWA_DIR, 'content-script.js'), 'utf8');
  const jquery = fs.readFileSync(path.join(SWA_DIR, 'jquery.js'), 'utf8');
  const customStyles = fs.readFileSync(path.join(SWA_DIR, 'custom_styles.css'), 'utf8');

  // Run in an isolated world (like a real Chrome content script) so this
  // jQuery copy never clobbers window.$ for the game's own page scripts.
  // window.chrome already exists in every world, so the preload exposes its
  // shim as chromeShim and we graft the pieces content-script.js needs.
  webContents.executeJavaScriptInIsolatedWorld(CONTENT_SCRIPT_WORLD_ID, [
    {
      code:
        'window.chrome.storage = window.chromeShim.storage;' +
        'window.chrome.runtime = window.chromeShim.runtime;',
    },
    { code: jquery },
    { code: contentScript },
  ]).catch(() => {});
  webContents.insertCSS(customStyles);
}


function serializeCards() {
  return {
    cards: [...cards.values()].map(({ id, label }) => ({ id, label })),
    activeId: activeCardId,
    splitId: splitCardId,
  };
}

// The game page exposes the logged-in character's name and server as
// window.GAME.login / window.GAME.server once login completes; poll for them
// so tabs can show "login (S<server>)" instead of a generic placeholder,
// unless the user renamed the tab manually.
function watchForLogin(id) {
  const card = cards.get(id);
  if (!card) return;

  if (card.loginPollTimer) {
    clearInterval(card.loginPollTimer);
  }

  card.loginPollTimer = setInterval(() => {
    const current = cards.get(id);
    if (!current || !current.autoLabel) {
      clearInterval(card.loginPollTimer);
      return;
    }

    current.view.webContents
      .executeJavaScript(
        '(window.GAME && window.GAME.login) ? { login: window.GAME.login, server: window.GAME.server } : null'
      )
      .then((info) => {
        if (!info || !info.login) return;
        const label = info.server ? `${info.login} (S${info.server})` : info.login;
        if (label !== current.label) {
          current.label = label;
          saveCardsConfig();
          broadcastCards();
        }
      })
      .catch(() => {});
  }, LOGIN_POLL_INTERVAL_MS);
}

function broadcastCards() {
  mainWindow.webContents.send('cards-changed', serializeCards());
}

function layoutActiveCard() {
  const [width, height] = mainWindow.getContentSize();
  const contentHeight = Math.max(height - TAB_BAR_HEIGHT, 0);
  const isSplit = splitCardId !== null && cards.has(splitCardId) && splitCardId !== activeCardId;
  const halfWidth = Math.floor(width / 2);

  cards.forEach((card) => {
    if (card.id === activeCardId) {
      card.view.setBounds(isSplit
        ? { x: 0, y: TAB_BAR_HEIGHT, width: halfWidth, height: contentHeight }
        : { x: 0, y: TAB_BAR_HEIGHT, width, height: contentHeight });
    } else if (isSplit && card.id === splitCardId) {
      card.view.setBounds({ x: halfWidth, y: TAB_BAR_HEIGHT, width: width - halfWidth, height: contentHeight });
    } else {
      card.view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
    }
  });
}

function createCardView(id, label, autoLabel = true) {
  const cardSession = session.fromPartition(`persist:card-${id}`);
  registerSwaProtocol(cardSession);

  const view = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'preload-game.js'),
      contextIsolation: true,
      backgroundThrottling: false,
      session: cardSession,
    },
  });

  view.webContents.on('did-finish-load', () => {
    injectContentScripts(view.webContents);
    watchForLogin(id);
  });
  view.webContents.loadURL(GAME_URL);

  mainWindow.contentView.addChildView(view);

  const card = { id, label, autoLabel, view, loginPollTimer: null };
  cards.set(id, card);
  return card;
}

function addCard(label) {
  const id = crypto.randomUUID();
  createCardView(id, label || `Konto ${cards.size + 1}`, !label);
  switchCard(id);
  saveCardsConfig();
  broadcastCards();
  return id;
}

function removeCard(id) {
  const card = cards.get(id);
  if (!card) return;

  if (card.loginPollTimer) {
    clearInterval(card.loginPollTimer);
  }
  mainWindow.contentView.removeChildView(card.view);
  card.view.webContents.close();
  cards.delete(id);

  let needLayout = false;
  if (splitCardId === id) { splitCardId = null; needLayout = true; }
  if (activeCardId === id) { activeCardId = [...cards.keys()][0] || null; needLayout = true; }
  if (needLayout) layoutActiveCard();

  saveCardsConfig();
  broadcastCards();
}

function switchCard(id) {
  if (!cards.has(id) || id === activeCardId) return;
  if (splitCardId !== null && id === splitCardId) {
    splitCardId = activeCardId;
  }
  activeCardId = id;
  layoutActiveCard();
  saveCardsConfig();
  broadcastCards();
}

function switchToAdjacentCard(offset) {
  const ids = [...cards.keys()];
  if (ids.length < 2) return;
  const currentIndex = ids.indexOf(activeCardId);
  const nextIndex = (currentIndex + offset + ids.length) % ids.length;
  switchCard(ids[nextIndex]);
}

function openActiveCardDevTools() {
  const card = cards.get(activeCardId);
  if (!card) return;
  card.view.webContents.toggleDevTools();
}

function registerCardSwitchShortcut() {
  const menu = Menu.buildFromTemplate([
    {
      label: 'SWAssistant',
      submenu: [
        { label: 'Następna karta', accelerator: 'CmdOrCtrl+Tab', click: () => { switchToAdjacentCard(1); } },
        { label: 'Poprzednia karta', accelerator: 'CmdOrCtrl+Shift+Tab', click: () => { switchToAdjacentCard(-1); } },
        { label: 'Konsola (DevTools)', accelerator: 'F12', click: () => { openActiveCardDevTools(); } },
      ],
    },
  ]);

  const applied = Menu.setApplicationMenu(menu);
  mainWindow.setMenuBarVisibility(false);

  const nextOk = globalShortcut.register('CmdOrCtrl+Tab', () => {
    switchToAdjacentCard(1);
  });
  const prevOk = globalShortcut.register('CmdOrCtrl+Shift+Tab', () => {
    switchToAdjacentCard(-1);
  });
  globalShortcut.register('F12', () => {
    openActiveCardDevTools();
  });
}

function renameCard(id, label) {
  const card = cards.get(id);
  if (!card || !label) return;
  card.label = label;
  card.autoLabel = false;
  if (card.loginPollTimer) {
    clearInterval(card.loginPollTimer);
    card.loginPollTimer = null;
  }
  saveCardsConfig();
  broadcastCards();
}

function registerIpcHandlers() {
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

  ipcMain.handle('chrome-tabs-query', () => {
    const active = cards.get(activeCardId);
    return active ? [{ id: active.view.webContents.id }] : [];
  });

  ipcMain.handle('chrome-scripting-executeScript', (_event, { funcSrc, args }) => {
    const active = cards.get(activeCardId);
    if (!active) return undefined;
    const serializedArgs = args.map((arg) => JSON.stringify(arg)).join(', ');
    return active.view.webContents.executeJavaScript(`(${funcSrc})(${serializedArgs})`);
  });

  ipcMain.handle('cards-list', () => serializeCards());
  ipcMain.handle('cards-add', (_event, label) => addCard(label));
  ipcMain.handle('cards-remove', (_event, id) => removeCard(id));
  ipcMain.handle('cards-switch', (_event, id) => switchCard(id));
  ipcMain.handle('cards-rename', (_event, id, label) => renameCard(id, label));
  ipcMain.handle('cards-split', (_event, id) => {
    if (id && id !== activeCardId && cards.has(id)) {
      splitCardId = (splitCardId === id) ? null : id;
    } else {
      splitCardId = splitCardId !== null ? null : ([...cards.keys()].find(k => k !== activeCardId) || null);
    }
    layoutActiveCard();
    saveCardsConfig();
    broadcastCards();
  });
}

function createWindows() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload-tabbar.js'),
      contextIsolation: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'tabbar.html'));
  mainWindow.on('resize', layoutActiveCard);
  registerCardSwitchShortcut();

  registerIpcHandlers();

  const config = loadCardsConfig();
  config.cards.forEach((card) => createCardView(card.id, card.label, card.autoLabel !== false));
  activeCardId = config.cards.some((c) => c.id === config.activeId)
    ? config.activeId
    : config.cards[0].id;
  splitCardId = (typeof config.splitId === 'string' && config.cards.some((c) => c.id === config.splitId) && config.splitId !== activeCardId)
    ? config.splitId
    : null;
  layoutActiveCard();
  saveCardsConfig();

  popupWin = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload-popup.js'),
      contextIsolation: false,
    },
  });

  popupWin.loadURL('swa://app/popup.html');
}

app.whenReady().then(() => {
  registerSwaProtocol(session.defaultSession);
  createWindows();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
