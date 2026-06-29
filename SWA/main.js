const branchInput = document.getElementById('swaBranch');

if (branchInput) {
  chrome.storage.local.get(['swa_branch'], (result) => {
    branchInput.value = result.swa_branch || '';
  });

  branchInput.addEventListener('input', () => {
    chrome.storage.local.set({ swa_branch: branchInput.value.trim() });
  });
}
