if (typeof GAME === 'undefined') {} else {
    // GAME.charValuesBind assumes its target DOM elements (e.g. #char_stat_1)
    // always exist, but they're only present on certain pages. Switching
    // characters/locations a lot (PVP automation) makes the server keep
    // pushing char data updates while those elements are gone, crashing the
    // whole batch and silently dropping every field queued after the bad one.
    // Patch it to process fields one at a time so a missing element only
    // skips that one field instead of the rest of the update.
    var orig_charValuesBind = GAME.charValuesBind;
    GAME.charValuesBind = function (fields, olds) {
        olds = olds || [];
        for (var i = 0; i < fields.length; i++) {
            try {
                orig_charValuesBind.call(this, [fields[i]], olds);
            } catch (e) {
                // target element not on the current page; ignore and continue.
            }
        }
    };
}
