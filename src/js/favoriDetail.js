import pb from '../../backend/backend.mjs';
import {
  initFavBtns,
  isFavoriArtiste,
  isFavoriScene,
  toggleFavoriArtiste,
  toggleFavoriScene,
} from './favoris.mjs';

const configs = {
  artiste: {
    isFavori: isFavoriArtiste,
    toggleFavori: toggleFavoriArtiste,
  },
  scene: {
    isFavori: isFavoriScene,
    toggleFavori: toggleFavoriScene,
  },
};

export function initFavoriDetail(type) {
  const config = configs[type];
  if (!config) return;

  initFavBtns();

  const textButton = document.getElementById('fav-text-btn');
  if (!(textButton instanceof HTMLButtonElement) || !pb.authStore.isValid) return;

  const starButton = document.querySelector(`.fav-btn[data-type="${type}"]`);
  if (!(starButton instanceof HTMLElement)) return;

  const id = starButton.dataset.id ?? '';
  if (!id) return;

  function syncTextButton() {
    const isFavorite = config.isFavori(id);
    textButton.textContent = isFavorite ? 'Supprimer des favoris' : 'Ajouter aux favoris';
    textButton.style.display = '';
  }

  function syncStarButton() {
    const emptyIcon = starButton.querySelector('.star-empty');
    const filledIcon = starButton.querySelector('.star-filled');

    if (!(emptyIcon instanceof HTMLElement) || !(filledIcon instanceof HTMLElement)) return;

    const isFavorite = config.isFavori(id);
    emptyIcon.classList.toggle('hidden', isFavorite);
    filledIcon.classList.toggle('hidden', !isFavorite);
  }

  syncTextButton();

  textButton.addEventListener('click', async () => {
    textButton.disabled = true;
    await config.toggleFavori(id);
    syncTextButton();
    syncStarButton();
    textButton.disabled = false;
  });
}
