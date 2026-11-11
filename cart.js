import { canAddProduct } from './catalog.js';

export function formatBRL(cents) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
}

export function addToCart(cart, product, options = []) {
  if (!canAddProduct(product)) throw new Error('Item sem dados comerciais confirmados.');
  if (!Array.isArray(options) || options.some(option => !option || !Number.isSafeInteger(option.priceCents) || option.priceCents < 0)) {
    throw new Error('Adicional sem preço confirmado.');
  }
  const selected = new Set(options.map(option => option.id));
  const allowed = product.optionGroups.flatMap(group => group.choices);
  if (selected.size !== options.length || options.some(option => !allowed.some(choice => choice.id === option.id && choice.name === option.name && choice.priceCents === option.priceCents))) {
    throw new Error('Adicional inválido.');
  }
  for (const group of product.optionGroups) {
    const count = group.choices.filter(choice => selected.has(choice.id)).length;
    if ((group.required && count !== 1) || count > 1) throw new Error('Selecione uma opção válida.');
  }
  const key = `${product.id}:${options.map(option => option.id).sort().join(',')}`;
  const existing = cart.find(item => item.key === key);
  return existing
    ? cart.map(item => item.key === key ? { ...item, quantity: item.quantity + 1 } : item)
    : [...cart, { key, productId: product.id, quantity: 1, options: options.map(({ id, name, priceCents }) => ({ id, name, priceCents })) }];
}

export function cartTotal(cart, catalog) {
  return cart.reduce((sum, item) => {
    const product = catalog.find(entry => entry.id === item.productId);
    if (!canAddProduct(product)) throw new Error('Um item do carrinho precisa de nova confirmação.');
    return sum + (product.priceCents + item.options.reduce((value, option) => value + option.priceCents, 0)) * item.quantity;
  }, 0);
}

export function buildOrderMessage(cart, catalog) {
  if (!cart.length) throw new Error('O carrinho está vazio.');
  const lines = ['Olá, Hot Sushi! Gostaria de confirmar este pedido:', ''];
  for (const item of cart) {
    const product = catalog.find(entry => entry.id === item.productId);
    if (!canAddProduct(product)) throw new Error('Um item do carrinho precisa de nova confirmação.');
    const unitPrice = product.priceCents + item.options.reduce((value, option) => value + option.priceCents, 0);
    lines.push(`${item.quantity} × ${product.name} — ${formatBRL(unitPrice * item.quantity)}`);
    for (const option of item.options) lines.push(`  + ${option.name} (${formatBRL(option.priceCents)} cada)`);
  }
  lines.push('', `Total dos itens: ${formatBRL(cartTotal(cart, catalog))}`, 'Entrega e valor final a confirmar com a loja.');
  return lines.join('\n');
}
