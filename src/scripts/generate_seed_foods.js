const fs = require('fs');

const db = require('./full_db.json');

const allFoods = db.filter(item => item.category !== 'السوبر ماركت');
const supermarket = db.filter(item => item.category === 'السوبر ماركت');

// Write to seed_foods.ts
const content = `// Auto-generated full database
export const ALL_FOODS = ${JSON.stringify(allFoods, null, 2)};

export const SUPERMARKET_PRODUCTS = ${JSON.stringify(supermarket.map(p => ({
  id: p.id,
  product_name_ar: p.name_ar,
  brand: p.brand || p.name_ar.split(' ')[1] || 'السوبر ماركت',
  carbs_per_100g: 0,
  piece_options: p.unit_options
})), null, 2)};
`;

fs.writeFileSync('./seed_foods.ts', content);
console.log('seed_foods.ts successfully created.');
