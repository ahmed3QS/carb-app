export function calculateCarbs(weightG: number, carbsPer100g: number): number {
  return Math.round((weightG / 100) * carbsPer100g);
}

export function calculateCarbsFromUnit(
  unitName: string,
  unitOptions: { name: string; grams: number }[],
  carbsPer100g: number
): number {
  const unit = unitOptions.find((u) => u.name === unitName);
  if (!unit) return 0;
  return calculateCarbs(unit.grams, carbsPer100g);
}
