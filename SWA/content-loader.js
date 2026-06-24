(function bootstrapSwaLoader() {
  const bootScript = document.currentScript;
  const configUrl = bootScript ? bootScript.dataset.configUrl : '';
  const fallbackModules = [
    {
      id: 'characters-manager',
      url: 'https://raw.githubusercontent.com/SWAssistant1/SWAssistant/main/game-scripts/characters-manager.js'
    },
    {
      id: 'ball-exp',
      url: 'https://raw.githubusercontent.com/SWAssistant1/SWAssistant/main/game-scripts/ball-exp.js'
    },
    {
      id: 'ball-upgrade',
      url: 'https://raw.githubusercontent.com/SWAssistant1/SWAssistant/main/game-scripts/ball-upgrade.js'
    },
    {
      id: 'ball-reset',
      url: 'https://raw.githubusercontent.com/SWAssistant1/SWAssistant/main/game-scripts/ball-reset.js'
    },
    {
      id: 'ball-manager',
      url: 'https://raw.githubusercontent.com/SWAssistant1/SWAssistant/main/game-scripts/ball-manager.js'
    },
    {
      id: 'assistant-core',
      url: 'https://raw.githubusercontent.com/SWAssistant1/SWAssistant/main/game-scripts/assistant-core.js'
    }
  ];

  function injectModuleCode(moduleId, code) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.dataset.swaModule = moduleId;
    script.textContent = code;

    (document.head || document.documentElement).appendChild(script);
    script.remove();
  }

  async function fetchModuleCode(moduleConfig) {
    const response = await fetch(moduleConfig.url, { cache: 'no-store' });

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