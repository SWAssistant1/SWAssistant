const requireNode = (node) => {
    if (node == null) throw new Error('Missing target node for script injection');
    return node;
};

function injectCode(src, configUrl, branch) {
    const script = document.createElement('script');
    script.src = src;
    script.dataset.configUrl = configUrl;
    script.dataset.branch = branch;
    script.onload = function() {
        this.remove();
    };

    requireNode(document.head || document.documentElement).appendChild(script);
}

chrome.storage.local.get(['swa_branch'], (result) => {
    const branch = (result.swa_branch || '').trim() || 'main';

    injectCode(
        chrome.runtime.getURL('/content-loader.js'),
        chrome.runtime.getURL('/module-sources.json'),
        branch
    );
});
