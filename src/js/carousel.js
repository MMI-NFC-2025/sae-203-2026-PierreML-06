const carrousel = document.getElementById('carrouselProgrammation');
const boutonGauche = document.getElementById('btn-gauche');
const boutonDroite = document.getElementById('btn-droite');

if (carrousel instanceof HTMLElement) {
  const cartes = Array.from(carrousel.children).filter((element) => element instanceof HTMLElement);

  const calculerPas = () => {
    const premiereCarte = cartes[0];
    const deuxiemeCarte = cartes[1];

    if (premiereCarte && deuxiemeCarte) {
      return deuxiemeCarte.offsetLeft - premiereCarte.offsetLeft;
    }

    return premiereCarte?.offsetWidth ?? 300;
  };

  const allerAuDebut = () => {
    carrousel.scrollTo({ left: 0, behavior: 'smooth' });
  };

  const allerALaFin = () => {
    carrousel.scrollTo({
      left: carrousel.scrollWidth - carrousel.clientWidth,
      behavior: 'smooth',
    });
  };

  boutonDroite?.addEventListener('click', () => {
    const pas = calculerPas();
    const maxScroll = carrousel.scrollWidth - carrousel.clientWidth;
    const presqueALaFin = carrousel.scrollLeft >= maxScroll - pas / 2;

    if (presqueALaFin) {
      allerAuDebut();
      return;
    }

    carrousel.scrollBy({ left: pas, behavior: 'smooth' });
  });

  boutonGauche?.addEventListener('click', () => {
    const pas = calculerPas();
    const presqueAuDebut = carrousel.scrollLeft <= pas / 2;

    if (presqueAuDebut) {
      allerALaFin();
      return;
    }

    carrousel.scrollBy({ left: -pas, behavior: 'smooth' });
  });
}
