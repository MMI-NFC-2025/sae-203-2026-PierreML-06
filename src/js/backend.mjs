import PocketBase from 'pocketbase';

const PB_URL = 'https://pbsae203.pierre-mouilleseaux-lhuillier.fr';

const pb = new PocketBase(PB_URL);

export default pb;

/**
 * Génère l'URL d'un fichier PocketBase à partir de l'identifiant de collection,
 * de l'identifiant du record et du nom de fichier.
 */
export function getFileUrl(collection, recordId, filename) {
  if (!filename) return null;
  return `${PB_URL}/api/files/${collection}/${recordId}/${filename}`;
}

/**
 * Génère l'URL d'un fichier PocketBase à partir d'un objet record complet.
 * À utiliser avec le composant <PbImage record={...} recordImage={...} />.
 */
export function getImageUrl(record, filename) {
  if (!filename || !record) return null;
  const collection = record.collectionName ?? record.collectionId;
  return `${PB_URL}/api/files/${collection}/${record.id}/${filename}`;
}
