const scriptMap = {
  skrypt1: 'scripts/skrypt1.js',
  skrypt2: 'scripts/skrypt2.js',
  skrypt3: 'scripts/skrypt3.js',
  skrypt4: 'scripts/skrypt4.js',
  skrypt5: 'scripts/skrypt5.js',
  skrypt6: 'scripts/skrypt6.js',
  skrypt7: 'scripts/skrypt7.js',
  skrypt8: 'scripts/skrypt8.js',
  skrypt9: 'scripts/skrypt9.js',
  skrypt10: 'scripts/skrypt10.js',
};

function injectPageScript(scriptUrl) {
  const script = document.createElement('script');
  script.src = scriptUrl;
  script.onload = function onLoad() {
    this.remove();
  };

  (document.head || document.documentElement).appendChild(script);
}

const attachScriptHandler = (checkboxId, scriptFile) => {
  const checkbox = document.getElementById(checkboxId);

  if (!checkbox) {
    return;
  }

  checkbox.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab || typeof tab.id === 'undefined') {
      return;
    }

    const scriptUrl = chrome.runtime.getURL(scriptFile);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: injectPageScript,
      args: [scriptUrl],
    });
  });
};

Object.entries(scriptMap).forEach(([checkboxId, scriptFile]) => {
  attachScriptHandler(checkboxId, scriptFile);
});