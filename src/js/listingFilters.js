const ACTIVE_SORT_CLASS = 'bg-marron text-beige-claire border-marron';
const INACTIVE_SORT_CLASS = 'bg-transparent text-marron border-beige hover:border-marron';

function isHTMLElement(element) {
  return element instanceof HTMLElement;
}

function matchesFilters(card, state) {
  return (
    (!state.activeJour || card.dataset.jour === state.activeJour) &&
    (!state.activeGenre || card.dataset.genre === state.activeGenre) &&
    (!state.activeScene || card.dataset.scene === state.activeScene) &&
    (!state.recherche ||
      (card.dataset.nom ?? '').includes(state.recherche) ||
      (card.dataset.genreLabel ?? '').includes(state.recherche))
  );
}

function updateSortButtons(sortSelector, sort) {
  document.querySelectorAll(sortSelector).forEach((button) => {
    if (!isHTMLElement(button)) return;
    const isActive = button.dataset.sort === sort;
    button.className = `filtre-sort shrink-0 px-4 py-2.5 rounded-xl text-xs font-corps font-bold uppercase tracking-wide border cursor-pointer transition-colors ${isActive ? ACTIVE_SORT_CLASS : INACTIVE_SORT_CLASS}`;
  });
}

function bindCommonControls({
  state,
  searchId,
  dayId,
  genreId,
  sceneId,
  sortSelector,
  applyFilters,
  applySort,
}) {
  document.getElementById(searchId)?.addEventListener('input', (event) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    state.recherche = event.target.value.toLowerCase().trim();
    applyFilters();
  });

  document.getElementById(dayId)?.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLSelectElement)) return;
    state.activeJour = event.target.value;
    applyFilters();
  });

  document.getElementById(genreId)?.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLSelectElement)) return;
    state.activeGenre = event.target.value;
    applyFilters();
  });

  document.getElementById(sceneId)?.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLSelectElement)) return;
    state.activeScene = event.target.value;
    applyFilters();
  });

  document.querySelectorAll(sortSelector).forEach((button) => {
    button.addEventListener('click', () => {
      if (!isHTMLElement(button) || !button.dataset.sort) return;
      state.activeSort = button.dataset.sort;
      updateSortButtons(sortSelector, state.activeSort);
      applySort();
    });
  });
}

function compareCards(a, b, activeSort) {
  if (activeSort === 'alpha') {
    return (a.dataset.nom ?? '').localeCompare(b.dataset.nom ?? '', 'fr');
  }

  return (a.dataset.date ?? '').localeCompare(b.dataset.date ?? '');
}

export function initFlatListingFilters({
  containerId,
  emptyId,
  searchId,
  dayId = 'filtre-jour',
  genreId = 'filtre-genre',
  sceneId = 'filtre-scene',
  sortSelector = '[data-sort]',
}) {
  const container = document.getElementById(containerId);
  if (!isHTMLElement(container)) return;

  const emptyState = document.getElementById(emptyId);
  const state = {
    activeJour: '',
    activeGenre: '',
    activeScene: '',
    activeSort: 'date',
    recherche: '',
  };

  const cards = () => Array.from(container.children).filter(isHTMLElement);

  function applyFilters() {
    let visible = 0;

    cards().forEach((card) => {
      const match = matchesFilters(card, state);
      card.style.display = match ? '' : 'none';
      if (match) visible += 1;
    });

    if (isHTMLElement(emptyState)) {
      emptyState.style.display = visible === 0 ? 'block' : 'none';
    }
  }

  function applySort() {
    const sortedCards = cards().sort((a, b) => compareCards(a, b, state.activeSort));
    sortedCards.forEach((card) => {
      container.appendChild(card);
    });
  }

  bindCommonControls({
    state,
    searchId,
    dayId,
    genreId,
    sceneId,
    sortSelector,
    applyFilters,
    applySort,
  });
}

export function initSectionedListingFilters({
  rootId,
  emptyId,
  searchId,
  dayId = 'filtre-jour',
  genreId = 'filtre-genre',
  sceneId = 'filtre-scene',
  sortSelector = '[data-sort]',
  sectionSelector = '[data-jour-section]',
  gridSelector = '[data-jour-grid]',
  itemSelector = '[data-nom]',
}) {
  const root = document.getElementById(rootId);
  if (!isHTMLElement(root)) return;

  const emptyState = document.getElementById(emptyId);
  const state = {
    activeJour: '',
    activeGenre: '',
    activeScene: '',
    activeSort: 'date',
    recherche: '',
  };

  const cards = () => Array.from(root.querySelectorAll(itemSelector)).filter(isHTMLElement);

  function updateSections() {
    let visible = 0;

    Array.from(root.querySelectorAll(sectionSelector)).forEach((section) => {
      if (!isHTMLElement(section)) return;

      const visibleCards = Array.from(section.querySelectorAll(itemSelector)).filter((card) => {
        return isHTMLElement(card) && card.style.display !== 'none';
      });

      section.style.display = visibleCards.length > 0 ? '' : 'none';
      visible += visibleCards.length;
    });

    if (isHTMLElement(emptyState)) {
      emptyState.style.display = visible === 0 ? 'block' : 'none';
    }
  }

  function applyFilters() {
    cards().forEach((card) => {
      const match = matchesFilters(card, state);
      card.style.display = match ? '' : 'none';
    });

    updateSections();
  }

  function applySort() {
    Array.from(root.querySelectorAll(gridSelector)).forEach((grid) => {
      if (!isHTMLElement(grid)) return;

      const sortedCards = Array.from(grid.children)
        .filter(isHTMLElement)
        .sort((a, b) => compareCards(a, b, state.activeSort));

      sortedCards.forEach((card) => {
        grid.appendChild(card);
      });
    });
  }

  bindCommonControls({
    state,
    searchId,
    dayId,
    genreId,
    sceneId,
    sortSelector,
    applyFilters,
    applySort,
  });
}
