import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ALL_FOODS, SUPERMARKET_PRODUCTS } from './seed_foods';

async function seed() {
  console.log("Seeding total foods:", ALL_FOODS.length + SUPERMARKET_PRODUCTS.length);
  try {
    for (const food of ALL_FOODS) {
      if (food.id) {
        const docRef = doc(collection(db, 'foods'), food.id);
        await setDoc(docRef, food);
        console.log(`Seeded: ${food.name_ar}`);
      }
    }
    
    for (const p of SUPERMARKET_PRODUCTS) {
      if (p.id) {
        const docRef = doc(collection(db, 'foods'), p.id);
        await setDoc(docRef, {
          id: p.id,
          name_ar: p.product_name_ar,
          category: "السوبر ماركت",
          carbs_per_100g: p.carbs_per_100g,
          is_weighable: false,
          unit_options: p.piece_options,
          brand: p.brand
        });
        console.log(`Seeded Supermarket: ${p.product_name_ar}`);
      }
    }
    console.log("Seeding complete!");
  } catch (err) {
    console.error("Error seeding:", err);
  }
}

seed();
