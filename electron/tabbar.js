const tabbar = document.getElementById('tabbar');

function renderTabs(state) {
  tabbar.innerHTML = '';

  state.cards.forEach((card) => {
    const tab = document.createElement('div');
    tab.className = 'tab' + (card.id === state.activeId ? ' active' : '');

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
    tab.appendChild(close);
    tab.addEventListener('click', () => window.swaCards.switch(card.id));

    tabbar.appendChild(tab);
  });

  const addTab = document.createElement('div');
  addTab.className = 'add-tab';
  addTab.textContent = '+';
  addTab.addEventListener('click', () => window.swaCards.add());
  tabbar.appendChild(addTab);
}

window.swaCards.onChanged(renderTabs);
window.swaCards.list().then(renderTabs);
