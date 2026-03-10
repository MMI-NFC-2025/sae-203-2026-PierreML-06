/**
 * test-back.js
 * Fichier de test des fonctions backend (backend.mjs).
 * Exécuter avec : node --experimental-vm-modules backend/test-back.js
 * (nécessite Node 18+ et le projet initialisé)
 */

import {
  getArtistesByDate,
  getArtistesAlpha,
  getScenesByNom,
  getArtisteById,
  getSceneById,
  getArtistesBySceneId,
  getArtistesBySceneNom,
  getArtistesByGenre,
  getArtistesByJour,
  saveArtiste,
  saveScene,
} from './backend.mjs';

function log(label, data) {
  console.log('\n===', label, '===');
  if (Array.isArray(data)) {
    console.log(`${data.length} résultat(s)`);
    data.forEach((item, i) => console.log(`  [${i}]`, item.nom ?? item.id));
  } else {
    console.log(data?.nom ?? data?.id ?? data);
  }
}

async function runTests() {
  console.log('Démarrage des tests backend Festicloze...\n');

  // 1. Artistes triés par date
  try {
    const artistes = await getArtistesByDate();
    log('getArtistesByDate', artistes);
  } catch (e) {
    console.error('getArtistesByDate ERREUR:', e.message);
  }

  // 2. Artistes triés alphabétiquement
  try {
    const artistes = await getArtistesAlpha();
    log('getArtistesAlpha', artistes);
  } catch (e) {
    console.error('getArtistesAlpha ERREUR:', e.message);
  }

  // 3. Scènes triées par nom
  try {
    const scenes = await getScenesByNom();
    log('getScenesByNom', scenes);
  } catch (e) {
    console.error('getScenesByNom ERREUR:', e.message);
  }

  // 4. Artiste par id (utilise le premier artiste récupéré)
  try {
    const artistes = await getArtistesByDate();
    if (artistes.length > 0) {
      const artiste = await getArtisteById(artistes[0].id);
      log('getArtisteById', artiste);
    } else {
      console.log('getArtisteById : aucun artiste disponible pour le test');
    }
  } catch (e) {
    console.error('getArtisteById ERREUR:', e.message);
  }

  // 5. Scène par id (utilise la première scène récupérée)
  try {
    const scenes = await getScenesByNom();
    if (scenes.length > 0) {
      const scene = await getSceneById(scenes[0].id);
      log('getSceneById', scene);

      // 6. Artistes par scene id
      const artistesByScene = await getArtistesBySceneId(scene.id);
      log(`getArtistesBySceneId (${scene.nom})`, artistesByScene);

      // 7. Artistes par scene nom
      const artistesBySceneNom = await getArtistesBySceneNom(scene.nom);
      log(`getArtistesBySceneNom (${scene.nom})`, artistesBySceneNom);
    } else {
      console.log('Scènes : aucune disponible pour le test');
    }
  } catch (e) {
    console.error('getSceneById ERREUR:', e.message);
  }

  // 8. Artistes par genre (utilise le genre du premier artiste)
  try {
    const artistes = await getArtistesByDate();
    const genre = artistes.find((artiste) => artiste.genre_musical)?.genre_musical;
    if (genre) {
      const result = await getArtistesByGenre(genre);
      log(`getArtistesByGenre (${genre})`, result);
    } else {
      console.log('getArtistesByGenre : aucun genre trouvé');
    }
  } catch (e) {
    console.error('getArtistesByGenre ERREUR:', e.message);
  }

  // 9. Artistes par jour (utilise la date du premier artiste)
  try {
    const artistes = await getArtistesByDate();
    const premier = artistes.find((artiste) => artiste.dates_de_representation);
    if (premier) {
      const jour = premier.dates_de_representation.substring(0, 10);
      const result = await getArtistesByJour(jour);
      log(`getArtistesByJour (${jour})`, result);
    } else {
      console.log('getArtistesByJour : aucune date trouvée');
    }
  } catch (e) {
    console.error('getArtistesByJour ERREUR:', e.message);
  }

  console.log('\nTests terminés.');
}

runTests();
