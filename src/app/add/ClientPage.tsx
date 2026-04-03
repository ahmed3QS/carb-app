"use client"

import { useState } from "react"
import { Search, ArrowRight, Heart, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ALL_FOODS, SUPERMARKET_PRODUCTS } from "@/scripts/seed_foods"
import { useStore } from "@/lib/store"
import { collection, addDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from "@/lib/firebase"

const COMBINED_FOODS = [
  ...ALL_FOODS,
  ...SUPERMARKET_PRODUCTS.map(p => ({
    id: p.id,
    name_ar: p.product_name_ar,
    category: "السوبر ماركت",
    carbs_per_100g: p.carbs_per_100g,
    is_weighable: false,
    unit_options: p.piece_options
  }))
]

const TARGET_ORDER = [
  "نشويات",
  "خبز ومعجنات",
  "تمر وسكريات",
  "فواكه",
  "ألبان ومشروبات",
  "حلويات",
  "وجبات عربية",
  "وجبات سريعة",
  "سناكات",
  "السوبر ماركت"
]

import { BackButton } from "@/components/ui/back-button"

export default function ClientAddMealPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mealTypeFromQuery = searchParams.get("type") || searchParams.get("meal") || "سناك"
  const { currentUserUid, profile, logs } = useStore() 
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const trimmedSearch = searchTerm.trim()

  const recentIds = Array.from(new Set(logs.map(lg => COMBINED_FOODS.find(f => f.name_ar === lg.name)?.id))).filter(Boolean) as string[]
  const recentFoods = recentIds.slice(0, 10).map(id => COMBINED_FOODS.find(f => f.id === id)!)

  const favoritesIds = profile?.favorites || []
  const favoriteFoods = favoritesIds.map(id => COMBINED_FOODS.find(f => f.id === id)!).filter(Boolean)

  const filterFood = (f: any) => 
    f.name_ar.includes(trimmedSearch) || 
    (f.category && f.category.includes(trimmedSearch)) || 
    (f.aliases && f.aliases.some((a: string) => a.includes(trimmedSearch)))

  return (
    <div className="container max-w-lg mx-auto p-4 pt-6 pb-24 space-y-8">
      <header className="flex items-center gap-3 mb-2">
        <BackButton />
        <h1 className="text-xl font-bold">إضافة وجبة</h1>
      </header>

      <div className="relative sticky top-4 z-10">
        <Search className="absolute right-3 top-4 h-6 w-6 text-muted-foreground" />
        <Input 
          placeholder="ابحث عن الطعام..." 
          className="pl-3 pr-11 rounded-2xl h-14 shadow-lg text-lg font-medium border-primary/20 bg-background"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-10">
        {/* Favorites */}
        {favoriteFoods.filter(filterFood).length > 0 && (
          <section>
            <h2 className="text-xl font-extrabold text-primary mb-4 flex items-center gap-2 px-1">
              <Heart className="w-6 h-6 fill-primary" />
              المفضلة
            </h2>
            <div className="space-y-3">
              {favoriteFoods.filter(filterFood).map(food => (
                <FoodItemCard key={`fav-${food.id}`} food={food} mealType={mealTypeFromQuery} />
              ))}
            </div>
          </section>
        )}

        {/* Recents */}
        {recentFoods.filter(filterFood).length > 0 && (
          <section>
            <h2 className="text-xl font-extrabold text-foreground/80 mb-4 flex items-center gap-2 px-1">
              <Clock className="w-6 h-6" />
              العناصر الأخيرة
            </h2>
            <div className="space-y-3">
              {recentFoods.filter(filterFood).map(food => (
                <FoodItemCard key={`recent-${food.id}`} food={food} mealType={mealTypeFromQuery} />
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        {TARGET_ORDER.map(cat => {
          const catFoods = COMBINED_FOODS.filter(f => f.category === cat && filterFood(f))
          if (catFoods.length === 0) return null;
          
          const isSearching = trimmedSearch.length > 0;
          const isExpanded = isSearching || expandedCategory === cat;

          return (
            <section key={cat} className="space-y-3">
              <Card 
                className={`cursor-pointer transition-colors ${isExpanded ? 'border-primary ring-1 ring-primary/20' : 'hover:border-primary/50'}`} 
                onClick={() => setExpandedCategory(expandedCategory === cat ? null : cat)}
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <h2 className="text-lg font-extrabold text-foreground">
                    {cat}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">{catFoods.length}</span>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </div>
                </CardContent>
              </Card>

              {isExpanded && (
                <div className="space-y-3 pl-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  {catFoods.map(food => (
                    <FoodItemCard key={`cat-${food.id}`} food={food} mealType={mealTypeFromQuery} />
                  ))}
                </div>
              )}
            </section>
          )
        })}

        {COMBINED_FOODS.filter(filterFood).length === 0 && (
          <div className="text-center py-12 text-muted-foreground animate-in fade-in">
            <p className="text-lg font-bold">لم يتم العثور على نتائج</p>
            <p className="text-sm">لم نتمكن من العثور على ما تبحث عنه</p>
          </div>
        )}
      </div>
    </div>
  )
}

function FoodItemCard({ food, mealType }: { food: any; mealType: string }) {
  const [mode, setMode] = useState<"units" | "weight">(food.category === "السوبر ماركت" || !food.is_weighable ? "units" : "weight")
  const [grams, setGrams] = useState<number | "">("")
  const [selectedUnit, setSelectedUnit] = useState<any>(null)
  const { currentUserUid, profile } = useStore()
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [success, setSuccess] = useState(false)

  const isFavorite = profile?.favorites?.includes(food.id)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!currentUserUid) return
    const ref = doc(db, "users", currentUserUid)
    if (isFavorite) {
      await updateDoc(ref, { favorites: arrayRemove(food.id) })
    } else {
      await updateDoc(ref, { favorites: arrayUnion(food.id) })
    }
  }

  const calcCarbs = () => {
    if (mode === "weight" && grams) {
      return Math.round((Number(grams) / 100) * food.carbs_per_100g)
    } else if (mode === "units" && selectedUnit) {
      if (selectedUnit.carbs !== undefined) return selectedUnit.carbs;
      return Math.round((selectedUnit.grams / 100) * food.carbs_per_100g)
    }
    return 0
  }

  const finalCarbs = calcCarbs()
  const showRange = (food.category === "نشويات" || food.category === "فواكه" || food.category === "وجبات عربية" || food.category === "وجبات سريعة") && food.min !== undefined && food.max !== undefined;

  return (
    <Card className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'border-primary shadow-lg ring-1 ring-primary/20' : 'hover:border-primary/50 shadow-sm filter drop-shadow hover:drop-shadow-md'}`}>
      <div 
        className="p-4 flex justify-between items-center cursor-pointer bg-card"
        onClick={toggleExpand}
      >
        <div className="flex-1">
          <h3 className="font-bold text-foreground text-lg">{food.name_ar}</h3>
          
          {showRange ? (
            <div className="mt-1">
              <span className="text-sm font-bold text-primary">{food.avg || food.carbs_per_100g}</span>
              <span className="text-xs text-muted-foreground mr-1">جم للـ 100 جرام</span>
              <div className="text-xs text-muted-foreground mt-0.5" dir="rtl">
                (من {food.min} إلى {food.max} جم حسب التحضير)
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground mt-1 bg-secondary/30 inline-block px-2 py-0.5 rounded-sm">
              {food.carbs_per_100g || (food.unit_options?.[0]?.carbs)} جم كربوهيدرات
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-1 shrink-0">
          <button 
            onClick={toggleFavorite} 
            className="p-2.5 rounded-full hover:bg-muted transition-colors active:scale-95"
          >
            <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-400'}`} />
          </button>
          
          {!isExpanded && (
            <div className="bg-primary text-primary-foreground font-bold text-sm px-3 py-1.5 rounded-lg shadow-sm">
              أضف
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 pt-2 bg-gradient-to-b from-transparent to-secondary/10 border-t border-muted animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-center mb-5 mt-2 bg-card p-4 rounded-xl shadow-inner border border-border/50">
            <span className="text-sm font-bold text-muted-foreground">مجموع الكربوهيدرات:</span>
            <span className="font-extrabold text-3xl text-primary">{finalCarbs} <span className="text-sm font-medium text-muted-foreground">جم</span></span>
          </div>

          <Tabs value={mode} onValueChange={(v:any) => setMode(v)} className="w-full">
            {food.category !== "السوبر ماركت" && (
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted/80 p-0.5 rounded-lg border">
                <TabsTrigger value="units" className="text-sm font-semibold py-2">وحدات جاهزة</TabsTrigger>
                <TabsTrigger value="weight" disabled={!food.is_weighable} className="text-sm font-semibold py-2">وزن بالجرام</TabsTrigger>
              </TabsList>
            )}
            
            <TabsContent value="units" className="space-y-3 mt-0">
              {food.unit_options && food.unit_options.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {food.unit_options.map((unit: any) => (
                    <Button 
                      key={unit.name} 
                      variant={selectedUnit?.name === unit.name ? "default" : "outline"}
                      className={`w-full text-sm font-bold transition-all ${selectedUnit?.name === unit.name ? 'shadow-md shadow-primary/20 scale-[1.02]' : 'hover:bg-primary/5 border-primary/20'}`}
                      onClick={() => setSelectedUnit(unit)}
                    >
                      {unit.name}
                    </Button>
                  ))}
                </div>
              ) : (
                 <div className="text-center text-sm text-muted-foreground p-2">لا توجد وحدات جاهزة محفوظة. استخدم الوزن.</div>
              )}
            </TabsContent>
            
            {food.category !== "السوبر ماركت" && (
              <TabsContent value="weight" className="mt-0">
                <div className="flex justify-center items-center gap-3 bg-background p-4 rounded-xl border flex-row-reverse">
                  <Input 
                    type="number" 
                    placeholder="الوزن..." 
                    className="bg-transparent font-bold text-2xl text-center border-none shadow-none h-14 w-32 focus-visible:ring-0 px-0"
                    value={grams}
                    onChange={(e) => setGrams(e.target.value ? Number(e.target.value) : "")}
                    dir="ltr"
                  />
                  <span className="text-muted-foreground font-bold text-lg bg-secondary px-3 py-1 rounded-md shrink-0">جرام</span>
                </div>
              </TabsContent>
            )}
          </Tabs>

          <div className="text-center mt-4">
            <span className="text-xs text-amber-600 bg-amber-50 rounded-md px-2 py-1 font-semibold dark:text-amber-500 dark:bg-amber-900/30">
              ⚠️ القيم تقديرية وقد تختلف حسب التحضير وحجم الحصة
            </span>
          </div>

            <Button 
            className={`w-full mt-6 h-14 text-lg rounded-xl shadow-lg font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] ${success ? 'bg-green-500 hover:bg-green-600 text-white' : 'shadow-primary/30'}`} 
            disabled={!finalCarbs || isAdding || success}
            onClick={async () => {
              if (!finalCarbs || !currentUserUid) return
              setIsAdding(true)
              try {
                const dt = new Date()
                await addDoc(collection(db, "users", currentUserUid, "logs"), {
                  name: food.name_ar,
                  carbs: finalCarbs,
                  mealType: mealType,
                  unit: mode === "weight" ? `${grams} جم` : selectedUnit?.name || "حصة",
                  time: dt.toLocaleTimeString("ar-SA", { hour: '2-digit', minute: '2-digit' }),
                  timestamp: dt.toISOString()
                })
                setSuccess(true)
                setTimeout(() => {
                  setSuccess(false)
                  setIsAdding(false)
                  setGrams("")
                  setIsExpanded(false)
                }, 1500)
              } catch (e) {
                console.error(e)
                setIsAdding(false)
              }
            }}
          >
            {success ? "تمت الإضافة بنجاح ✓" : isAdding ? "جاري الإضافة..." : "إضافة للسجل اليومي"}
          </Button>
        </div>
      )}
    </Card>
  )
}
