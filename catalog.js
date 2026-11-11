// Dados observados no cardápio público em 2026-11-10 e registrados no projeto inicial.
// Preço, disponibilidade e adicionais não foram verificados: não ativar compra local.
export const MENU_URL = 'https://app.anota.ai/m/D0o9CKMVw';

export const categories = [
  { id: 'combinados', name: 'Combinados' },
  { id: 'hot-sushi', name: 'Hot Sushi' },
  { id: 'uramaki', name: 'Uramaki' },
  { id: 'hossomaki', name: 'Hossomaki' },
  { id: 'temaki', name: 'Temaki' },
  { id: 'djou', name: 'Djou' },
  { id: 'sashimi', name: 'Sashimi' },
  { id: 'niguiri', name: 'Niguiri' },
  { id: 'bebidas-acompanhamentos', name: 'Bebidas e acompanhamentos' },
];

export const products = [
  { id: 'combo-premium-16', category: 'combinados', name: 'Combo Premium 16 peças', description: '', priceCents: null, available: null, optionsVerified: false },
  { id: 'combo-premium-30', category: 'combinados', name: 'Combo Premium 30 peças', description: '', priceCents: null, available: null, optionsVerified: false },
  { id: 'combo-premium-36', category: 'combinados', name: 'Combo Premium 36 peças', description: '', priceCents: null, available: null, optionsVerified: false },
  { id: 'open-hot-filadelfia', category: 'hot-sushi', name: 'Open Hot Filadélfia', description: 'Sushi frito aberto com salmão, cream cheese e cebolinha.', priceCents: null, available: null, optionsVerified: false },
];

export function canAddProduct(product) {
  if (!Number.isSafeInteger(product?.priceCents) || product.priceCents < 0 || product.available !== true || product.optionsVerified !== true || !Array.isArray(product.optionGroups)) return false;
  const ids = new Set();
  return product.optionGroups.every(group => {
    if (!group.id || !group.name || typeof group.required !== 'boolean' || !Array.isArray(group.choices) || !group.choices.length || ids.has(group.id)) return false;
    ids.add(group.id);
    return group.choices.every(choice => {
      if (!choice.id || !choice.name || !Number.isSafeInteger(choice.priceCents) || choice.priceCents < 0 || ids.has(choice.id)) return false;
      ids.add(choice.id);
      return true;
    });
  });
}
