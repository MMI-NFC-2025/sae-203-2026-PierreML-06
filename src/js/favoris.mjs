import pb from './backend.mjs';

export function isFavoriArtiste(id) {
  if (!pb.authStore.isValid || !pb.authStore.record) return false;
  return (pb.authStore.record['artistes_perf'] ?? []).includes(id);
}

export function isFavoriScene(id) {
  if (!pb.authStore.isValid || !pb.authStore.record) return false;
  return (pb.authStore.record['scenes_pref'] ?? []).includes(id);
}

export async function toggleFavoriArtiste(id) {
  if (!pb.authStore.isValid || !pb.authStore.record) return false;
  const isFav = isFavoriArtiste(id);
  await pb.collection('users').update(pb.authStore.record['id'], {
    [isFav ? 'artistes_perf-' : 'artistes_perf+']: [id],
  });
  await pb.collection('users').authRefresh();
  return !isFav;
}

export async function toggleFavoriScene(id) {
  if (!pb.authStore.isValid || !pb.authStore.record) return false;
  const isFav = isFavoriScene(id);
  await pb.collection('users').update(pb.authStore.record['id'], {
    [isFav ? 'scenes_pref-' : 'scenes_pref+']: [id],
  });
  await pb.collection('users').authRefresh();
  return !isFav;
}

export function updateStarBtn(btn, isFav) {
  const filled = btn.querySelector('.star-filled');
  const empty = btn.querySelector('.star-empty');
  if (isFav) {
    filled && filled.classList.remove('hidden');
    empty && empty.classList.add('hidden');
  } else {
    filled && filled.classList.add('hidden');
    empty && empty.classList.remove('hidden');
  }
}

export function initFavBtns() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    if (!pb.authStore.isValid) {
      btn.style.display = 'none';
      return;
    }
    const type = btn.dataset.type;
    const id = btn.dataset.id ?? '';
    const isFav = type === 'artiste' ? isFavoriArtiste(id) : isFavoriScene(id);
    updateStarBtn(btn, isFav);
    btn.style.display = '';

    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.disabled = true;
      const newFav = type === 'artiste'
        ? await toggleFavoriArtiste(id)
        : await toggleFavoriScene(id);
      updateStarBtn(btn, newFav);
      btn.disabled = false;
    });
  });
}
