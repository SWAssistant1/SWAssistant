const scriptMap = {
  skrypt1: 'scripts/skrypt11.js',
  skrypt2: 'scripts/skrypt21.js',
  skrypt3: 'scripts/skrypt31.js',
  skrypt4: 'scripts/skrypt41.js',
  skrypt5: 'scripts/skrypt51.js',
  skrypt6: 'scripts/skrypt61.js',
  skrypt7: 'scripts/skrypt71.js',
  skrypt8: 'scripts/skrypt81.js',
  skrypt9: 'scripts/skrypt91.js',
  skrypt10: 'scripts/skrypt101.js',
};

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

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: [scriptFile],
    });
  });
};

Object.entries(scriptMap).forEach(([checkboxId, scriptFile]) => {
  attachScriptHandler(checkboxId, scriptFile);
});