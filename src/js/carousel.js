const carrousel = document.getElementById('carrouselProgrammation');

document.getElementById('btn-gauche')?.addEventListener('click', () => {
  carrousel?.scrollBy({ left: -300, behavior: 'smooth' });
});

document.getElementById('btn-droite')?.addEventListener('click', () => {
  carrousel?.scrollBy({ left: 300, behavior: 'smooth' });
});
