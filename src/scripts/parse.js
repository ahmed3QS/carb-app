const fs = require('fs');

const markdown = fs.readFileSync('../../antigravity-food-database-final.md', 'utf8');
const lines = markdown.split('\n');

let currentCategory = '';
let currentHeaders = [];
let items = [];
let idCounter = 1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  // Match ## SECTION 1 — نشويات (with range)
  const secMatch = line.match(/^## SECTION \d+\s*—\s*(.+?)(?:\s*\(.*)?$/);
  if (secMatch) {
    currentCategory = secMatch[1].trim();
    continue;
  }

  if (line.startsWith('|') && !line.startsWith('|-')) {
    const cols = line.split('|').map(c => c.trim()).filter(Boolean);
    
    // Check if header row
    if (cols.includes('الاسم') || cols.includes('المنتج')) {
      currentHeaders = cols;
      continue;
    }

    if (currentHeaders.length > 0 && cols.length === currentHeaders.length) {
      let item = { id: `item_${idCounter++}`, category: currentCategory };
      let unitName = '';
      let unitCarbs = null;

      for (let j = 0; j < cols.length; j++) {
        const header = currentHeaders[j];
        const val = cols[j];

        if (header === 'الاسم' || header === 'المنتج') item.name_ar = val;
        else if (header === 'carbs_per_100g') { item.carbs_per_100g = Number(val); item.is_weighable = true; }
        else if (header === 'min') item.min = Number(val);
        else if (header === 'max') item.max = Number(val);
        else if (header === 'avg') { item.avg = Number(val); item.carbs_per_100g = Number(val); item.is_weighable = true; }
        else if (header === 'aliases') item.aliases = val.split(',');
        else if (header === 'الوحدة') unitName = val;
        else if (header === 'الكارب') unitCarbs = Number(val);
      }

      if (unitName && unitCarbs !== null) {
        item.is_weighable = false;
        item.carbs_per_100g = 0;
        item.unit_options = [{ name: unitName, carbs: unitCarbs }];
        if (currentCategory.includes('السوبر ماركت')) {
           item.category = 'السوبر ماركت';
           // guess brand from product name
           const parts = item.name_ar.split(' ');
           item.brand = parts[parts.length - 1]; 
        }
      }
      
      // Fast food case (avg, min, max + unit)
      if (unitName && item.avg !== undefined && unitCarbs === null) {
          item.is_weighable = false;
          item.carbs_per_100g = 0;
          item.unit_options = [{ name: unitName, carbs: item.avg }];
      }

      items.push(item);
    }
  } else if (!line.startsWith('|')) {
    // maybe reset headers if empty line, but let's just clear headers if it's not a table
    if (line === '') {
       // currentHeaders = []; // KEEP headers if there are multiple tables? No, markdown tables are contiguous.
       // Actually, the markdown has multiple tables per section. We can clear headers on empty line.
       currentHeaders = [];
    }
  }
}

// Clean up category names
items.forEach(item => {
  if (item.category.includes('نشويات')) item.category = 'نشويات';
  if (item.category.includes('خبز')) item.category = 'خبز ومعجنات';
  if (item.category.includes('تمر')) item.category = 'تمر وسكريات';
  if (item.category.includes('فواكه')) item.category = 'فواكه';
  if (item.category.includes('ألبان')) item.category = 'ألبان ومشروبات';
  if (item.category.includes('حلويات')) item.category = 'حلويات';
  if (item.category.includes('وجبات عربية')) item.category = 'وجبات عربية';
  if (item.category.includes('وجبات سريعة')) item.category = 'وجبات سريعة';
  if (item.category.includes('سناكات')) item.category = 'سناكات';
  if (item.category.includes('السوبر ماركت')) item.category = 'السوبر ماركت';
  if (item.category === 'أقفال السوبر ماركت') item.category = 'السوبر ماركت'; // typo catch
});

fs.writeFileSync('full_db.json', JSON.stringify(items, null, 2));
console.log(`Parsed ${items.length} items`);
