if (typeof GAME !== 'undefined') {
var EQS = {
    storageKey: 'swa_eq_sets_' + GAME.char_id,
    sets: JSON.parse(localStorage.getItem('swa_eq_sets_' + GAME.char_id) || '[null,null,null,null,null]'),
};
EQS.persist = () => {
    localStorage.setItem(EQS.storageKey, JSON.stringify(EQS.sets));
};
EQS.readCurrent = () => {
    var loadout = {};
    $('.usable_slot').each(function() {
        var slot = parseInt($(this).attr('data-slot'));
        var iid = parseInt($(this).attr('data-item_id'));
        if (slot && iid) loadout[slot] = iid;
    });
    return loadout;
};
EQS.defaultName = (idx) => 'Set ' + (idx + 1);
EQS.getName = (idx) => (EQS.sets[idx] && EQS.sets[idx].name) || EQS.defaultName(idx);
EQS.rename = (idx, name) => {
    name = (name || '').trim() || EQS.defaultName(idx);
    if (!EQS.sets[idx]) EQS.sets[idx] = { name: name, items: {} };
    else EQS.sets[idx].name = name;
    EQS.persist();
};
EQS.save = (idx) => {
    var loadout = EQS.readCurrent();
    var name = ($('#sety_Panel .eqs_name[data-idx="' + idx + '"]').val() || '').trim() || EQS.getName(idx);
    console.log('[EQS] save', idx, JSON.stringify(loadout));
    EQS.sets[idx] = { name: name, items: loadout };
    EQS.persist();
    GAME.komunikat('Zapisano set "' + name + '" (' + Object.keys(loadout).length + ' itemów).');
};
EQS.equip = (idx) => {
    var loadout = EQS.sets[idx] ? EQS.sets[idx].items : null;
    var slots = loadout ? Object.keys(loadout) : [];
    console.log('[EQS] equip', idx, JSON.stringify(loadout));
    if (!slots.length) {
        GAME.komunikat('Set "' + EQS.getName(idx) + '" jest pusty.');
        return;
    }
    var i = 0;
    var step = () => {
        if (i >= slots.length) return;
        var slot = slots[i];
        var iid = loadout[slot];
        i++;
        var current = EQS.readCurrent()[slot];
        console.log('[EQS] step slot=' + slot + ' wanted_iid=' + iid + ' current_iid=' + current);
        if (current === iid) {
            step();
            return;
        }
        console.log('[EQS] emitOrder', { a: 12, type: 5, iid: iid, page: GAME.ekw_page });
        GAME.emitOrder({ a: 12, type: 5, iid: iid, page: GAME.ekw_page });
        setTimeout(step, 500);
    };
    step();
};
$('#sety_Panel .eqs_name').each(function() {
    var idx = parseInt($(this).data('idx'));
    $(this).val(EQS.getName(idx));
});
$('#sety_Panel .eqs_name').change((e) => {
    var idx = parseInt($(e.currentTarget).data('idx'));
    EQS.rename(idx, $(e.currentTarget).val());
    $(e.currentTarget).val(EQS.getName(idx));
});
}
