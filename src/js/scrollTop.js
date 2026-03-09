const btnHaut = document.getElementById('btn-retour-haut');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnHaut?.classList.remove('hidden');
    btnHaut?.classList.add('flex');
  } else {
    btnHaut?.classList.add('hidden');
    btnHaut?.classList.remove('flex');
  }
});

btnHaut?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
