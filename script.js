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
    hero.classList.toggle('is-active', entry.isIntersecting && !document.hidden);
  });
  orderObserver.observe(hero);
  document.addEventListener('visibilitychange', () => hero.classList.toggle('is-active', !document.hidden && hero.getBoundingClientRect().bottom > 0 && hero.getBoundingClientRect().top < innerHeight));
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
import { MENU_URL, categories, products, canAddProduct } from './catalog.js';
import { addToCart, cartTotal, buildOrderMessage, formatBRL } from './cart.js';


const categoryList = document.querySelector('#category-list');
const catalogPanel = document.querySelector('#catalog-panel');
const cartDrawer = document.querySelector('#cart-drawer');
const cartOverlay = document.querySelector('#cart-overlay');
const cartItems = document.querySelector('#cart-items');
const cartStatus = document.querySelector('#cart-status');
const cartSend = document.querySelector('#cart-send');
let cart = [];
let whatsappNumber = '';
let focusBeforeCart = null;

function normalizeWhatsappNumber(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (/^\d{11}$/.test(digits)) return `55${digits}`;
  return /^55\d{11}$/.test(digits) ? digits : '';
}

async function loadOrderConfig() {
  for (const path of ['config.json', ...(location.hostname === '127.0.0.1' || location.hostname === 'localhost' ? ['config.local.json'] : [])]) {
    try {
      const response = await fetch(path, { cache: 'no-store' });
      if (response.ok) whatsappNumber = normalizeWhatsappNumber((await response.json()).whatsappNumber) || whatsappNumber;
    } catch { /* A configuração local é opcional. */ }
  }
  renderCart();
}

function renderCategory(categoryId) {
  const restoreCategoryFocus = categoryList.contains(document.activeElement);
  categoryList.replaceChildren();
  for (const category of categories) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'category-button';
    button.textContent = category.name;
    button.setAttribute('aria-pressed', String(category.id === categoryId));
    button.addEventListener('click', () => renderCategory(category.id));
    categoryList.append(button);
  }
  if (restoreCategoryFocus) [...categoryList.querySelectorAll('button')].find(button => button.getAttribute('aria-pressed') === 'true')?.focus();

  catalogPanel.replaceChildren();
  const category = categories.find(entry => entry.id === categoryId);
  const heading = document.createElement('h3');
  heading.textContent = category.name;
  catalogPanel.append(heading);
  const entries = products.filter(product => product.category === categoryId);
  if (!entries.length) {
    const empty = document.createElement('p');
    empty.className = 'catalog-empty';
    empty.textContent = 'Os itens desta categoria precisam ser conferidos no cardápio oficial.';
    catalogPanel.append(empty, menuLink('Ver na Anota AI'));
    return;
  }
  for (const product of entries) {
    const article = document.createElement('article');
    article.className = 'catalog-product';
    const details = document.createElement('div');
    const name = document.createElement('h4');
    name.textContent = product.name;
    details.append(name);
    if (product.description) {
      const description = document.createElement('p');
      description.textContent = product.description;
      details.append(description);
    }
    const action = document.createElement('div');
    action.className = 'catalog-product-action';
    if (canAddProduct(product)) {
      const price = document.createElement('strong');
      price.textContent = formatBRL(product.priceCents);
      action.append(price);
      const groups = [];
      for (const group of product.optionGroups) {
        const label = document.createElement('label');
        label.textContent = group.name;
        const select = document.createElement('select');
        select.setAttribute('aria-label', `${group.name} para ${product.name}`);
        const blank = document.createElement('option');
        blank.value = '';
        blank.textContent = group.required ? 'Escolha uma opção' : 'Sem adicional';
        select.append(blank);
        for (const choice of group.choices) {
          const option = document.createElement('option');
          option.value = choice.id;
          option.textContent = `${choice.name} (+ ${formatBRL(choice.priceCents)})`;
          select.append(option);
        }
        label.append(select);
        action.append(label);
        groups.push({ group, select });
      }
      const add = document.createElement('button');
      add.type = 'button';
      add.className = 'catalog-add';
      add.textContent = 'Adicionar ao carrinho';
      add.addEventListener('click', () => {
        const options = groups.map(({ group, select }) => group.choices.find(choice => choice.id === select.value)).filter(Boolean);
        try {
          cart = addToCart(cart, product, options);
          renderCart();
          cartStatus.textContent = `${product.name} adicionado ao carrinho.`;
          openCart();
        } catch (error) {
          cartStatus.textContent = error.message;
          openCart();
        }
      });
      action.append(add);
    } else {
      const unknown = document.createElement('span');
      unknown.className = 'catalog-unverified';
      unknown.textContent = 'Preço e disponibilidade a confirmar';
      action.append(unknown, menuLink('Ver na Anota AI'));
    }
    article.append(details, action);
    catalogPanel.append(article);
  }
}

function menuLink(text) {
  const link = document.createElement('a');
  link.href = MENU_URL;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = text;
  link.className = 'catalog-menu-link';
  return link;
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-cart-count]').forEach(node => { node.textContent = String(count); });
  cartItems.replaceChildren();
  if (!count) {
    const empty = document.createElement('p');
    empty.className = 'cart-empty';
    empty.textContent = 'Seu carrinho está vazio. Os itens sem valores confirmados podem ser pedidos pela Anota AI.';
    cartItems.append(empty);
  }
  for (const item of cart) {
    const product = products.find(entry => entry.id === item.productId);
    if (!product) continue;
    const row = document.createElement('div');
    row.className = 'cart-item';
    const name = document.createElement('strong');
    name.textContent = product.name;
    const options = document.createElement('p');
    options.textContent = item.options.map(option => option.name).join(', ');
    const quantity = document.createElement('div');
    quantity.className = 'cart-quantity';
    for (const [symbol, delta, label] of [['−', -1, 'Diminuir'], [String(item.quantity), 0, 'Quantidade'], ['+', 1, 'Aumentar']]) {
      if (!delta) { const span = document.createElement('span'); span.textContent = symbol; quantity.append(span); continue; }
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = symbol;
      button.dataset.cartKey = item.key;
      button.dataset.delta = String(delta);
      button.setAttribute('aria-label', `${label} quantidade de ${product.name}`);
      button.addEventListener('click', () => {
        cart = cart.map(entry => entry.key === item.key ? { ...entry, quantity: entry.quantity + delta } : entry).filter(entry => entry.quantity > 0);
        renderCart();
        ([...cartItems.querySelectorAll('.cart-quantity button')].find(entry => entry.dataset.cartKey === item.key && entry.dataset.delta === String(delta)) || cartDrawer.querySelector('[data-close-cart]')).focus();
      });
      quantity.append(button);
    }
    const price = document.createElement('span');
    price.textContent = formatBRL((product.priceCents + item.options.reduce((sum, option) => sum + option.priceCents, 0)) * item.quantity);
    row.append(name, options, quantity, price);
    cartItems.append(row);
  }
  try {
    document.querySelector('#cart-total').textContent = formatBRL(cartTotal(cart, products));
    cartSend.disabled = !count || !whatsappNumber;
    cartStatus.textContent = !count ? 'Adicione itens com preços confirmados para continuar.' : !whatsappNumber ? 'Aguardando o WhatsApp comercial oficial da loja.' : 'Confira o pedido antes de abrir o WhatsApp.';
  } catch {
    cartSend.disabled = true;
    cartStatus.textContent = 'Um item precisa ser confirmado novamente. Consulte a Anota AI.';
  }
}

function openCart() {
  focusBeforeCart = document.activeElement;
  cartDrawer.hidden = false;
  cartOverlay.hidden = false;
  document.querySelectorAll('.skip-link, .site-header, main, .site-footer, .mobile-order').forEach(node => { node.inert = true; });
  document.body.classList.add('cart-open');
  cartDrawer.querySelector('[data-close-cart]').focus();
}

function closeCart() {
  cartDrawer.hidden = true;
  cartOverlay.hidden = true;
  document.querySelectorAll('.skip-link, .site-header, main, .site-footer, .mobile-order').forEach(node => { node.inert = false; });
  document.body.classList.remove('cart-open');
  focusBeforeCart?.focus();
}

document.querySelectorAll('[data-open-cart]').forEach(button => button.addEventListener('click', openCart));
document.querySelector('[data-close-cart]').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.addEventListener('keydown', event => {
  if (cartDrawer.hidden) return;
  if (event.key === 'Escape') { closeCart(); return; }
  if (event.key !== 'Tab') return;
  const focusables = [...cartDrawer.querySelectorAll('a, button:not(:disabled), select')];
  const first = focusables[0];
  const last = focusables.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
cartSend.addEventListener('click', () => {
  if (!whatsappNumber || !cart.length) return;
  try {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildOrderMessage(cart, products))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (error) { cartStatus.textContent = error.message; }
});

renderCategory(categories[0].id);
renderCart();
loadOrderConfig();
