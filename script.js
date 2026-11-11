const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
const hero = document.querySelector('.hero');
const mobileOrder = document.querySelector('.mobile-order');

function setMenuOpen(open, restoreFocus = true) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  if (open) {
    requestAnimationFrame(() => {
      if (menuButton.getAttribute('aria-expanded') === 'true') {
        navigation.querySelector('a')?.focus({ preventScroll: true });
      }
    });
  }
  else if (restoreFocus) menuButton.focus({ preventScroll: true });
}

menuButton?.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation?.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (link && menuButton?.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    if (link.hash) {
      const section = document.querySelector(link.hash);
      if (section) {
        section.setAttribute('tabindex', '-1');
        requestAnimationFrame(() => section.focus({ preventScroll: true }));
      }
    }
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
  }
  if (event.key === 'Tab' && menuButton?.getAttribute('aria-expanded') === 'true') {
    const links = [...navigation.querySelectorAll('a')];
    const first = links[0];
    const last = links.at(-1);
    if (event.shiftKey && document.activeElement === menuButton) {
      event.preventDefault();
      last?.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      menuButton.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      menuButton.focus();
    } else if (!event.shiftKey && document.activeElement === menuButton) {
      event.preventDefault();
      first?.focus();
    }
  }
});

window.matchMedia('(min-width: 801px)').addEventListener('change', (event) => {
  if (event.matches && menuButton?.getAttribute('aria-expanded') === 'true') setMenuOpen(false);
});

if (hero && mobileOrder) {
  const orderObserver = new IntersectionObserver(([entry]) => {
    mobileOrder.classList.toggle('is-visible', !entry.isIntersecting);
  });
  orderObserver.observe(hero);
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
