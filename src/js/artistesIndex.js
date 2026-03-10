import { initFavBtns } from './favoris.mjs';
import { initFlatListingFilters } from './listingFilters.js';

initFavBtns();

initFlatListingFilters({
  containerId: 'grille-artistes',
  emptyId: 'aucun-resultat',
  searchId: 'recherche-artiste',
});
