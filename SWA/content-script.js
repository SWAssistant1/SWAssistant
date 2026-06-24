const requireNode = (node) => {
    if (node == null) throw new Error('Missing target node for script injection');
    return node;
};

function injectCode(src, configUrl) {
    const script = document.createElement('script');
    script.src = src;
    script.dataset.configUrl = configUrl;
    script.onload = function() {
        this.remove();
    };

    requireNode(document.head || document.documentElement).appendChild(script);
}

injectCode(
    chrome.runtime.getURL('/content-loader.js'),
    chrome.runtime.getURL('/module-sources.json')
);
