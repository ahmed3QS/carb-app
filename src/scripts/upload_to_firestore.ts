import { ALL_FOODS, SUPERMARKET_PRODUCTS } from "./seed_foods";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

async function run() {
  try {
    console.log(`Starting Firestore Upload: ${ALL_FOODS.length} General Foods`);
    for (let i = 0; i < ALL_FOODS.length; i++) {
      const food = ALL_FOODS[i];
      await setDoc(doc(db, "foods", food.id), food);
      if ((i + 1) % 50 === 0) console.log(`✓ Uploaded ${i + 1}/${ALL_FOODS.length} general foods...`);
    }
    console.log(`✓ General Foods complete!`);

    console.log(`\nStarting Firestore Upload: ${SUPERMARKET_PRODUCTS.length} Supermarket Products`);
    for (let i = 0; i < SUPERMARKET_PRODUCTS.length; i++) {
      const p = SUPERMARKET_PRODUCTS[i];
      await setDoc(doc(db, "supermarket_products", p.id), p);
    }
    console.log(`✓ Supermarket Products complete!`);
    
    console.log("\nAll 182 items successfully backed up to Firestore! Exiting process.");
    process.exit(0);
  } catch (error) {
    console.error("Upload failed: ", error);
    process.exit(1);
  }
}

run();
