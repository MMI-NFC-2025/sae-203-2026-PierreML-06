import pb, { getImageUrl } from '../../backend/backend.mjs';

function applyAvatar(imageElement, user) {
  if (!(imageElement instanceof HTMLImageElement)) return;

  if (user.img) {
    const url = getImageUrl(user, user.img);
    if (url) {
      imageElement.src = url;
      imageElement.alt = user.name || 'Mon profil';
      imageElement.removeAttribute('aria-hidden');
      imageElement.className = 'w-full h-full object-cover';
      return;
    }
  }

  imageElement.style.display = 'none';
  const parent = imageElement.parentElement;
  if (!parent || parent.querySelector('.user-initiale')) return;

  const initial = document.createElement('span');
  initial.className = 'user-initiale font-corps font-bold text-marron text-sm';
  const label = user.name || user.email || '';
  initial.textContent = label.charAt(0).toUpperCase();
  parent.appendChild(initial);
}

function appendAdminLink(container, className) {
  if (!(container instanceof HTMLElement)) return;
  if (container.querySelector('a[href="/admin"]')) return;

  const link = document.createElement('a');
  link.href = '/admin';
  link.className = className;
  link.textContent = 'Admin';

  if (container.id === 'nav-desktop') {
    container.insertBefore(link, container.lastElementChild);
    return;
  }

  const item = document.createElement('li');
  item.appendChild(link);
  container.appendChild(item);
}

if (pb.authStore.isValid && pb.authStore.record) {
  const user = pb.authStore.record;
  applyAvatar(document.getElementById('user-icon-desktop'), user);
  applyAvatar(document.getElementById('user-icon-mobile'), user);

  if (user.admin) {
    const isAdminPage = window.location.pathname === '/admin';
    const desktopClass = `font-corps text-[11px] font-bold uppercase tracking-widest hover:text-or transition-colors ${isAdminPage ? 'text-or' : 'text-marron'}`;
    const mobileClass = `font-corps font-bold text-base uppercase tracking-wide hover:text-or transition-colors ${isAdminPage ? 'text-or' : 'text-white'}`;

    appendAdminLink(document.getElementById('nav-desktop'), desktopClass);
    appendAdminLink(document.getElementById('nav-mobile-list'), mobileClass);
  }
}
