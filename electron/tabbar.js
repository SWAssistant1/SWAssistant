const tabbar = document.getElementById('tabbar');

function renderTabs(state) {
  tabbar.innerHTML = '';
  const isSplit = !!state.splitId;

  state.cards.forEach((card) => {
    const isActive = card.id === state.activeId;
    const isSecondary = card.id === state.splitId;

    const tab = document.createElement('div');
    tab.className = 'tab' + (isActive ? ' active' : '') + (isSecondary ? ' split-secondary' : '');

    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = card.label;
    label.addEventListener('dblclick', (event) => {
      event.stopPropagation();
      const next = prompt('Nazwa karty:', card.label);
      if (next && next.trim()) {
        window.swaCards.rename(card.id, next.trim());
      }
    });

    const close = document.createElement('span');
    close.className = 'close';
    close.textContent = '×';
    close.addEventListener('click', (event) => {
      event.stopPropagation();
      window.swaCards.remove(card.id);
    });

    tab.appendChild(label);

    // Show split-pin on every non-active tab: ⊞ to add as secondary, ⊟ to remove
    if (!isActive) {
      const pin = document.createElement('span');
      pin.className = 'split-pin';
      pin.textContent = isSecondary ? '⊟' : '⊞';
      pin.title = isSecondary ? 'Usuń z widoku split' : 'Pokaż obok (split)';
      pin.addEventListener('click', (event) => {
        event.stopPropagation();
        window.swaCards.split(card.id);
      });
      tab.appendChild(pin);
    }

    tab.appendChild(close);
    tab.addEventListener('click', () => window.swaCards.switch(card.id));

    tabbar.appendChild(tab);
  });

  // Global split toggle button
  const splitToggle = document.createElement('div');
  splitToggle.className = 'split-toggle' + (isSplit ? ' active' : '');
  splitToggle.textContent = '⊞';
  splitToggle.title = isSplit ? 'Wyłącz split' : 'Włącz split';
  splitToggle.addEventListener('click', () => window.swaCards.split());
  tabbar.appendChild(splitToggle);

  const addTab = document.createElement('div');
  addTab.className = 'add-tab';
  addTab.textContent = '+';
  addTab.addEventListener('click', () => window.swaCards.add());
  tabbar.appendChild(addTab);
}

window.swaCards.onChanged(renderTabs);
window.swaCards.list().then(renderTabs);
