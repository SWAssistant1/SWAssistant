const automationRegistry = {
  characterTraining: { scriptFile: 'scripts/character-training.js' },
  respawn: { scriptFile: 'scripts/respawn.js' },
  exp: { scriptFile: 'scripts/exp.js' },
  wars: { scriptFile: 'scripts/wars.js' },
  insta30: { scriptFile: 'scripts/insta30.js' },
  missions: { scriptFile: 'scripts/missions.js' },
  automation7: { scriptFile: 'scripts/automation-7.js' },
  automation8: { scriptFile: 'scripts/automation-8.js' },
  automation9: { scriptFile: 'scripts/automation-9.js' },
  automation10: { scriptFile: 'scripts/automation-10.js' },
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

Object.entries(automationRegistry).forEach(([automationId, automation]) => {
  const checkbox = document.querySelector(`[data-automation="${automationId}"]`);

  if (!checkbox || !automation || !automation.scriptFile) {
    return;
  }

  attachScriptHandler(checkbox.id, automation.scriptFile);
});

const branchInput = document.getElementById('swaBranch');

if (branchInput) {
  chrome.storage.local.get(['swa_branch'], (result) => {
    branchInput.value = result.swa_branch || '';
  });

  branchInput.addEventListener('change', () => {
    chrome.storage.local.set({ swa_branch: branchInput.value.trim() });
  });
}