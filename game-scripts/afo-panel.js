if (typeof GAME === 'undefined') {} else {
    (function () {
        var branch = window.__SWA_BRANCH__ || 'main';
        var files = [
            'game-scripts/afo-fixes.js',
            'game-scripts/afo-core.js',
            'game-scripts/afo-kom.js',
            'game-scripts/afo-eq-sets.js',
            'game-scripts/afo-card-sets.js',
            'game-scripts/afo-inne.js',
            'game-scripts/afo-pvp.js',
            'game-scripts/afo-resp.js',
            'game-scripts/afo-res.js'
        ];

        function injectCode(code) {
            var script = document.createElement('script');
            script.textContent = code;
            document.head.appendChild(script);
            script.remove();
        }

        function loadNext(i) {
            if (i >= files.length) {
                bootstrap();
                return;
            }
            var url = 'https://raw.githubusercontent.com/SWAssistant1/SWAssistant/' + branch + '/' + files[i] + '?t=' + Date.now();
            $.get(url, function (data) {
                injectCode(data);
                console.info('[AFO] Module injected:', files[i]);
                loadNext(i + 1);
            }).fail(function () {
                console.error('[AFO] Module load failed:', files[i]);
                loadNext(i + 1);
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

        setTimeout(() => loadNext(0), 50);
    })();
}
