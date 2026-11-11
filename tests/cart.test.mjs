import test from 'node:test';
import assert from 'node:assert/strict';
import { addToCart, cartTotal, buildOrderMessage } from '../cart.js';
import { canAddProduct } from '../catalog.js';

const product = {
  id: 'produto-teste',
  name: 'Produto de teste',
  priceCents: 2500,
  available: true,
  optionsVerified: true,
  optionGroups: [{ id: 'molho', name: 'Molho', required: true, choices: [{ id: 'molho-a', name: 'Molho A', priceCents: 300 }] }],
};
const selected = product.optionGroups[0].choices;

test('soma quantidades, adicional e total na mensagem', () => {
  const once = addToCart([], product, selected);
  const twice = addToCart(once, product, selected);
  assert.equal(twice[0].quantity, 2);
  assert.equal(cartTotal(twice, [product]), 5600);
  const message = buildOrderMessage(twice, [product]);
  assert.match(message, /2 × Produto de teste — R\$\s56,00/);
  assert.match(message, /Molho A \(R\$\s3,00 cada\)/);
  assert.match(message, /Total dos itens: R\$\s56,00/);
});

test('bloqueia item sem dados confirmados e adicional obrigatório ausente', () => {
  assert.throws(() => addToCart([], { ...product, priceCents: null }, selected));
  assert.throws(() => addToCart([], { ...product, available: null }, selected));
  assert.throws(() => addToCart([], product, []));
  assert.throws(() => addToCart([], product, [{ id: 'outro', name: 'Outro', priceCents: 0 }]));
  assert.equal(canAddProduct({ ...product, optionGroups: [{ ...product.optionGroups[0], choices: [{ ...selected[0], priceCents: null }] }] }), false);
});
