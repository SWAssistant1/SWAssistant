if (typeof GAME !== 'undefined' || !extrapremium) {
    let Pog = setInterval(() => {
        if (!GAME.pid) return;
        clearInterval(Pog);
    }, 50);

    let Pgg = setInterval(() => {
        clearInterval(Pgg);
        for (var i in GAME) {
            if (i.indexOf("socxxx") === 0 && i.lastIndexOf("ket") + 3 === i.length) {
                GAME.socket = GAME[i];
                break;
            }
        }

        var branch = window.__SWA_BRANCH__ || 'main';
        // class.js must finish first (it sets window.Assistant, which every
        // other file reads at top level); bootstrap.js must run last (it
        // instantiates Assistant). The rest have no ordering dependency on each
        // other, so they load in parallel between those two.
        var CLASS_FILE = 'game-scripts/assistant/class.js';
        var BOOTSTRAP_FILE = 'game-scripts/assistant/bootstrap.js';
        var files = [
            'game-scripts/assistant/core-methods.js',
            'game-scripts/assistant/tournaments.js',
            'game-scripts/assistant/minimap.js',
            'game-scripts/assistant/top-bar.js',
            'game-scripts/assistant/auto-arena-abyss.js',
            'game-scripts/assistant/fight.js',
            'game-scripts/assistant/alt-pilot.js',
            'game-scripts/assistant/char-nav.js',
            'game-scripts/assistant/misc.js'
        ];
        var MAX_ATTEMPTS = 4;

        function injectCode(code) {
            var script = document.createElement('script');
            script.textContent = code;
            document.head.appendChild(script);
            script.remove();
        }

        function fetchFile(file, attempt, onSuccess, onFailure) {
            var url = 'https://raw.githubusercontent.com/SWAssistant1/SWAssistant/' + branch + '/' + file + '?t=' + Date.now();
            $.get(url, function (data) {
                onSuccess(data);
            }).fail(function () {
                if (attempt >= MAX_ATTEMPTS) {
                    onFailure();
                    return;
                }
                console.warn('[ASSISTANT] Retry', attempt + 1, 'for', file);
                setTimeout(() => fetchFile(file, attempt + 1, onSuccess, onFailure), 400 * attempt);
            });
        }

        function loadBootstrap() {
            fetchFile(BOOTSTRAP_FILE, 1, function (data) {
                injectCode(data);
                console.info('[ASSISTANT] Module injected:', BOOTSTRAP_FILE);
            }, function () {
                console.error('[ASSISTANT] Module load failed after retries:', BOOTSTRAP_FILE);
            });
        }

        function loadAll() {
            var remaining = files.length;

            function oneDone() {
                remaining--;
                if (remaining === 0) {
                    loadBootstrap();
                }
            }

            files.forEach(function (file) {
                fetchFile(file, 1, function (data) {
                    injectCode(data);
                    console.info('[ASSISTANT] Module injected:', file);
                    oneDone();
                }, function () {
                    console.error('[ASSISTANT] Module load failed after retries:', file);
                    oneDone();
                });
            });
        }

        fetchFile(CLASS_FILE, 1, function (data) {
            injectCode(data);
            console.info('[ASSISTANT] Module injected:', CLASS_FILE);
            loadAll();
        }, function () {
            console.error('[ASSISTANT] Module load failed after retries:', CLASS_FILE);
        });
    });
}
