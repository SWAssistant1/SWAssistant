(function bootstrapSwaLoader() {
  const bootScript = document.currentScript;
  const configUrl = bootScript ? bootScript.dataset.configUrl : '';
  const branch = (bootScript && bootScript.dataset.branch) || 'main';

  // Exposed so other dynamically fetched modules (e.g. assistant-core.js's
  // own afo-panel.js loader) can target the same branch.
  window.__SWA_BRANCH__ = branch;

  const fallbackModules = [
    { id: 'characters-manager', path: 'game-scripts/characters-manager.js' },
    { id: 'ball-exp', path: 'game-scripts/ball-exp.js' },
    { id: 'ball-upgrade', path: 'game-scripts/ball-upgrade.js' },
    { id: 'ball-reset', path: 'game-scripts/ball-reset.js' },
    { id: 'ball-manager', path: 'game-scripts/ball-manager.js' },
    { id: 'assistant-core', path: 'game-scripts/assistant-core.js' }
  ];

  function buildModuleUrl(moduleConfig) {
    if (moduleConfig.url) return moduleConfig.url; // backwards compatibility
    return 'https://raw.githubusercontent.com/SWAssistant1/SWAssistant/' + branch + '/' + moduleConfig.path;
  }

  function injectModuleCode(moduleId, code) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.dataset.swaModule = moduleId;
    script.textContent = code;

    (document.head || document.documentElement).appendChild(script);
    script.remove();
  }

  async function fetchModuleCode(moduleConfig) {
    const response = await fetch(buildModuleUrl(moduleConfig), { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(moduleConfig.id + ' HTTP ' + response.status);
    }

    return response.text();
  }

  async function runLoader() {
    try {
      let modules = fallbackModules;

      if (configUrl) {
        const configResponse = await fetch(configUrl, { cache: 'no-store' });

        if (configResponse.ok) {
          const config = await configResponse.json();
          if (Array.isArray(config.modules) && config.modules.length) {
            modules = config.modules;
          }
        } else {
          console.warn('[SWA] Cannot load module config, using fallback list.');
        }
      } else {
        console.warn('[SWA] Missing module config URL, using fallback list.');
      }

      for (const moduleConfig of modules) {
        try {
          const code = await fetchModuleCode(moduleConfig);
          injectModuleCode(moduleConfig.id, code);
          console.info('[SWA] Module injected:', moduleConfig.id);
        } catch (error) {
          console.error('[SWA] Module load failed:', moduleConfig.id, error);
        }
      }
    } catch (error) {
      console.error('[SWA] Loader bootstrap failed:', error);
    }
  }

  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => {
      void runLoader();
    }, { once: true });
  } else {
    void runLoader();
  }
})();