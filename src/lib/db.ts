import { db } from './firebase';
import { collection, doc, getDoc, getDocs, query, where, setDoc, addDoc, serverTimestamp, orderBy, limit, deleteDoc } from 'firebase/firestore';

export interface FoodItem {
  id: string;
  name_ar: string;
  category: string;
  carbs_per_100g: number;
  is_weighable: boolean;
  unit_options?: { name: string; grams?: number; carbs?: number }[];
  min?: number;
  max?: number;
  avg?: number;
  aliases?: string[];
}

export interface MealLog {
  id?: string;
  foodId: string;
  name: string;
  carbs: number;
  unit: string;
  grams: number;
  mealType: string;
  time: any;
}

export const getFoods = async (): Promise<FoodItem[]> => {
  const q = query(collection(db, 'foods'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FoodItem));
};

export const searchFoods = async (searchTerm: string): Promise<FoodItem[]> => {
  // Simple client-side search approximation (Firestore lacks native full-text)
  const allFoods = await getFoods();
  return allFoods.filter(f => f.name_ar.includes(searchTerm));
};

export const addMealLog = async (uid: string, dateYYYYMMDD: string, meal: MealLog) => {
  const mealsRef = collection(db, `users/${uid}/logs/${dateYYYYMMDD}/meals`);
  return await addDoc(mealsRef, {
    ...meal,
    time: serverTimestamp()
  });
};

export const getDailyMeals = async (uid: string, dateYYYYMMDD: string): Promise<MealLog[]> => {
  const mealsRef = collection(db, `users/${uid}/logs/${dateYYYYMMDD}/meals`);
  const q = query(mealsRef, orderBy('time', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MealLog));
};

export const deleteMealLog = async (uid: string, dateYYYYMMDD: string, mealId: string) => {
  await deleteDoc(doc(db, `users/${uid}/logs/${dateYYYYMMDD}/meals/${mealId}`));
};
