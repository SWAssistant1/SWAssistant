if (typeof GAME === 'undefined') {} else {
    (function () {
        var branch = window.__SWA_BRANCH__ || 'main';
        var files = [
            'game-scripts/afo/fixes.js',
            'game-scripts/afo/core.js',
            'game-scripts/afo/kom.js',
            'game-scripts/afo/eq-sets.js',
            'game-scripts/afo/card-sets.js',
            'game-scripts/afo/inne.js',
            'game-scripts/afo/pvp.js',
            'game-scripts/afo/resp.js',
            'game-scripts/afo/res.js'
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
                console.warn('[AFO] Retry', attempt + 1, 'for', file);
                setTimeout(() => fetchFile(file, attempt + 1, onSuccess, onFailure), 400 * attempt);
            });
        }

        function loadAll() {
            var remaining = files.length;

            function oneDone() {
                remaining--;
                if (remaining === 0) {
                    bootstrap();
                }
            }

            files.forEach(function (file) {
                fetchFile(file, 1, function (data) {
                    injectCode(data);
                    console.info('[AFO] Module injected:', file);
                    oneDone();
                }, function () {
                    console.error('[AFO] Module load failed after retries:', file);
                    GAME.komunikat('Błąd ładowania AFO (' + file + '), odśwież stronę i spróbuj ponownie!');
                    oneDone();
                });
            });
        }

        function bootstrap() {
            setTimeout(() => {
                if (GAME.maploaded) {
                    RES.listMines();
                }
            }, 500);

            createPanel();
            setTimeout(() => {
                GAME.socket.emit('ga', {
                    a: 50,
                    type: 0,
                    empire: GAME.char_data.empire
                });
            }, 300);
            setTimeout(() => {
                GAME.emitOrder({
                    a: 39,
                    type: 0
                });
            }, 600);
            setTimeout(() => {
                GAME.emitOrder({
                    a: 39,
                    type: 23
                });
            }, 900);
        }

        setTimeout(() => loadAll(), 50);
    })();
}
