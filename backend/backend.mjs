import PocketBase from 'pocketbase';

const PB_URL = 'https://pbsae203.pierre-mouilleseaux-lhuillier.fr';

const pb = new PocketBase(PB_URL);

export default pb;

/** URL d'un fichier PocketBase via collection + recordId + filename */
export function getFileUrl(collection, recordId, filename) {
  if (!filename) return null;
  return `${PB_URL}/api/files/${collection}/${recordId}/${filename}`;
}

/** URL d'un fichier PocketBase via un objet record complet */
export function getImageUrl(record, filename) {
  if (!filename || !record) return null;
  const collection = record.collectionName ?? record.collectionId;
  return `${PB_URL}/api/files/${collection}/${record.id}/${filename}`;
}

/** Liste de tous les artistes triés par date de représentation */
export async function getArtistesByDate() {
  return pb.collection('artistes').getFullList({
    sort: 'dates_de_representation',
    expand: 'scene',
  });
}

/** Liste de tous les artistes triés par ordre alphabétique */
export async function getArtistesAlpha() {
  return pb.collection('artistes').getFullList({
    sort: 'nom',
    expand: 'scene',
  });
}

/** Liste de toutes les scènes triées par nom */
export async function getScenesByNom() {
  return pb.collection('scenes').getFullList({ sort: 'nom' });
}

/** Infos d'un artiste par son id */
export async function getArtisteById(id) {
  return pb.collection('artistes').getOne(id, { expand: 'scene' });
}

/** Infos d'une scène par son id */
export async function getSceneById(id) {
  return pb.collection('scenes').getOne(id);
}

/** Artistes d'une scène par id de la scène, triés par date */
export async function getArtistesBySceneId(sceneId) {
  return pb.collection('artistes').getFullList({
    filter: `scene = "${sceneId}"`,
    sort: 'dates_de_representation',
    expand: 'scene',
  });
}

/** Artistes d'une scène par nom de la scène, triés par date */
export async function getArtistesBySceneNom(sceneNom) {
  const scenes = await pb.collection('scenes').getFullList({
    filter: `nom = "${sceneNom}"`,
  });
  if (!scenes.length) return [];
  return getArtistesBySceneId(scenes[0].id);
}

/** Artistes filtrés par genre musical */
export async function getArtistesByGenre(genre) {
  return pb.collection('artistes').getFullList({
    filter: `genre_musical = "${genre}"`,
    sort: 'dates_de_representation',
    expand: 'scene',
  });
}

/** Artistes filtrés par jour (chaîne yyyy-mm-dd, ou juste le jour numérique) */
export async function getArtistesByJour(dateIso) {
  return pb.collection('artistes').getFullList({
    filter: `dates_de_representation >= "${dateIso} 00:00:00" && dates_de_representation <= "${dateIso} 23:59:59"`,
    sort: 'dates_de_representation',
    expand: 'scene',
  });
}

/**
 * Ajouter ou modifier un artiste.
 * Si id est fourni, met à jour l'enregistrement existant.
 * Sinon, crée un nouvel enregistrement.
 */
export async function saveArtiste(data, id = null) {
  if (id) {
    return pb.collection('artistes').update(id, data);
  }
  return pb.collection('artistes').create(data);
}

/**
 * Ajouter ou modifier une scène.
 * Si id est fourni, met à jour l'enregistrement existant.
 * Sinon, crée un nouvel enregistrement.
 */
export async function saveScene(data, id = null) {
  if (id) {
    return pb.collection('scenes').update(id, data);
  }
  return pb.collection('scenes').create(data);
}
