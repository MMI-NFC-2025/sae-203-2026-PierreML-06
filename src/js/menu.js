const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav-principale');
const barre1 = document.getElementById('barre1');
const barre2 = document.getElementById('barre2');
const barre3 = document.getElementById('barre3');

function ouvrirMenu() {
  nav.classList.remove('hidden');
  nav.classList.add('flex');
  nav.setAttribute('aria-hidden', 'false');
  menuBtn.setAttribute('aria-expanded', 'true');
  barre1.style.transform = 'translateY(7px) rotate(45deg)';
  barre2.style.opacity = '0';
  barre3.style.transform = 'translateY(-7px) rotate(-45deg)';
  document.body.style.overflow = 'hidden';
}

function fermerMenu() {
  nav.classList.add('hidden');
  nav.classList.remove('flex');
  nav.setAttribute('aria-hidden', 'true');
  menuBtn.setAttribute('aria-expanded', 'false');
  barre1.style.transform = '';
  barre2.style.opacity = '';
  barre3.style.transform = '';
  document.body.style.overflow = '';
}

menuBtn?.addEventListener('click', () => {
  nav?.classList.contains('flex') ? fermerMenu() : ouvrirMenu();
});

document.getElementById('menu-close')?.addEventListener('click', fermerMenu);

nav?.querySelectorAll('a').forEach(lien => {
  lien.addEventListener('click', fermerMenu);
});
